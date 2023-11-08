import { Skeleton } from '@components/ui/skeleton'

export const ChallengeCardSkeleton = () => {
	return (
		<article className='h-full w-full max-w-md'>
			<div>
				<Skeleton className='h-full rounded-md bg-secondary'>
					<Skeleton className='h-[180px] overflow-hidden rounded-t-md' />
					<section className='flex flex-col gap-5 px-6 py-[40px]'>
						<Skeleton className='h-4 w-1/3' />
						<Skeleton className='h-7 w-1/2' />
						<Skeleton className='w-full h-4' />
					</section>
				</Skeleton>
			</div>
		</article>
	)
}
