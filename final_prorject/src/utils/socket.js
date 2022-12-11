export const removeDriverListener = (socket) => {
    socket.removeAllListeners('rideRequest')
}

export const removePassengerListener = (socket) => {
    socket.removeAllListeners('acceptRide')
    socket.removeAllListeners('rideFinished')
}