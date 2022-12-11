import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectDestination,
    selectDestinationCoordinates,
    selectOrigin,
    selectOriginCoordinates,
    setDestinationCoordinates,
    setOriginCoordinates,
} from '../redux/features/rideSlice'
import mapboxgl from 'mapbox-gl'
import {
    useGetDurationQuery,
    useGetLocationCoordinatesQuery,
} from '../redux/services/location'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY
const MapBox = () => {
    const dispatch = useDispatch()
    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const originCoordinatesData = useGetLocationCoordinatesQuery(origin)?.data

    const destinationCoordinatesData =
        useGetLocationCoordinatesQuery(destination)?.data
    const originCoordinates = useSelector(selectOriginCoordinates)
    const destinationCoordinates = useSelector(selectDestinationCoordinates)

    const { data, isLoading, error } = useGetDurationQuery({
        originCoordinates,
        destinationCoordinates,
    })

    // const [viewport, setViewport] = useState({})
    // useEffect(() => {
    //     navigator.geolocation.getCurrentPosition((pos) => {
    //         setViewport({
    //             ...viewport,
    //             latitude: pos.coords.latitude,
    //             longitude: pos.coords.longitude,
    //             zoom: 14,
    //         })
    //     })
    // }, [])

    useEffect(() => {
        if (originCoordinatesData && origin) {
            dispatch(
                setOriginCoordinates(originCoordinatesData?.features[0]?.center)
            )
        }

        if (destinationCoordinatesData && destination) {
            dispatch(
                setDestinationCoordinates(
                    destinationCoordinatesData?.features[0]?.center
                )
            )
        }
    }, [originCoordinatesData, destinationCoordinatesData])

    useEffect(() => {
        console.log('hello')
        console.log('hello')
        console.log('hello')
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center: [103.88871779528439, 1.366477274452969],
            zoom: 14,
        })

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
            fitBoundsOptions: { maxZoom: 20 },
        })

        map.addControl(geolocate)

        map.on('load', function () {
            geolocate.trigger()
            if (data) {
                console.log(data?.routes[0]?.geometry)
                addRoute(map, data?.routes[0]?.geometry)
            }
            if (originCoordinates == null || destinationCoordinates == null) {
                if (map.getLayer('route')) {
                    map.removeLayer('route')
                }

                if (map.getSource('route')) {
                    map.removeSource('route')
                }
            }
        })

        if (originCoordinates) {
            addToMap(map, originCoordinates)
        }

        if (destinationCoordinates) {
            addToMap(map, destinationCoordinates, false)
        }

        if (originCoordinates && destinationCoordinates) {
            map.fitBounds([destinationCoordinates, originCoordinates], {
                padding: 200,
            })
        }
    }, [originCoordinates, destinationCoordinates])

    const addToMap = (map, coordinates, origin = true) => {
        const marker1 = new mapboxgl.Marker({ color: origin ? '#FF0000' : '' })
            .setLngLat(coordinates)
            .addTo(map)
    }

    const addRoute = (map, coordinates) => {
        console.log(coordinates)
        if (coordinates === null) {
            return
        }
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: coordinates,
                },
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
            },
            paint: {
                'line-color': '#888',
                'line-width': 8,
            },
        })
    }

    return <div className="flex-1 w-full h-full" id="map" />
}

export default MapBox