import { Skeleton } from '@components/ui/skeleton'

export const HeaderSkeleton = () => {
	return (
		<header className='border-b border-border py-4'>
			<nav className='container flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<Skeleton className='w-24 h-5' />
				</div>
				<div className='flex items-center gap-14'>
					<Skeleton className='w-20 h-10' />
					<Skeleton className='w-20 h-10' />
					<Skeleton className='w-20 h-10' />
					<Skeleton className='w-20 h-10' />
				</div>
				<div className='flex items-center gap-5'>
					<Skeleton className='w-10 h-10 rounded-full' />
					<Skeleton className='w-10 h-10 rounded-full' />
				</div>
			</nav>
		</header>
	)
}
