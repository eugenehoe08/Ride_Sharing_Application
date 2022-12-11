import { configureStore } from '@reduxjs/toolkit'
import rideDetailsReducer from './features/rideSlice'
import authReducer from './features/authSlice'
import { locationApi } from './services/location'

const store = configureStore({
    reducer: {
        rideDetails: rideDetailsReducer,
        user: authReducer,
        [locationApi.reducerPath]: locationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(locationApi.middleware),
})

export default store