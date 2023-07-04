'use client'

import React from 'react'

import { SessionProvider } from '@/context'

type ProviderType = ({ children }: { children: React.ReactNode }) => React.JSX.Element

interface Props {
	children: React.ReactNode
	providers: Array<ProviderType>
}

const CombineProviders = ({ children, providers }: Props) => {
	return (
		<>
			{providers.reduceRight((acc, Provider) => {
				return <Provider>{acc}</Provider>
			}, children)}
		</>
	)
}

export const Provider = ({ children }: { children: React.ReactNode }) => {
	return <CombineProviders providers={[SessionProvider]}>{children}</CombineProviders>
}
