import React, { useContext, useEffect, useState } from 'react'
import ethLogo from '../assets/eth.png'
import carLogo from '../assets/car.jpg'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectDestination,
    selectDestinationCoordinates,
    selectOrigin,
    selectOriginCoordinates,
    selectPrice,
    setInProgress,
    setPrice,
} from '../redux/features/rideSlice'
import { useGetDurationQuery } from '../redux/services/location'
import {
    selectCarType,
    selectIsDriver,
    selectLicensePlate,
    selectNoOfRatingTransaction,
    selectRating,
    selectWalletAddress,
} from '../redux/features/authSlice'
import { SocketContext } from '../socket/SocketContext'
import { createNotification } from '../utils/utils'

const DriverPrice = () => {
    const price = useSelector(selectPrice)
    const socket = useContext(SocketContext)
    const walletAddress = useSelector(selectWalletAddress)
    const carType = useSelector(selectCarType)
    const licensePlate = useSelector(selectLicensePlate)
    const rating = useSelector(selectRating)
    const noOfRatingTransactions = useSelector(selectNoOfRatingTransaction)
    const dispatch = useDispatch()

    const acceptPassenger = () => {
        socket.emit('acceptRide', {
            walletAddress,
            carType,
            licensePlate,
            rating,
            noOfRatingTransactions,
        })
        createNotification(
            'success',
            'Ride Accepted',
            'Please fetch your passenger'
        )
        dispatch(setInProgress(true))
    }

    return (
        <div className="flex flex-col h-full">
            <div className="text-gray-600 text-center text-sm py-2 border-b">
                This is the earnings
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex p-3 m-2 items-center border-2 border-white">
                    <img
                        src={carLogo}
                        alt="carLogo"
                        className="h-[60px] w-[100px]"
                    />
                    <div className="ml-2 flex-1">
                        <div className="font-medium">Normal Car</div>
                    </div>
                    <div className="flex items-center">
                        {price && (
                            <div
                                className="mr-[-0.8rem] cursor-pointer hover:underline hover:text-blue-500"
                                onClick={acceptPassenger}
                            >
                                {price}
                            </div>
                        )}
                        <img
                            src={ethLogo}
                            alt="ethLogo"
                            className="h-[25px] w-[40px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverPrice