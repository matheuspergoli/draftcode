import { DesktopIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'

interface CreatorCardProps {
	image: string
	name: string
	github?: string
	website?: string
	linkedin?: string
}

export const CreatorCard: React.FC<CreatorCardProps> = ({
	image,
	name,
	github,
	website,
	linkedin
}) => {
	return (
		<article className='flex w-full max-w-sm flex-col gap-[25px] rounded-md border border-border bg-secondary p-[25px]'>
			<div className='flex items-center gap-[10px]'>
				<figure className='h-16 w-16'>
					<img
						loading='lazy'
						className='h-full w-full rounded-full object-cover'
						src={image}
						alt={`Foto do Criador do Desafio ${name}`}
					/>
				</figure>
				<div className='flex flex-col items-start justify-center'>
					<span className='text-xs text-[#8C8C8C]'>Design feito por</span>
					<p className='border-b-2 border-primary text-xl font-bold'>{name}</p>
				</div>
			</div>

			{linkedin || github || website ? (
				<div className='flex flex-wrap items-center gap-[15px]'>
					{linkedin && (
						<a
							className='flex items-center gap-2 text-sm'
							href={linkedin}
							target='_blank'
							rel='noreferrer'>
							<LinkedInLogoIcon className='h-5 w-5' />
							LinkedIn
						</a>
					)}

					{github && (
						<a
							className='flex items-center gap-2 text-sm'
							href={github}
							target='_blank'
							rel='noreferrer'>
							<GitHubLogoIcon className='h-5 w-5' />
							GitHub
						</a>
					)}

					{website && (
						<a
							className='flex items-center gap-2 text-sm'
							href={website}
							target='_blank'
							rel='noreferrer'>
							<DesktopIcon className='h-5 w-5' />
							Website
						</a>
					)}
				</div>
			) : null}
		</article>
	)
}
