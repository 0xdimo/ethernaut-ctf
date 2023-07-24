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

    it("Solves the challenge", async () => {})
})
