import { db } from '@/configs/db'
import { redirect } from 'next/navigation'
import { authOptions } from '@configs/auth'
import { getServerSession } from 'next-auth/next'
import { UsersList } from '@components/Dashboard/UsersList'

export default async function Users() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/')
	}

	if (session.user.role !== 'SUPERADMIN') {
		redirect('/')
	}

	const users = (await db.user.findMany()) as unknown as User[]

	return (
		<div className='my-20'>
			<UsersList users={users} />
		</div>
	)
}
