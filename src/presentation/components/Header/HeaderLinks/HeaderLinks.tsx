'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@components/ui/button'

export const HeaderLinks: React.FC = () => {
	const pathname = usePathname()

	return (
		<>
			<Button asChild variant={pathname === '/' ? 'default' : 'ghost'}>
				<Link href='/' className='font-semibold'>
					Home
				</Link>
			</Button>

			<Button asChild variant={pathname === '/desafios' ? 'default' : 'ghost'}>
				<Link href='/desafios' className='font-semibold'>
					Desafios
				</Link>
			</Button>

			<Button asChild variant={pathname === '/solutions' ? 'default' : 'ghost'}>
				<Link href='/solutions' className='font-semibold'>
					Soluções
				</Link>
			</Button>

			<Button asChild variant={pathname === '/recursos' ? 'default' : 'ghost'}>
				<Link href='/recursos' className='font-semibold'>
					Recursos
				</Link>
			</Button>

			<Button asChild variant={pathname === '/blog' ? 'default' : 'ghost'}>
				<Link href='/blog' className='font-semibold'>
					Blog
				</Link>
			</Button>
		</>
	)
}
