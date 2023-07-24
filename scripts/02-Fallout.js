const { ethers } = require("hardhat")

const CONTRACT_NAME = "Fallout"
const CONTRACT_ADDRESS = "0xF0986a07fB7Ce20B4CFA7A861F7D06A80c7Ce875"

async function main() {
    const factory = await ethers.getContractFactory(CONTRACT_NAME)
    const contract = factory.attach(CONTRACT_ADDRESS)
    console.log("Script Ready")

    const tx = await contract.Fal1out({ value: 1 })
    await tx.wait()
    console.log(tx)
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
