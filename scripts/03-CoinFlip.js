const { ethers } = require("hardhat")

const CONTRACT_NAME = "CoinFlip"
const CONTRACT_ADDRESS = "0xF27a48Ebe039E1bE2EC304B9E781EC479c6E2de8"

async function main() {
    const factory = await ethers.getContractFactory(CONTRACT_NAME)
    const contract = factory.attach(CONTRACT_ADDRESS)

}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
