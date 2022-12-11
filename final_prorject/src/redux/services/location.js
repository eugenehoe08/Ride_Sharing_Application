import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_MAPBOX_PLACES_API_URL}`,
    }),
    endpoints: (builder) => ({
        getLocationCoordinates: builder.query({
            query: (location) =>
                `/geocoding/v5/mapbox.places/${location}.json?proximity=103.88893237200514,1.366466548668213&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
        }),
        getDuration: builder.query({
            query: (body) =>
                `/directions/v5/mapbox/driving-traffic/${body.originCoordinates[0]},${body.originCoordinates[1]};${body.destinationCoordinates[0]},${body.destinationCoordinates[1]}.json?geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`,
        }),
    }),
})

export const { useGetLocationCoordinatesQuery, useGetDurationQuery } =
    locationApi