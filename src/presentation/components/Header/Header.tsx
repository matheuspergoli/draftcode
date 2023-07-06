import Link from 'next/link'
import Image from 'next/image'
import { UserAvatar } from './UserAvatar'
import { MenuMobile } from './MenuMobile'
import { LoginButton } from './LoginButton'
import { Button } from '@components/ui/button'

interface HeaderProps {
	user?: User
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
	return (
		<header className='border-b border-border bg-secondary py-4'>
			<nav className='container flex items-center justify-between'>
				<Link href='/'>
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

				<section className='hidden items-center gap-5 md:flex'>
					<Button asChild variant='ghost'>
						<Link href='/' className='font-semibold'>
							Home
						</Link>
					</Button>

					<Button asChild variant='ghost'>
						<Link href='/desafios' className='font-semibold'>
							Desafios
						</Link>
					</Button>

					<Button asChild variant='ghost'>
						<Link href='/faq' className='font-semibold'>
							FAQ&apos;s
						</Link>
					</Button>
				</section>

				{user ? (
					<UserAvatar user={user} image={user?.image} />
				) : (
					<LoginButton className='hidden md:block' />
				)}

				<MenuMobile user={user} />
			</nav>
		</header>
	)
}
