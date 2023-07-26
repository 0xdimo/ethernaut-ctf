const { ethers } = require("hardhat")

const CONTRACT_NAME = ""
const CONTRACT_ADDRESS = ""

async function main() {
    const factory = await ethers.getContractFactory(CONTRACT_NAME)
    const contract = factory.attach(CONTRACT_ADDRESS)
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
