import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    walletAddress: '',
    name: '',
    driver: false,
    rating: null,
    noOfRatingTransaction: null,
    carType: null,
    licensePlate: null,
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setWalletAddress: (state, action) => {
            state.walletAddress = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setDriver: (state, action) => {
            state.driver = action.payload
        },
        setRating: (state, action) => {
            state.rating = action.payload
        },
        setNoOfRatingTransaction: (state, action) => {
            state.noOfRatingTransaction = action.payload
        },
        setCarType: (state, action) => {
            state.carType = action.payload
        },
        setLicensePlate: (state, action) => {
            state.licensePlate = action.payload
        },
    },
})

export const {
    setWalletAddress,
    setDriver,
    setName,
    setRating,
    setNoOfRatingTransaction,
    setCarType,
    setLicensePlate,
} = authSlice.actions

export const selectWalletAddress = (state) => state.user.walletAddress
export const selectName = (state) => state.user.name
export const selectIsDriver = (state) => state.user.driver
export const selectRating = (state) => state.user.rating
export const selectNoOfRatingTransaction = (state) =>
    state.user.noOfRatingTransaction
export const selectCarType = (state) => state.user.carType
export const selectLicensePlate = (state) => state.user.licensePlate

export default authSlice.reducer