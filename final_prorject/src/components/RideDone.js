import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectIsDriver,
    selectWalletAddress,
} from '../redux/features/authSlice'
import {
    reset,
    selectDestination,
    selectOrigin,
    selectOtherParty,
    selectPrice,
    setInProgress,
} from '../redux/features/rideSlice'
import { addTransaction, payMoney, testing } from '../utils/ethereum'
import DriverInfo from './DriverInfo'
import UserInfo from './UserInfo'
import { SocketContext } from '../socket/SocketContext'
import { removeDriverListener, removePassengerListener } from '../utils/socket'
import { parseTransaction } from '../utils/utils'

const RideDone = () => {
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const walletAddress = useSelector(selectWalletAddress)
    const otherParty = useSelector(selectOtherParty)
    const price = useSelector(selectPrice)
    const isDriver = useSelector(selectIsDriver)

    const socket = useContext(SocketContext)
    const dispatch = useDispatch()

    const passengerDone = () => {}

    const driverDone = () => {
        socket.emit('rideFinished')
        dispatch(setInProgress(false))
        dispatch(reset())
        removeDriverListener(socket)
        // const finalTransaction = parseTransaction(
        //     origin,
        //     destination,
        //     walletAddress,
        //     otherParty,
        //     price,
        //     isDriver
        // )
        // console.log('final transaction:', finalTransaction)
        // addTransaction(finalTransaction)
        //     .then(() => {
        //         dispatch(setInProgress(false))
        //         dispatch(reset())
        //         removeDriverListener(socket)
        //     })
        //     .catch((e) => {
        //         console.error(e)
        //     })
    }

    return (
        <div>
            {!isDriver ? <UserInfo /> : <DriverInfo />}

            {isDriver && (
                <div className="flex justify-center items-center">
                    <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 mt-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={driverDone}
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
    )
}

export default RideDone