import { BanButton } from './BanButton'

interface BanCardProps {
	id: string
	name: string
	image: string
	isBanned: boolean
}

export const BanListCard: React.FC<BanCardProps> = ({ image, name, id, isBanned }) => {
	return (
		<section className='flex items-center justify-between rounded-md bg-secondary px-3 py-2'>
			<div className='flex items-center gap-0 sm:gap-7'>
				<figure className='hidden h-14 w-20 sm:block'>
					<img
						loading='lazy'
						src={image}
						alt={`Imagem do Projeto ${name}`}
						className='h-full w-full rounded-md'
					/>
				</figure>

				<h3>
					{name} {isBanned && '- Banido'}
				</h3>
			</div>
			<BanButton id={id} isBanned={isBanned} />
		</section>
	)
}
