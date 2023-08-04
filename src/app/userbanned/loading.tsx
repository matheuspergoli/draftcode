import { Skeleton } from '@components/ui/skeleton'

export default function Loading() {
	return (
		<div className='container'>
			<div className='mt-16'>
				<div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
					<div>
						<Skeleton className='h-64 w-full rounded-lg' />
						<Skeleton className='mt-4 h-4 w-24' />
						<Skeleton className='mt-2 h-4 w-32' />
					</div>
					<div>
						<Skeleton className='h-64 w-full rounded-lg' />
						<Skeleton className='mt-4 h-4 w-24' />
						<Skeleton className='mt-2 h-4 w-32' />
					</div>
					<div>
						<Skeleton className='h-64 w-full rounded-lg' />
						<Skeleton className='mt-4 h-4 w-24' />
						<Skeleton className='mt-2 h-4 w-32' />
					</div>
					<div>
						<Skeleton className='h-64 w-full rounded-lg' />
						<Skeleton className='mt-4 h-4 w-24' />
						<Skeleton className='mt-2 h-4 w-32' />
					</div>
					<div>
						<Skeleton className='h-64 w-full rounded-lg' />
						<Skeleton className='mt-4 h-4 w-24' />
						<Skeleton className='mt-2 h-4 w-32' />
					</div>
					<div>
						<Skeleton className='h-64 w-full rounded-lg' />
						<Skeleton className='mt-4 h-4 w-24' />
						<Skeleton className='mt-2 h-4 w-32' />
					</div>
				</div>
			</div>
		</div>
	)
}
