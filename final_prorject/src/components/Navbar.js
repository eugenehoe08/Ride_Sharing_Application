import React from 'react'
import Passenger from '../assets/passenger.jpg'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    selectIsDriver,
    selectWalletAddress,
} from '../redux/features/authSlice'
import { hover } from '@testing-library/user-event/dist/hover'

const Navbar = () => {
    const walletAddress = useSelector(selectWalletAddress)
    const driver = useSelector(selectIsDriver)

    return (
        <div className="bg-black text-white flex h-16 w-full md:justify-around items-center px-60 fixed z-30">
            <div className="flex gap-3">
                <NavLink
                    to="/"
                    end
                    className="text-3xl text-white mr-16 cursor-pointer flex hover:bg-[#333333]"
                >
                    DriveSG
                </NavLink>
                <NavLink
                    to="/"
                    // style={({ isActive }) =>
                    //     isActive
                    //         ? {
                    //               backgroundColor: 'rgb(253 230 138)',
                    //               color: 'black',
                    //           }
                    //         : undefined
                    // }
                    className="text-lg font-medium text-white flex mx-4 cursor-pointer items-center hover:bg-[#333333]"
                >
                    Ride
                </NavLink>
                <NavLink
                    to="transactions"
                    className="text-lg  font-medium text-white flex mx-4 cursor-pointer items-center hover:bg-[#333333]"
                    // style={({ isActive }) =>
                    //     isActive
                    //         ? {
                    //               backgroundColor: 'rgb(253 230 138)',
                    //               color: 'black',
                    //           }
                    //         : undefined
                    // }
                >
                    Transactions
                </NavLink>
            </div>

            <div className="flex gap-3 items-center">
                <div className="text-lg  font-medium text-white flex mx-4 cursor-pointer items-center">
                    {driver ? 'Driver' : 'Passenger'}
                </div>
                <div className="mr-2">
                    <div className="h-10 w-10 mr-4 rounded-full p-px object-cover cursor-pointer">
                        <img src={Passenger} alt="hello" />
                    </div>
                </div>
                <div className="flex items-center rounded-full px-4 py-1 hover:bg-[#333333] cursor-pointer">
                    <p className="ml-2">{walletAddress}</p>
                </div>
                <div
                    className="flex items-center cursor-pointer rounded-full hover:bg-[#333333] px-4 py-1"
                    onClick={() => {
                        console.log('log out')
                    }}
                >
                    <span className="ml-2">Log out</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar