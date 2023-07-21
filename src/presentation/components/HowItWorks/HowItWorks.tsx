import { HowItWorksCard } from './HowItWorksCard'

export const HowItWorks: React.FC = () => {
	const cards = [
		{
			id: '1',
			title: 'Escolha um desafio',
			description:
				'Dê uma olhada em nossa coleção de desafios frontend. Escolha um que você sinta que será um bom desafio para você nesta etapa.'
		},
		{
			id: '2',
			title: 'Codifique o design',
			description:
				'Crie um projeto com a sua solução para o desafio escolhido, sinta-se avontade para utilizar as tecnologias que desejar.'
		},
		{
			id: '3',
			title: 'Compartilhe seu projeto',
			description:
				'Quando estiver pronto, envie a sua solução do desafio através do Discord, caso queira receber nosso feedback.'
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
						title={card.title}
						description={card.description}
					/>
				))}
			</section>
		</article>
	)
}
