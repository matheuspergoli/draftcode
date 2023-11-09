import { UserAvatar } from '../UserAvatar'
import { LoginButton } from '../LoginButton'
import { FavoritesButton } from '../FavoritesButton'
import { getUserSession } from '@actions/getUserSession'

export const ProfileCard = async () => {
	const session = await getUserSession()

	return (
		<>
			{session?.user ? (
				<div className='flex items-center gap-5'>
					<UserAvatar user={session?.user} image={session?.user?.image} />
					<FavoritesButton />
				</div>
			) : (
				<LoginButton className='hidden md:block' />
			)}
		</>
	)
}
