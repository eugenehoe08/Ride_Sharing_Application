import { contractABI, contractAddress } from './constants'
import Web3 from 'web3'

const web3 = new Web3(window.ethereum)
const createUserContract = () => {
    return new web3.eth.Contract(contractABI, contractAddress)
}

export const register = async (
    walletAddress,
    { driver, name, carType, licensePlate }
) => {
    const userContract = createUserContract()

    return driver
        ? userContract.methods
              .setDriverData(name, driver, carType, licensePlate)
              .send({ from: walletAddress })
              .then(() => {
                  return getUserInfo(walletAddress).then((res) => res)
              })
        : userContract.methods
              .setUserData(name, driver)
              .send({ from: walletAddress })
              .then(() => {
                  return getUserInfo(walletAddress).then((res) => res)
              })
}

export const login = async (walletAddress) => {
    return getUserInfo(walletAddress).then((res) => {
        if (res.name === '') {
            return null
        } else {
            return res
        }
    })
}

export const getUserInfo = (walletAddress) => {
    const userContract = createUserContract()

    return userContract.methods
        .getUserInfo(walletAddress)
        .call({ from: walletAddress })
}

export const addTransaction = ({
    origin,
    destination,
    price,
    otherParty,
    isDriver,
    walletAddress,
    selectedRating,
}) => {
    const userContract = createUserContract()

    const adjustedPrice = web3.utils.toWei(`${price}`, 'ether')

    return userContract.methods
        .addTransaction(
            otherParty,
            origin,
            destination,
            adjustedPrice,
            isDriver,
            parseInt(selectedRating)
        )
        .send({
            from: walletAddress,
            value: adjustedPrice,
        })
}

export const getTransaction = (walletAddress) => {
    const userContract = createUserContract()

    return userContract.methods
        .getAllTransactions()
        .call({ from: walletAddress })
}

export const payMoney = (from, to, price) => {
    console.log({
        from,
        to,
        price,
    })
    return web3.eth.sendTransaction({
        from,
        to,
        value: web3.utils.toWei(`${price}`, 'ether'),
    })
}

export const testingContract = (walletAddress, driver = false) => {
    const userContract = createUserContract()
}