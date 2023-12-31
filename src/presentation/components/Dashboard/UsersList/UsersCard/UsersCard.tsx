import { UpdateButton } from './UpdateButton'

interface UsersCardProps {
	id: string
	role: string
	name: string
	image: string
}

export const UsersCard: React.FC<UsersCardProps> = ({ image, name, id, role }) => {
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
					{name} - {role}
				</h3>
			</div>
			<UpdateButton id={id} />
		</section>
	)
}
