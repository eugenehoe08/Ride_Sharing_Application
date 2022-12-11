import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    origin: null,
    originCoordinates: null,
    destination: null,
    destinationCoordinates: null,
    inProgress: false,
    price: null,
    otherParty: null,
}

export const rideSlice = createSlice({
    name: 'ride',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload
        },
        setOriginCoordinates: (state, action) => {
            state.originCoordinates = action.payload
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setDestinationCoordinates: (state, action) => {
            state.destinationCoordinates = action.payload
        },
        setInProgress: (state, action) => {
            state.inProgress = action.payload
        },
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setOtherParty: (state, action) => {
            state.otherParty = action.payload
        },
        reset: () => initialState,
    },
})

export const {
    setOrigin,
    setDestination,
    setOtherParty,
    setPrice,
    setInProgress,
    setDestinationCoordinates,
    setOriginCoordinates,
    reset,
} = rideSlice.actions

// selectors
export const selectOrigin = (state) => state.rideDetails.origin
export const selectOriginCoordinates = (state) =>
    state.rideDetails.originCoordinates
export const selectDestination = (state) => state.rideDetails.destination
export const selectDestinationCoordinates = (state) =>
    state.rideDetails.destinationCoordinates
export const selectInProgress = (state) => state.rideDetails.inProgress
export const selectPrice = (state) => state.rideDetails.price
export const selectOtherParty = (state) => state.rideDetails.otherParty

export default rideSlice.reducer