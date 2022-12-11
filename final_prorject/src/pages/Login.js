import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectWalletAddress,
    setName,
    setWalletAddress,
    setDriver,
    selectIsDriver,
    setRating,
    setNoOfRatingTransaction,
    setCarType,
    setLicensePlate,
} from '../redux/features/authSlice'
import { useNavigate } from 'react-router-dom'
import {
    addTransaction,
    getTransaction,
    getUserInfo,
    login,
    testingContract,
} from '../utils/ethereum'
const tiers = [
    {
        name: 'Passenger',
        href: '#',
        priceMonthly: 32,
        description: 'Login as a passenger right now',
        driver: false,
    },
    {
        name: 'Driver',
        href: '#registration',
        priceMonthly: 48,
        description: 'Login as a driver right now',
        driver: true,
    },
]
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const walletAddress = useSelector(selectWalletAddress)
    const isDriver = useSelector(selectIsDriver)

    const [type, setType] = useState('user')

    let metamask

    if (typeof window !== 'undefined') {
        metamask = window.ethereum
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })

            if (addressArray.length > 0) {
                getUserInfo(addressArray[0]).then((res) => {
                    if (res.name === '') {
                        console.log('wallet address not registered yet')
                        return
                    }
                    console.log(res)
                    dispatch(setWalletAddress(addressArray[0]))
                    dispatch(setName(res.name))
                    dispatch(setDriver(res.driver))
                    if (res.driver) {
                        dispatch(setRating(res.rating))
                        dispatch(
                            setNoOfRatingTransaction(res.noOfRatingTransactions)
                        )
                        dispatch(setCarType(res.carType))
                        dispatch(setLicensePlate(res.licensePlate))
                    }
                    navigate('/main')
                })
            } else {
                console.log('never login')
            }
        } catch (error) {
            console.error('ERROR', error)
        }
    }

    const connectWallet = async (driver) => {
        if (!window.ethereum) return
        console.log('hhello')
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            if (addressArray.length > 0) {
                dispatch(setWalletAddress(addressArray[0]))
                login(addressArray[0], driver)
                    .then((res) => {
                        dispatch(setName(res.name))

                        dispatch(setDriver(res.driver))
                        if (res.driver) {
                            dispatch(setRating(res.rating))
                            dispatch(
                                setNoOfRatingTransaction(
                                    res.noOfRatingTransaction
                                )
                            )
                            dispatch(setCarType(res.carType))
                            dispatch(setLicensePlate(res.licensePlate))
                        }
                        navigate('/main')
                    })
                    .catch((e) => {
                        navigate('/registration')
                    })
            }
        } catch (error) {
            console.error(error)
        }
    }

    const testing = async () => {
        const addressArray = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })

        getUserInfo(addressArray[0]).then((res) => {
            console.log(res)
        })

        // testingContract(addressArray[0], true).then((res) => {
        //     console.log(res)
        // })
    }

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                        Ride Taxi
                    </h1>
                    <p className="mt-5 text-xl text-gray-500 sm:text-center">
                        Login to our decentralized taxi application right now.
                    </p>
                </div>
                <div className="mt-12 space-y-4 mt-16 space-y-0 grid grid-cols-2 gap-6">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200"
                        >
                            <div className="p-6">
                                <h2 className="text-lg leading-6 font-medium text-gray-900">
                                    {tier.name}
                                </h2>
                                <p className="mt-4 text-sm text-gray-500">
                                    {tier.description}
                                </p>
                                <div
                                    onClick={() => connectWallet(tier.driver)}
                                    className="mt-8 cursor-pointer block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                                >
                                    Login
                                </div>
                                {/*<div*/}
                                {/*    className="mt-8 cursor-pointer block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"*/}
                                {/*    onClick={testing}*/}
                                {/*>*/}
                                {/*    Test*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Login