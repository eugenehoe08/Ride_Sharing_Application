import React, { useContext, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid/index'
import { useDispatch, useSelector } from 'react-redux'
import {
    reset,
    selectDestination,
    selectOrigin,
    selectOtherParty,
    selectPrice,
    setInProgress,
} from '../redux/features/rideSlice'
import {
    selectIsDriver,
    selectWalletAddress,
} from '../redux/features/authSlice'
import { addTransaction } from '../utils/ethereum'
import { removePassengerListener } from '../utils/socket'
import { SocketContext } from '../socket/SocketContext'
import { createNotification } from '../utils/utils'

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            rating: 1,
        },
        {
            id: 2,
            rating: 2,
        },
        {
            id: 3,
            rating: 3,
        },
        {
            id: 4,
            rating: 4,
        },
        {
            id: 5,
            rating: 5,
        },
        {
            id: null,
            rating: 0,
        },
    ]

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const walletAddress = useSelector(selectWalletAddress)
    const isDriver = useSelector(selectIsDriver)
    const otherParty = useSelector(selectOtherParty)
    const price = useSelector(selectPrice)

    const [selectedRating, setSelectedRating] = useState(0)
    const [finishPay, setFinishPay] = useState(false)

    const dispatch = useDispatch()
    const socket = useContext(SocketContext)

    const classNames = (...classes) => {
        return classes.filter(Boolean).join(' ')
    }

    const handleSubmit = () => {
        const finalTransaction = {
            origin,
            destination,
            price,
            otherParty,
            isDriver,
            walletAddress,
            selectedRating,
        }

        addTransaction(finalTransaction)
            .then((res) => {
                createNotification(
                    'success',
                    'Payment paid',
                    'You have paid for your ride!'
                )
                dispatch(setInProgress(false))
                dispatch(reset())
                removePassengerListener(socket)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <fieldset>
            <legend className="text-lg font-medium text-gray-900 px-4 py-4">
                Review!
            </legend>
            <div className=" border-t border-b border-gray-200 divide-y divide-gray-200">
                {reviews.map((review, index) => (
                    <div
                        key={index}
                        className="relative flex justify-between items-start py-4"
                    >
                        <div className="flex ml-3">
                            {review.id ? (
                                <>
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                review.rating > rating
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-200',
                                                'h-5 w-5 flex-shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </>
                            ) : (
                                <div>Skip Review </div>
                            )}
                        </div>
                        <div className="ml-3 flex items-center h-5 px-[50px]">
                            <input
                                id={`review-${review.id}`}
                                name="plan"
                                type="radio"
                                defaultChecked={review.id === null}
                                onChange={() => {
                                    setSelectedRating(review.rating)
                                }}
                                value={review.rating}
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button
                type="button"
                className=" w-full items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </fieldset>
    )
}

export default Reviews