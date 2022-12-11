import { NotificationContainer, NotificationManager } from 'react-notifications'
import { selectIsDriver } from '../redux/features/authSlice'

export const createNotification = (type, message, title, timeout = 3000) => {
    switch (type) {
        case 'info':
            NotificationManager.info(message, title, timeout)
            break
        case 'success':
            NotificationManager.success(message, title, timeout)
            break
        case 'warning':
            NotificationManager.warning(message, title, timeout)
            break
        case 'error':
            NotificationManager.error(message, title, timeout)
            break
    }
}

export const parseTransaction = (
    origin,
    destination,
    walletAddress,
    otherParty,
    price,
    isDriver
) => {
    return {
        origin,
        destination,
        walletAddress,
        price,
        driver: isDriver,
        otherParty,
    }
}