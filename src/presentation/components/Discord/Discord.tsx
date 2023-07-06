import Image from 'next/image'
import { Button } from '@components/ui/button'

export const Discord: React.FC = () => {
	return (
		<section className='bg-background bg-[url("/images/bg-discord.jpg")] bg-contain py-[100px] bg-blend-overlay md:bg-secondary'>
			<article className='container'>
				<h3 className='mb-3 text-center text-2xl font-bold leading-normal'>
					Junte-se a comunidade do Discord!
				</h3>
				<p className='mb-3 text-center font-normal leading-6 text-[#8C8C8C]'>
					Esperamos vê-lo em breve em nossa comunidade de desenvolvedores no Discord
				</p>
				<hr className='mx-auto mb-[30px] w-full max-w-[280px] rounded-md border-b-2 border-primary' />
				<a
					className='mx-auto block w-fit'
					href='https://discord.gg/svsgUgAvcx'
					rel='noreferrer'
					target='_blank'>
					<Button
						size='lg'
						className='flex items-center gap-4 bg-[#5662F6] uppercase hover:bg-[#5662F6]/70'>
						<Image
							loading='lazy'
							src='/images/discord.svg'
							alt='Discord Icon'
							width={20}
							height={20}
						/>
						Discord
					</Button>
				</a>
			</article>
		</section>
	)
}
