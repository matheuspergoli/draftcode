'use client'

import React from 'react'
import Link from 'next/link'
import { UsersCard } from './UsersCard'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'

interface UsersListsProps {
	users: User[]
}

export const UsersList: React.FC<UsersListsProps> = ({ users }) => {
	const [userName, setUserName] = React.useState('')

	return (
		<section className='container'>
			<div className='mb-10'>
				<h1 className='text-lg font-bold uppercase leading-[46px] sm:text-xl md:text-2xl lg:text-3xl'>
					Lista de Usuários
				</h1>
				<p className='text-lg'>Você está na seção de cargos</p>
				<Button asChild className='mt-5'>
					<Link href='/dashboard/users/ban'>Modificar banimento</Link>
				</Button>
			</div>

			<div className='mb-10 gap-5'>
				<Input
					type='search'
					placeholder='Pesquisar usuário'
					onChange={(e) => setUserName(e.target.value)}
				/>
				<p className='mt-5 font-semibold'>Total de usuários: {users?.length}</p>
			</div>

			<div className='flex flex-col gap-3'>
				{users &&
					users
						.filter((user) => user.name.includes(userName))
						.map((user) => (
							<UsersCard
								key={user.id}
								id={user.id}
								name={user.name}
								image={user.image}
								role={user.role}
							/>
						))}
			</div>
		</section>
	)
}
