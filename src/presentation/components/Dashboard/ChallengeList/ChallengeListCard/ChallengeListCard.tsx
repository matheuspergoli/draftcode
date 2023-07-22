import Link from 'next/link'
import { DeleteButton } from './DeleteButton'
import { Button } from '@components/ui/button'

interface ChallengeListCardProps {
	id: string
	image: string
	title: string
	image_id: string
}

export const ChallengeListCard: React.FC<ChallengeListCardProps> = ({
	id,
	image,
	title,
	image_id
}) => {
	return (
		<section className='flex items-center justify-between rounded-md bg-secondary px-3 py-2'>
			<div className='flex items-center gap-0 sm:gap-7'>
				<Link href={`/desafios/${id}`}>
					<figure className='hidden h-14 w-20 overflow-hidden rounded-md sm:block'>
						<img
							loading='lazy'
							src={image}
							alt={`Imagem do Projeto ${title}`}
							className='h-full w-full rounded-md object-cover transition hover:scale-110'
						/>
					</figure>
				</Link>
				<h3>{title}</h3>
			</div>
			<div className='flex gap-3'>
				<DeleteButton id={id} image_id={image_id} />
				<Button asChild>
					<Link href={`/dashboard/project/${id}`}>Editar</Link>
				</Button>
			</div>
		</section>
	)
}
