import React, { useContext, useState } from 'react'
import { io } from 'socket.io-client'
import { socketURL } from '../utils/constants'
import { selectWalletAddress } from '../redux/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectPrice,
    setDestination,
    setInProgress,
    setOrigin,
    setOtherParty,
    setPrice,
} from '../redux/features/rideSlice'
import DriverPrice from './DriverPrice'
import { SocketContext } from '../socket/SocketContext'

const DriverAccept = () => {
    const [lookingFor, setLookingFor] = useState(false)
    const walletAddress = useSelector(selectWalletAddress)
    const price = useSelector(selectPrice)
    const dispatch = useDispatch()
    const socket = useContext(SocketContext)

    const acceptRide = () => {
        setLookingFor(true)
        socket.emit('lookingForPassengers')

        socket.on('rideRequest', (rideDetails) => {
            dispatch(setOrigin(rideDetails.origin))
            dispatch(setDestination(rideDetails.destination))
            dispatch(setPrice(rideDetails.price))
            dispatch(setOtherParty(rideDetails.walletAddress))
        })
    }

    const cancelRide = () => {
        socket.disconnect()
    }

    return (
        <div className="flex-1 h-full flex flex-col justify-between">
            <div className="h-full flex flex-col overflow-scroll">
                <DriverPrice />
            </div>
            <div className="border-t-2 cursor-pointer z-10">
                <div className="border-t-2 cursor-pointer z-10">
                    <div
                        className="bg-black text-white m-4 py-4 text-center text-xl"
                        onClick={lookingFor ? cancelRide : acceptRide}
                    >
                        {lookingFor ? 'Cancel' : 'Look for Passengers'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DriverAccept