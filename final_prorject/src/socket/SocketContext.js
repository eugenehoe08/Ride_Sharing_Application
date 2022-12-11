import React, { createContext } from 'react'
import { io, Socket } from 'socket.io-client'
import { socketURL } from '../utils/constants'

const socket = io(socketURL),
    SocketContext = createContext(socket)

socket.on('connect', () => console.log('connected to socket'))

const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
export { SocketContext, SocketProvider }