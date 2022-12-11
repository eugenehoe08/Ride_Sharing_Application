import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    reset,
    selectDestination,
    selectOrigin,
    selectOtherParty,
    selectPrice,
    setInProgress,
} from '../redux/features/rideSlice'
import { addTransaction, payMoney } from '../utils/ethereum'
import { removePassengerListener } from '../utils/socket'
import { SocketContext } from '../socket/SocketContext'
import {
    selectCarType,
    selectIsDriver,
    selectLicensePlate,
    selectNoOfRatingTransaction,
    selectRating,
    selectWalletAddress,
} from '../redux/features/authSlice'
import { parseTransaction } from '../utils/utils'
import Reviews from './Reviews'

const UserInfo = () => {
    const otherParty = useSelector(selectOtherParty)
    const price = useSelector(selectPrice)
    const carType = useSelector(selectCarType)
    const rating = useSelector(selectRating)
    const noOfRatingTransactions = useSelector(selectNoOfRatingTransaction)
    const licensePlate = useSelector(selectLicensePlate)

    const [rideFinished, setRideFinished] = useState(false)

    const socket = useContext(SocketContext)

    socket.on('rideFinished', async () => {
        console.log('ride finished!')
        setRideFinished(true)
    })

    return (
        <>
            {rideFinished ? (
                <Reviews />
            ) : (
                <>
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Ride in Progress
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Information
                            </p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Wallet Address
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {otherParty}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Car
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {carType}
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Plate number
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {licensePlate}
                                    </dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Price
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {price} ETH
                                    </dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">
                                        Rating
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {/*{(*/}
                                        {/*    rating / noOfRatingTransactions*/}
                                        {/*).toFixed(2)}*/}
                                        3.86
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UserInfo