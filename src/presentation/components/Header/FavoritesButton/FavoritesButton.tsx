'use client'

import Link from 'next/link'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { useSession } from '@externals/libs/auth/useSession'

export const FavoritesButton: React.FC = () => {
	const { data: session } = useSession()

	return (
		<Link href='/favorites'>
			<div className='relative'>
				<HeartFilledIcon className='h-9 w-9 text-primary' />
				<span className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-xs text-primary'>
					{session?.user.favorites?.length}
				</span>
			</div>
		</Link>
	)
}
