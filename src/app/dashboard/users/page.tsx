import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'
import { getUsers } from '@actions/getUsers'
import { getUserSession } from '@actions/getUserSession'

const UsersList = dynamic(() => import('@components/Dashboard/UsersList/UsersList'))

export default async function Users() {
	const session = await getUserSession()

	if (!session) {
		redirect('/')
	}

	if (session.user.role !== 'SUPERADMIN') {
		redirect('/')
	}

	const users = await getUsers()

	return (
		<div className='my-20'>
			<UsersList users={users} />
		</div>
	)
}
