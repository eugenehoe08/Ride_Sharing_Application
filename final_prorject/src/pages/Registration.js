import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    setCarType,
    setDriver,
    setLicensePlate,
    setName,
    setNoOfRatingTransaction,
    setRating,
    setWalletAddress,
} from '../redux/features/authSlice'
import { register } from '../utils/ethereum'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const [driver, setDriverState] = useState(false)
    const [name, setNameState] = useState('')
    const [carType, setCarTypeState] = useState('')
    const [licensePlate, setLicensePlateState] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const addressArray = await window.ethereum.request({
            method: 'eth_requestAccounts',
        })

        const otherInfo = {
            name,
            carType,
            licensePlate,
        }

        if (addressArray.length > 0) {
            dispatch(setWalletAddress(addressArray[0]))
            register(addressArray[0], otherInfo).then((res) => {
                dispatch(setName(res.name))
                dispatch(setDriver(res.driver))
                if (res.driver) {
                    dispatch(setRating(res.rating))
                    dispatch(
                        setNoOfRatingTransaction(res.noOfRatingTransaction)
                    )
                    dispatch(setCarType(res.carType))
                    dispatch(setLicensePlate(res.licensePlate))
                }
                navigate('/main')
            })
        }
    }

    const handleCancel = () => {
        // console.log(driver)
        // console.log(name)
        navigate('/')
    }

    return (
        <form
            className="space-y-8 divide-y divide-gray-200 p-16"
            onSubmit={handleSubmit}
        >
            <div className="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Registration
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This information will be displayed publicly.
                    </p>
                </div>

                <div className="pt-8 space-y-6">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Personal Information
                        </h3>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 ">
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                            Type
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <select
                                id="type"
                                name="type"
                                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                value={driver ? 'driver' : 'passenger'}
                                onChange={(e) => {
                                    setDriverState(e.target.value === 'driver')
                                }}
                            >
                                <option value="passenger">Passenger</option>
                                <option value="driver">Driver</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    onChange={(e) => {
                                        setNameState(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="carType"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 border-amber-900"
                            >
                                Car Type
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    id="carType"
                                    name="carType"
                                    type="carType"
                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-300"
                                    disabled={!driver}
                                    onChange={(e) => {
                                        setCarTypeState(e.target.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                                htmlFor="street-address"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                                License Plate
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                <input
                                    type="text"
                                    name="license-plate"
                                    id="license-plate"
                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md disabled:bg-gray-300"
                                    disabled={!driver}
                                    onChange={(e) => {
                                        setLicensePlateState(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Registration