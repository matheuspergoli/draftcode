import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { MenuMobile } from './MenuMobile'
import { HeaderLinks } from './HeaderLinks'
import { ProfileCard } from './ProfileCard'
import { ProfileCardSkeleton, MenuMobileSkeleton } from '@components/Skeleton'

export const Header = () => {
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

				<Suspense fallback={<ProfileCardSkeleton />}>
					<ProfileCard />
				</Suspense>

				<Suspense fallback={<MenuMobileSkeleton />}>
					<MenuMobile />
				</Suspense>
			</nav>
		</header>
	)
}
