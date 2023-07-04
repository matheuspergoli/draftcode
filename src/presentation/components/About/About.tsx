import { AboutCard } from './AboutCard'

export const About: React.FC = () => {
	const cards = [
		{
			id: 1,
			title: 'Equipe de desenvolvedores',
			description:
				'Somos uma comunidade apaixonada por programação e principalmente frontend. Estamos constantemente buscando desafios e aprimorando nossas habilidades para entregar soluções criativas e funcionais.',
			buttonText: 'Saiba mais'
		},
		{
			id: 2,
			title: 'Nosso objetivo',
			description:
				'Nosso objetivo é fornecer desafios de programação frontend para ajudar outros desenvolvedores a aprimorar suas habilidades. Estamos comprometidos em criar um ambiente colaborativo e de aprendizado para a comunidade.',
			buttonText: 'Saiba mais'
		},
		{
			id: 3,
			title: 'Faça parte da nossa comunidade',
			description:
				'Se você é um entusiasta de frontend em busca de desafios, você veio ao lugar certo. Faça parte da nossa comunidade e participe dos nossos desafios para expandir seus conhecimentos e se conectar com outros desenvolvedores.',
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
				frontend. Junto com a comunidade, criamos desafios de programação frontend para
				que os desenvolvedores possam praticar e aprimorar suas habilidades.
			</p>

			<hr className='mx-auto mb-[40px] mt-[20px] w-full max-w-[280px] rounded-md border-b-2 border-primary' />

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
