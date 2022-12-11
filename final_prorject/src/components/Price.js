import React, { useEffect, useState } from 'react'
import ethLogo from '../assets/eth.png'
import carLogo from '../assets/car.jpg'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectDestination,
    selectDestinationCoordinates,
    selectOrigin,
    selectOriginCoordinates,
    selectPrice,
    setPrice,
} from '../redux/features/rideSlice'
import { useGetDurationQuery } from '../redux/services/location'
import { selectIsDriver } from '../redux/features/authSlice'

const Price = () => {
    const originCoordinates = useSelector(selectOriginCoordinates)
    const destinationCoordinates = useSelector(selectDestinationCoordinates)
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const price = useSelector(selectPrice)
    const isDriver = useSelector(selectIsDriver)
    const dispatch = useDispatch()

    const { data, isLoading, error } = useGetDurationQuery({
        originCoordinates,
        destinationCoordinates,
    })

    useEffect(() => {
        if (
            origin &&
            destination &&
            originCoordinates &&
            destinationCoordinates &&
            data
        ) {
            dispatch(
                setPrice(
                    (Math.round(data.routes[0].duration) / 10 ** 5).toFixed(5)
                )
            )
        }
    }, [originCoordinates, destinationCoordinates])

    return (
        <div className="flex flex-col h-full">
            <div className="text-gray-600 text-center text-sm py-2 border-b">
                {isDriver
                    ? 'This is the earnings'
                    : 'These is the price to get you to your destination!'}
            </div>
            {(!isDriver || price) && (
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
                                <div className="mr-[-0.8rem]">{price}</div>
                            )}
                            <img
                                src={ethLogo}
                                alt="ethLogo"
                                className="h-[25px] w-[40px]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Price