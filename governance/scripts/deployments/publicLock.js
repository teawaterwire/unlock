const { ethers, run } = require('hardhat')
const { networks } = require('@unlock-protocol/networks')
const contracts = require('@unlock-protocol/contracts')

async function main({ publicLockVersion }) {
  // fetch chain info
  const { chainId } = await ethers.provider.getNetwork()
  const networkName = networks[chainId].name
  const [signer] = await ethers.getSigners()

  let PublicLock
  if (publicLockVersion) {
    const { abi, bytecode } = contracts[`PublicLockV${publicLockVersion}`]
    console.log(
      `PUBLIC LOCK > Deploying lock template on ${networkName} for released version ${publicLockVersion} with signer ${signer.address}`
    )
    PublicLock = await ethers.getContractFactory(abi, bytecode)
  } else {
    throw Error('Need to set --public-lock-version')
  }

  const publicLock = await PublicLock.deploy()
  await publicLock.deployed()

  // eslint-disable-next-line no-console
  console.log(
    `PUBLIC LOCK > deployed v${await publicLock.publicLockVersion()} to : ${
      publicLock.address
    } (tx: ${publicLock.deployTransaction.hash})`
  )

  if (chainId !== 31337) {
    await run('verify:verify', { address: publicLock.address })
  }

  return publicLock.address
}

// execute as standalone
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

module.exports = main
