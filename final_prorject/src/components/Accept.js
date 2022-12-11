import React, { useContext, useState } from 'react'
import Price from './Price'
import { useGetLocationCoordinatesQuery } from '../redux/services/location'
import { useDispatch, useSelector } from 'react-redux'
import {
    reset,
    selectDestination,
    selectOrigin,
    selectOtherParty,
    selectPrice,
    setInProgress,
    setOtherParty,
} from '../redux/features/rideSlice'
import {
    selectWalletAddress,
    setCarType,
    setLicensePlate,
    setNoOfRatingTransaction,
    setRating,
} from '../redux/features/authSlice'
import { socketURL } from '../utils/constants'
import { SocketContext } from '../socket/SocketContext'
import { createNotification } from '../utils/utils'

const Accept = () => {
    const [lookingFor, setLookingFor] = useState(false)

    const dispatch = useDispatch()

    const walletAddress = useSelector(selectWalletAddress)
    const price = useSelector(selectPrice)
    const transaction = useSelector((state) => state.rideDetails)

    const socket = useContext(SocketContext)

    const acceptRide = () => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('Metamask here!')

            if (price === null) {
                console.log('price is null. Try again')
            } else {
                setLookingFor(true)
                socket.emit(
                    'rideRequest',
                    parseTransaction(transaction, walletAddress)
                )
                socket.on(
                    'acceptRide',
                    ({
                        walletAddress,
                        carType,
                        licensePlate,
                        rating,
                        noOfRatingTransactions,
                    }) => {
                        dispatch(setOtherParty(walletAddress))
                        dispatch(setCarType(carType))
                        dispatch(setLicensePlate(licensePlate))
                        dispatch(setRating(rating))
                        dispatch(
                            setNoOfRatingTransaction(noOfRatingTransactions)
                        )
                        dispatch(setInProgress(true))
                        createNotification(
                            'success',
                            'Ride found',
                            'You have found a driver!'
                        )
                    }
                )
            }
        } else {
            console.log('error')
        }
    }

    const cancelRide = () => {
        setLookingFor(false)
        socket.disconnect()
    }

    const parseTransaction = (
        { origin, destination, price },
        walletAddress
    ) => {
        return {
            origin,
            destination,
            price,
            walletAddress,
        }
    }

    return (
        <div className="flex-1 h-full flex flex-col justify-between">
            <div className="h-full flex flex-col overflow-scroll">
                <Price />
            </div>
            <div className="border-t-2 cursor-pointer z-10">
                <div className="border-t-2 cursor-pointer z-10">
                    <div
                        className="bg-black text-white m-4 py-4 text-center text-xl"
                        onClick={lookingFor ? cancelRide : acceptRide}
                    >
                        {lookingFor ? 'Cancel Ride' : 'Confirm Ride'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accept