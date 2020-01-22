import React from 'react'
import * as rtl from '@testing-library/react'
import { ValidKey } from '../../../../components/interface/verification/Key'
import { OwnedKey } from '../../../../components/interface/keychain/KeychainTypes'

let metadata = {}

jest.mock('../../../../hooks/useGetMetadataFor.js', () => {
  return jest.fn().mockImplementation(() => {
    return metadata
  })
})

const ownedKey: OwnedKey = {
  lock: {
    address: '0x123abc',
    name: 'Lock Around the Clock',
    expirationDuration: '123456',
    tokenAddress: 'a token address',
    price: '5',
    owner: '0xaFAEfc6dd3C9feF66f92BA838b132644451F0715',
  },
  tokenURI: '',
  expiration: '12345678',
  id: 'an id',
  keyId: 'a key id',
}

const signatureTimestamp = 12312412
const owner = '0xkeyOwner'
const viewer = '0xviewer'

describe('ValidKey component', () => {
  beforeEach(() => {
    metadata = {
      protected: {
        email: 'julien@unlock-protocol.com',
      },
      public: {
        name: 'Genestoux',
      },
    }
  })

  it('should render a valid key with no metadata', () => {
    expect.assertions(1)
    metadata = {}
    const wrapper = rtl.render(
      <ValidKey
        ownedKey={ownedKey}
        signatureTimestamp={signatureTimestamp}
        owner={owner}
        viewer={ownedKey.lock.owner}
      />
    )
    expect(wrapper.queryByText('Valid Key')).not.toBeNull()
  })

  it('should useGetMetadataFor if the viewer is the lock owner', () => {
    expect.assertions(1)
    const wrapper = rtl.render(
      <ValidKey
        ownedKey={ownedKey}
        signatureTimestamp={signatureTimestamp}
        owner={owner}
        viewer={ownedKey.lock.owner}
      />
    )
    expect(wrapper.queryByText('julien@unlock-protocol.com')).not.toBeNull()
  })

  it('should not useGetMetadataFor if the viewer is not the lock owner', () => {
    expect.assertions(1)
    const wrapper = rtl.render(
      <ValidKey
        ownedKey={ownedKey}
        signatureTimestamp={signatureTimestamp}
        owner={owner}
        viewer={viewer}
      />
    )
    expect(wrapper.queryByText('julien@unlock-protocol.com')).toBeNull()
  })
})
