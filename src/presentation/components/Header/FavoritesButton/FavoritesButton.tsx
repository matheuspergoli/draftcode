import Link from 'next/link'
import { getFavorites } from '@actions/getFavorites'
import { HeartFilledIcon } from '@radix-ui/react-icons'

interface FavoritesButtonProps {
	user: User
}

export const FavoritesButton: React.FC<FavoritesButtonProps> = async ({ user }) => {
	const favorites = await getFavorites(user?.id)

	return (
		<Link href='/favorites'>
			<div className='relative'>
				<HeartFilledIcon className='h-9 w-9 text-primary' />
				<span className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-xs text-primary'>
					{favorites.length}
				</span>
			</div>
		</Link>
	)
}
