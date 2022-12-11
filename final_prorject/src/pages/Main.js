import React from 'react'
import Navbar from '../components/Navbar'
import MapBox from '../components/MapBox'
import ChoosePlace from '../components/ChoosePlace'
import Accept from '../components/Accept'
import { useSelector } from 'react-redux'
import { selectIsDriver } from '../redux/features/authSlice'
import DriverChoose from '../components/DriverChoose'
import DriverAccept from '../components/DriverAccept'
import { selectInProgress } from '../redux/features/rideSlice'
import RideDone from '../components/RideDone'
import Reviews from '../components/Reviews'

const Main = () => {
    const driver = useSelector(selectIsDriver)
    const inProgress = useSelector(selectInProgress)

    return (
        <div className="h-screen w-screen flex flex-col">
            <Navbar />
            <div className="h-full w-screen z-10 flex-1">
                <MapBox />
            </div>

            <div className="h-full ml-[1rem] py-[3rem] absolute w-[400px] flex flex-col justify-end z-20 top-0 left-0">
                <div className="h-full max-h-96 bg-white rounded-lg flex overflow-scroll flex-col">
                    {driver ? (
                        <>
                            {!inProgress ? (
                                <>
                                    {' '}
                                    <DriverChoose />
                                    <DriverAccept />
                                </>
                            ) : (
                                <RideDone />
                            )}
                        </>
                    ) : (
                        <>
                            {!inProgress ? (
                                <>
                                    <ChoosePlace />
                                    <Accept />
                                </>
                            ) : (
                                <RideDone />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Main