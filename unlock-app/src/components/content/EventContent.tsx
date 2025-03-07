import React from 'react'

import Head from 'next/head'
import { pageTitle } from '../../constants'
import { useRouter } from 'next/router'
import { AppLayout } from '../interface/layouts/AppLayout'
import LoadingIcon from '../interface/Loading'
import EventDetails from './event/EventDetails'
import { EventLandingPage } from './event/EventLandingPage'
import { useRouterQueryForLockAddressAndNetworks } from '~/hooks/useRouterQueryForLockAddressAndNetworks'
import { useMetadata } from '~/hooks/metadata'
import { toFormData } from '~/components/interface/locks/metadata/utils'
import { Event, PaywallConfigType } from '@unlock-protocol/core'

export const EventContent = () => {
  const {
    lockAddress,
    network,
    isLoading: isLoadingQuery,
  } = useRouterQueryForLockAddressAndNetworks()
  const { data: metadata, isInitialLoading: isMetadataLoading } = useMetadata({
    lockAddress,
    network,
  })
  const event = metadata ? (toFormData(metadata) as Event) : undefined
  const isLoading = isLoadingQuery || isMetadataLoading

  // Create a checkout config
  const checkoutConfig = {
    config: {
      locks: {
        [lockAddress]: {
          network,
        },
      },
      title: 'Registration',
      emailRequired: true,
      metadataInputs: [
        {
          name: 'fullname',
          type: 'text',
          label: 'Full name',
          required: true,
          placeholder: 'Satoshi Nakamoto',
          defaultValue: '',
        },
      ],
    } as PaywallConfigType,
  }

  return EventContentWithProps({ isLoading, checkoutConfig, event })
}

interface EventContentWithPropsProps {
  event?: Event
  isLoading?: boolean
  checkoutConfig: {
    id?: string
    config: PaywallConfigType
  }
}

export const EventContentWithProps = ({
  isLoading,
  checkoutConfig,
  event,
}: EventContentWithPropsProps) => {
  const router = useRouter()

  const handleCreateEvent = () => {
    router.push(
      'https://unlock-protocol-1.hubspotpagebuilder.com/unlock-protocol-newsletter-signup-0'
    )
  }

  if (isLoading) {
    return <LoadingIcon />
  }

  return (
    <AppLayout
      showFooter={!event}
      showLinks={false}
      authRequired={false}
      logoRedirectUrl="/event"
      logoImageUrl="/images/svg/logo-unlock-events.svg"
    >
      <Head>
        <title>{pageTitle('Event')}</title>
      </Head>

      {!event && <EventLandingPage handleCreateEvent={handleCreateEvent} />}
      {!!event && (
        <EventDetails event={event} checkoutConfig={checkoutConfig} />
      )}
    </AppLayout>
  )
}

export default EventContent
