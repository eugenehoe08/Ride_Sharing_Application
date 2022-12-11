import React, { useEffect, useState } from 'react'
import { getTransaction } from '../utils/ethereum'
import { useSelector } from 'react-redux'
import {
    selectIsDriver,
    selectWalletAddress,
} from '../redux/features/authSlice'
import Web3 from 'web3'

const Transactions = () => {
    const [transactions, setTransactions] = useState([])
    const walletAddress = useSelector(selectWalletAddress)
    const isDriver = useSelector(selectIsDriver)

    const web3 = new Web3(window.ethereum)

    useEffect(() => {
        getTransaction(walletAddress).then((res) => {
            setTransactions(res)
        })
    }, [])

    return (
        <div className="px-8 mt-[50px]">
            <div className="flex ">
                <div className="flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900 items-center justify-center flex">
                        Transactions
                    </h1>
                    <p className="mt-2 text-sm text-gray-700 items-center justify-center flex">
                        A list of all the transactions in your account!
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            {isDriver ? 'Passenger' : 'Driver'}
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Pick Up
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Drop off
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {transactions.map((transaction, index) => (
                                        <tr
                                            key={index}
                                            className={
                                                index % 2 === 0
                                                    ? undefined
                                                    : 'bg-gray-50'
                                            }
                                        >
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {transaction?.party}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {transaction?.origin}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {transaction.destination}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {web3.utils.fromWei(
                                                    `${transaction.price}`,
                                                    'ether'
                                                )}{' '}
                                                ETH
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transactions