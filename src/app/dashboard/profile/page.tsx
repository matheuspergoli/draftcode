import { Profile } from '@components/Dashboard/Profile'
import { getUserSession } from '@actions/getUserSession'

export default async function ProfilePage() {
	const session = await getUserSession()

	return (
		<div className='my-20'>
			<Profile user={session?.user as User} />
		</div>
	)
}
