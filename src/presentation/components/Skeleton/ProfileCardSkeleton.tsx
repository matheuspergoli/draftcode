import { Skeleton } from '@components/ui/skeleton'

export const ProfileCardSkeleton = () => {
	return (
		<div className='flex items-center gap-5'>
			<Skeleton className='w-9 h-9 rounded-full border-2' />
			<Skeleton className='w-9 h-9 rounded-full border-2' />
		</div>
	)
}
