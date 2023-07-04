import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@components/ui/accordion'

export const FAQ: React.FC = () => {
	const accordionItems = [
		{
			id: '1',
			title: 'Posso utilizar os desafios no meu portfólio?',
			content:
				'Sim, você pode utilizar os desafios concluídos no seu portfólio para demonstrar suas habilidades em programação frontend.'
		},
		{
			id: '2',
			title: 'Os desafios possuem soluções pré-definidas?',
			content:
				'Não, os desafios são projetados para estimular seu pensamento criativo e suas habilidades de resolução de problemas. Encorajamos você a encontrar suas próprias soluções.'
		},
		{
			id: '3',
			title: 'Posso compartilhar minhas soluções com a comunidade?',
			content:
				'Com certeza! Acreditamos no poder da colaboração e do compartilhamento de conhecimento. Você pode compartilhar suas soluções com a comunidade para que todos possam aprender e se inspirar.'
		},
		{
			id: '4',
			title: 'Os desafios são adequados para iniciantes?',
			content:
				'Sim, temos desafios que abrangem diferentes níveis de dificuldade, incluindo desafios adequados para iniciantes. É uma ótima maneira de aprender e praticar conceitos básicos de programação frontend.'
		},
		{
			id: '5',
			title: 'Existe um prazo para concluir os desafios?',
			content:
				'Não, você pode concluir os desafios no seu próprio ritmo. Não há prazos ou restrições de tempo. A ideia é que você tenha flexibilidade para aprender e desenvolver suas habilidades no seu tempo.'
		},
		{
			id: '6',
			title: 'Posso contribuir com novos desafios?',
			content:
				'Absolutamente! Se você tem ideias para novos desafios ou gostaria de contribuir com o crescimento da plataforma, entre em contato conosco. Estamos sempre abertos a sugestões e colaborações.'
		}
	]

	return (
		<section className='container'>
			<h1 className='text-center text-[20px] font-bold md:text-[32px]'>
				Perguntas frequentes
			</h1>
			<p className='text-center font-medium leading-6 text-[#8C8C8C]'>
				Confira as respostas para as perguntas mais frequentes sobre o Draftcode. Se ainda
				tiver dúvidas, entre em contato em nossa comunidade no discord.
			</p>
			<hr className='mx-auto mb-[105px] mt-[25px] w-full max-w-[280px] rounded-md border-b-2 border-primary' />

			<Accordion type='single' collapsible>
				{accordionItems.map((item) => (
					<AccordionItem key={item.id} value={item.id}>
						<AccordionTrigger className='text-base font-bold leading-8 md:text-[22px]'>
							{item.title}
						</AccordionTrigger>
						<AccordionContent className='text-sm font-normal leading-8 md:text-[20px]'>
							{item.content}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	)
}
