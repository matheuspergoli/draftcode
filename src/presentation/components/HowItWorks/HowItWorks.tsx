import { HowItWorksCard } from './HowItWorksCard'
import { TargetIcon, CodeIcon, Share1Icon } from '@radix-ui/react-icons'

export const HowItWorks: React.FC = () => {
	const cards = [
		{
			id: '1',
			title: 'Escolha um desafio',
			icon: TargetIcon,
			description:
				'Dê uma olhada em nossa coleção de desafios frontend. Escolha um que você sinta que será um bom desafio para você nesta etapa.'
		},
		{
			id: '2',
			title: 'Codifique o design',
			icon: CodeIcon,
			description:
				'Crie um projeto com a sua solução para o desafio escolhido, sinta-se avontade para utilizar as tecnologias que desejar.'
		},
		{
			id: '3',
			title: 'Compartilhe seu projeto',
			icon: Share1Icon,
			description:
				'Quando estiver pronto, envie a sua solução do desafio para nosso site, e caso queira receber nosso feedback você pode enviar para nosso Discord.'
		}
	]

	return (
		<article>
			<p className='mb-5 text-center text-3xl font-bold leading-normal md:text-[34px] md:leading-[42px]'>
				Como funciona?
			</p>

			<hr className='mx-auto mb-10 mt-5 w-full max-w-[280px] rounded-md border-b-2 border-primary' />

			<section className='container grid grid-cols-1 items-center justify-between gap-5 md:grid-cols-3'>
				{cards.map((card) => (
					<HowItWorksCard
						key={card.id}
						icon={card.icon}
						title={card.title}
						description={card.description}
					/>
				))}
			</section>
		</article>
	)
}
