import Image from 'next/image'
import { HeaderLinks } from '../HeaderLinks'
import { LoginButton } from '../LoginButton'
import { Button } from '@components/ui/button'
import { getUserSession } from '@actions/getUserSession'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@components/ui/sheet'

export const MenuMobile = async () => {
	const session = await getUserSession()

	return (
		<Sheet>
			<SheetTrigger asChild className='md:hidden'>
				<Button variant='ghost'>
					<Image
						loading='lazy'
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
						<Image
							loading='lazy'
							alt='DraftCode Logo'
							src='/images/target.svg'
							width={31}
							height={31}
						/>
						<p className='text-xl font-semibold'>DraftCode</p>
					</SheetTitle>
				</SheetHeader>

				<section className='flex flex-col'>
					<HeaderLinks />
					{!session?.user && <LoginButton className='mt-10' />}
				</section>
			</SheetContent>
		</Sheet>
	)
}
