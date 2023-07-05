'use client'

import React from 'react'
import { UsersCard } from './UsersCard'
import { Input } from '@components/ui/input'

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
			</div>

			<div className='mb-10 gap-5'>
				<Input
					type='search'
					placeholder='Pesquisar usuário'
					onChange={(e) => setUserName(e.target.value)}
				/>
			</div>

			<div className='flex flex-col gap-3'>
				{users &&
					users
						.filter((user) => user.name.includes(userName))
						.map((user) => (
							<UsersCard key={user.id} id={user.id} name={user.name} image={user.image} />
						))}
			</div>
		</section>
	)
}
