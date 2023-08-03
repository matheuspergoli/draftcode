import { db } from '@/configs/db'
import { BanList } from '@components/Dashboard/BanList'

export default async function BannedUsers() {
	const users = (await db.user.findMany()) as unknown as User[]

	return (
		<div className='my-20'>
			<BanList users={users} />
		</div>
	)
}
