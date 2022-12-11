import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectDestination,
    selectOrigin,
    setDestination,
    setDestinationCoordinates,
    setOrigin,
    setOriginCoordinates,
} from '../redux/features/rideSlice'
import { useGetLocationCoordinatesQuery } from '../redux/services/location'

const ChoosePlace = () => {
    const [focus, setFocus] = useState(false)
    const [viewport, setViewport] = useState({})
    const dispatch = useDispatch()
    // const origin = useSelector(selectOrigin)
    // const destination = useSelector(selectDestination)
    // const originCoordinates = useGetLocationCoordinatesQuery(origin)?.data
    //
    // const destinationCoordinates =
    //     useGetLocationCoordinatesQuery(destination)?.data
    //
    // useEffect(() => {
    //     if (originCoordinates) {
    //         dispatch(
    //             setOriginCoordinates(originCoordinates?.features[0]?.center)
    //         )
    //     }
    //
    //     if (destinationCoordinates) {
    //         dispatch(
    //             setDestinationCoordinates(
    //                 destinationCoordinates?.features[0]?.center
    //             )
    //         )
    //     }
    // }, [originCoordinates, destinationCoordinates])

    return (
        <div className="pt-2">
            <div className="w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden">
                {focus ? 'Where to?' : 'Where to pick you up?'}
            </div>
            <div className="flex flex-col mb-4 relative">
                <div
                    className={`h-10 mx-4 border-2 bg-gray-100 flex items-center my-1 py-1 px-2 ${
                        !focus && 'border-black'
                    }`}
                >
                    <div className="mx-1">
                        <svg viewBox="0 0 24 24" width="1em" height="1em">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z"
                            />
                        </svg>
                    </div>
                    <input
                        className="my-2 rounded-2 p-2 outline-none border-none bg-transparent h-full w-full"
                        placeholder="Enter pickup location"
                        onChange={(e) => dispatch(setOrigin(e.target.value))}
                        onFocus={() => {
                            setFocus(false)
                        }}
                    />
                </div>
                <div className="w-0 h-[2rem] border-black border absolute z-10 left-[2.3rem] top-[2rem]" />
                <div
                    className={`h-10 mx-4 border-2 bg-gray-100 flex items-center my-1 py-1 px-2 ${
                        focus && 'border-black'
                    }`}
                >
                    <div className="mx-1">
                        <svg viewBox="0 0 24 24" width="1em" height="1em">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z"
                            />
                        </svg>
                    </div>
                    <input
                        className="my-2 rounded-2 p-2 outline-none border-none bg-transparent h-full w-full"
                        placeholder="Enter destination"
                        onChange={(e) =>
                            dispatch(setDestination(e.target.value))
                        }
                        onFocus={() => {
                            setFocus(true)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ChoosePlace