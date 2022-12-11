import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import './index.css'
import Main from './pages/Main'
import 'mapbox-gl/dist/mapbox-gl.css'
import TransactionPage from './pages/TransactionPage'
import { SocketProvider } from './socket/SocketContext'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications'
import Registration from './pages/Registration'
import Modal from './components/Modal'

function App() {
    return (
        <SocketProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/main" element={<Main />} />
                    <Route
                        path="/main/transactions"
                        element={<TransactionPage />}
                    />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </BrowserRouter>
            <NotificationContainer />
        </SocketProvider>
    )
}

export default App