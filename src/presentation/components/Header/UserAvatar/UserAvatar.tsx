'use client'

import Link from 'next/link'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@components/ui/dropdown-menu'

import { signOut } from '@externals/libs/auth'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'

interface UserAvatarProps {
	user?: User
	image?: string
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ image, user }) => {
	const isSuperAdmin = user?.role === 'SUPERADMIN'
	const isUserCreator = user?.role === 'ADMIN' || user?.role === 'SUPERADMIN'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={image} />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className='flex justify-center'>Minha Conta</DropdownMenuLabel>
				{user && isUserCreator && (
					<>
						<DropdownMenuItem asChild className='cursor-pointer justify-center uppercase'>
							<Link href='/dashboard'>Dashboard</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
					</>
				)}
				{user && isSuperAdmin && (
					<>
						<DropdownMenuItem asChild className='cursor-pointer justify-center uppercase'>
							<Link href='/dashboard/users'>Usuários</Link>
						</DropdownMenuItem>
					</>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer justify-center uppercase'
					onClick={() => signOut()}>
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
