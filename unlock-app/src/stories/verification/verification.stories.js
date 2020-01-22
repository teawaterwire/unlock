import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  ValidKeyWithMetadata,
  InvalidKey,
} from '../../components/interface/verification/Key'

const ownedKey = {
  lock: {
    name: 'Week in Ethereum News',
    owner: '0x456',
  },
  keyId: 53,
  expiration: 2979853603,
}

const owner = '0x33ab07dF7f09e793dDD1E9A25b079989a557119A'

const expirationDate = 'Jun 24th, 2020'
const timeElapsedSinceSignature = '20 minutes ago'

storiesOf('Verification', module)
  .add('with an invalid key', () => {
    return <InvalidKey />
  })
  .add('with a valid key', () => {
    const metadata = {}

    return (
      <ValidKeyWithMetadata
        ownedKey={ownedKey}
        metadata={metadata}
        owner={owner}
        expirationDate={expirationDate}
        timeElapsedSinceSignature={timeElapsedSinceSignature}
      />
    )
  })
  .add('with a valid key viewed by the lock owner (with metadata!)', () => {
    const metadata = {
      protected: {
        name: 'Julien',
        email: 'julien@unlock-protocol.com',
      },
    }
    return (
      <ValidKeyWithMetadata
        ownedKey={ownedKey}
        metadata={metadata}
        owner={owner}
        expirationDate={expirationDate}
        timeElapsedSinceSignature={timeElapsedSinceSignature}
      />
    )
  })
