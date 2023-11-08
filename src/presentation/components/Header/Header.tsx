import Link from 'next/link'
import Image from 'next/image'
import { UserAvatar } from './UserAvatar'
import { MenuMobile } from './MenuMobile'
import { LoginButton } from './LoginButton'
import { HeaderLinks } from './HeaderLinks'
import { FavoritesButton } from './FavoritesButton'
import { getUserSession } from '@actions/getUserSession'

export const Header = async () => {
	const session = await getUserSession()

	return (
		<header className='border-b border-border bg-secondary py-4'>
			<nav className='container flex items-center justify-between'>
				<Link href='/' className='hidden sm:block'>
					<div className='flex items-center gap-2'>
						<Image
							loading='lazy'
							alt='DraftCode Logo'
							src='/images/target.svg'
							width={31}
							height={31}
						/>
						<h1 className='text-xl font-semibold'>DraftCode</h1>
					</div>
				</Link>

				<section className='hidden items-center gap-2 md:flex lg:gap-5'>
					<HeaderLinks />
				</section>

				{session?.user ? (
					<div className='flex items-center gap-5'>
						<UserAvatar user={session?.user} image={session?.user?.image} />
						<FavoritesButton />
					</div>
				) : (
					<LoginButton className='hidden md:block' />
				)}

				<MenuMobile user={session?.user} />
			</nav>
		</header>
	)
}
