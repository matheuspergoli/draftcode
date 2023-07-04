import Link from 'next/link'
import Image from 'next/image'
import { LoginButton } from '../LoginButton'
import { Button } from '@components/ui/button'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@components/ui/sheet'

interface MenuMobileProps {
	user?: User
}

export const MenuMobile: React.FC<MenuMobileProps> = ({ user }) => {
	return (
		<Sheet>
			<SheetTrigger asChild className='md:hidden'>
				<Button variant='ghost'>
					<Image
						alt='DraftCode Menu Icon'
						src='/images/menu.svg'
						width={23}
						height={23}
					/>
				</Button>
			</SheetTrigger>

			<SheetContent className='bg-secondary'>
				<SheetHeader>
					<SheetTitle className='mb-10 flex items-center gap-2'>
						<Image alt='DraftCode Logo' src='/images/target.svg' width={31} height={31} />
						<p className='text-[20px] font-semibold'>DraftCode</p>
					</SheetTitle>
				</SheetHeader>

				<section className='flex flex-col'>
					<Button asChild variant='ghost'>
						<Link href='/' className='text-base font-semibold'>
							Home
						</Link>
					</Button>

					<Button asChild variant='ghost'>
						<Link href='/desafios' className='text-base font-semibold'>
							Desafios
						</Link>
					</Button>

					<Button asChild variant='ghost'>
						<Link href='/faq' className='text-base font-semibold'>
							FAQ&apos;s
						</Link>
					</Button>

					{!user && <LoginButton />}
				</section>
			</SheetContent>
		</Sheet>
	)
}
