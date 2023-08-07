'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/presentation/lib/utils'
import { useToast } from '@components/ui/use-toast'
import { ProjectSchemaFavorite } from '@/validations'
import { useSession } from '@externals/libs/auth/useSession'
import { ReloadIcon, HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons'

interface FavoriteButtonProps {
	projectId: string
	className?: string
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = (props) => {
	const router = useRouter()
	const { toast } = useToast()
	const { data: session, update } = useSession()
	const [loading, setLoading] = React.useState(false)

	const favoriteChallenge = async () => {
		try {
			setLoading(true)
			const { projectId } = ProjectSchemaFavorite.parse(props)

			if (!session) {
				toast({
					variant: 'destructive',
					title: 'Faça login para favoritar o projeto',
					description: 'Você precisa estar logado para favoritar o projeto'
				})

				setLoading(false)

				return
			}

			const response = await fetch('/api/favorite', {
				method: 'POST',
				body: JSON.stringify({ projectId })
			})

			await response.json()

			update()
			setLoading(false)
			router.refresh()
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Erro ao favoritar projeto',
				description: 'Verifique os campos e tente novamente'
			})

			setLoading(false)
		}
	}

	const unfavoriteChallenge = async () => {
		try {
			setLoading(true)
			const { projectId } = ProjectSchemaFavorite.parse(props)

			if (!session) {
				toast({
					variant: 'destructive',
					title: 'Faça login para desfavoritar o projeto',
					description: 'Você precisa estar logado para desfavoritar o projeto'
				})

				setLoading(false)

				return
			}

			const response = await fetch('/api/favorite', {
				method: 'DELETE',
				body: JSON.stringify({ projectId })
			})

			await response.json()

			update()
			setLoading(false)
			router.refresh()
		} catch (error) {
			toast({
				variant: 'destructive',
				title: 'Erro ao desfavoritar projeto',
				description: 'Verifique os campos e tente novamente'
			})

			setLoading(false)
		}
	}

	const onSubmit = session?.user.favorites
		.map((favorite) => favorite.project_id)
		.includes(props.projectId)
		? unfavoriteChallenge
		: favoriteChallenge

	return (
		<button
			aria-label='Favoritar projeto'
			className={cn(props.className)}
			onClick={onSubmit}>
			{loading ? (
				<ReloadIcon width={35} height={35} className='animate-spin' />
			) : session?.user.favorites
					.map((favorite) => favorite.project_id)
					.includes(props.projectId) ? (
				<div className='rounded-full'>
					<HeartFilledIcon width={35} height={35} className='text-primary' />
				</div>
			) : (
				<div className='relative'>
					<HeartIcon width={35} height={35} className='absolute text-white' />
					<HeartFilledIcon width={35} height={35} className='text-neutral-500/70' />
				</div>
			)}
		</button>
	)
}
