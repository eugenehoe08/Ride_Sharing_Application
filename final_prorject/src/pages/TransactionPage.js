import React from 'react'
import Transactions from '../components/Transactions'
import Navbar from '../components/Navbar'

const TransactionPage = () => {
    return (
        <div className=" h-full w-screen flex flex-col">
            <Navbar />
            <div className="h-full ml-[1rem] py-[4rem] z-20">
                <Transactions />
            </div>
        </div>
    )
}

export default TransactionPage