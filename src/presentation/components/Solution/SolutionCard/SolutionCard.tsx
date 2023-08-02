import React from 'react'
import Link from 'next/link'
import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import { EditAction } from './Actions/EditAction'
import { DeleteAction } from './Actions/DeleteAction'
import { AproveAction } from './Actions/AproveAction'

interface SolutionCardProps {
	id: string
	image: string
	title: string
	brief?: string
	image_id: string
	createdAt: string
	difficulty: string
	authorName: string
	authorImage: string
	include?: {
		editAction?: boolean
		deleteAction?: boolean
		aproveAction?: boolean
	}
}

export const SolutionCard: React.FC<SolutionCardProps> = (props) => {
	return (
		<article className='relative h-full w-full max-w-md'>
			{props.include?.editAction && (
				<EditAction
					id={props.id}
					className='absolute right-0 z-50 rounded-tr-md px-3 py-1'
				/>
			)}
			{props.include?.deleteAction && (
				<DeleteAction
					id={props.id}
					image_id={props.image_id}
					className='absolute left-0 z-50 rounded-tl-md px-3 py-1'
				/>
			)}
			{props.include?.aproveAction && (
				<AproveAction
					id={props.id}
					className='absolute right-1/2 z-50 translate-x-1/2 px-3 py-1'
				/>
			)}
			<Link passHref href={`/solutions/${props.id}`}>
				<article className='h-full rounded-md border border-border bg-secondary'>
					<figure className='h-[180px] overflow-hidden rounded-t-md'>
						<img
							src={props.image}
							alt={props.title}
							className='h-full w-full rounded-t-md object-cover transition hover:scale-110'
						/>
					</figure>
					<section className='flex flex-col gap-5 px-6 py-[40px]'>
						<h2 className='w-fit border-b border-primary text-sm font-medium uppercase leading-normal'>
							{props.difficulty}
						</h2>
						<h3 className='text-[20px] font-bold leading-normal'>{props.title}</h3>
						{props.brief && (
							<p className='font-medium leading-6 text-[#8C8C8C]'>{props.brief}</p>
						)}
					</section>
					<footer className='flex items-center justify-between px-6 py-4'>
						<div className='flex items-center gap-3'>
							<img
								src={props.authorImage}
								alt={props.authorName}
								className='h-[40px] w-[40px] rounded-full object-cover'
							/>
							<div>
								<p className='text-sm font-medium'>{props.authorName}</p>
								<p className='text-sm font-medium'>
									{formatDistanceToNow(new Date(props.createdAt), {
										locale: ptBR,
										addSuffix: true
									})}
								</p>
							</div>
						</div>
					</footer>
				</article>
			</Link>
		</article>
	)
}
