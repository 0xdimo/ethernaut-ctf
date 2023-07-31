const { ethers } = require("hardhat")
const { expect } = require("chai")

const CONTRACT_NAME = "Telephone"
const ATTACKER_NAME = "TelephoneAttacker"

describe(CONTRACT_NAME, () => {
    let _owner
    let attacker
    let attackerContract
    let contract
    let tx

    beforeEach(async () => {
        ;[_owner, attacker] = await ethers.getSigners()
        const factory = await ethers.getContractFactory(CONTRACT_NAME)
        contract = await factory.deploy()
        await contract.deployed()
        contract = contract.connect(attacker)

        const attackerFactory = await ethers.getContractFactory(ATTACKER_NAME)
        attackerContract = await attackerFactory.connect(attacker).deploy(contract.address)
        await attackerContract.deployed()
        attackerContract.connect(attacker)
    })

    it("Solves the challenge", async () => {
        tx = await attackerContract.changeOwner()
        await tx.wait()

        expect(await contract.owner()).to.eq(attacker.address)
    })
})
