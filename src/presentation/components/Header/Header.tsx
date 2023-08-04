import Link from 'next/link'
import Image from 'next/image'
import { Links } from './Links'
import { UserAvatar } from './UserAvatar'
import { MenuMobile } from './MenuMobile'
import { LoginButton } from './LoginButton'
import { FavoritesButton } from './FavoritesButton'

interface HeaderProps {
	user?: User
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
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

				<Links />

				{user ? (
					<div className='flex items-center gap-5'>
						<UserAvatar user={user} image={user?.image} />
						<FavoritesButton />
					</div>
				) : (
					<LoginButton className='hidden md:block' />
				)}

				<MenuMobile user={user} />
			</nav>
		</header>
	)
}
