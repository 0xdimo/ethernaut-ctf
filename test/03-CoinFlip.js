const { ethers } = require("hardhat")
const { expect } = require("chai")

const CONTRACT_NAME = "CoinFlip"
const ATTACKER_CONTRACT_NAME = "CoinFlipCracker"

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

        const attackerFactory = await ethers.getContractFactory(ATTACKER_CONTRACT_NAME)
        attackerContract = await attackerFactory.deploy(contract.address)
        await attackerContract.deployed()

        attackerContract = attackerContract.connect(attacker)
        contract = contract.connect(attacker)
    })

    it("Solves the challenge", async () => {
        //write test here
        for (let i = 1; i <= 10; i++) {
            tx = await attackerContract.crack()
            await tx.wait(1)
        }

        expect(await contract.consecutiveWins()).to.eq(10)
    })
})
