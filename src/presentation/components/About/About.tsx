import { AboutCard } from './AboutCard'

export const About: React.FC = () => {
	const cards = [
		{
			id: 1,
			title: 'Equipe de desenvolvedores',
			description:
				'Somos apaixonados por programação e frontend. Buscamos crescer e aprimorar nossas habilidades constantemente.',
			buttonText: 'Saiba mais'
		},
		{
			id: 2,
			title: 'Nosso objetivo',
			description:
				'Temos como meta fornecer desafios de programação para ajudar desenvolvedores a aprimorar suas habilidades.',
			buttonText: 'Saiba mais'
		},
		{
			id: 3,
			title: 'Faça parte da comunidade',
			description:
				'Se você é um entusiasta de frontend em busca de desafios, está no lugar certo. Junte-se a nós e participe dos nossos desafios.',
			buttonText: 'Saiba mais'
		}
	]

	return (
		<section className='container'>
			<h2 className='mb-5 text-center text-3xl font-bold leading-normal md:text-[34px] md:leading-[42px]'>
				Conheça nossa equipe e saiba mais sobre o projeto
			</h2>
			<p className='mx-auto max-w-5xl text-center text-base text-[#8C8C8C]'>
				Somos um grupo de desenvolvedores de uma comunidade no discord que se uniu para
				criar um projeto que ajude outros desenvolvedores a aprimorar suas habilidades em
				programação.
			</p>

			<hr className='mx-auto mb-10 mt-5 w-full max-w-[280px] rounded-md border-b-2 border-primary' />

			<div className='grid grid-cols-1 items-center justify-between gap-5 md:grid-cols-3'>
				{cards.map((card) => (
					<AboutCard
						key={card.id}
						title={card.title}
						description={card.description}
						buttonText={card.buttonText}
					/>
				))}
			</div>
		</section>
	)
}
