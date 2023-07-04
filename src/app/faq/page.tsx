import { FAQ } from '@components/FAQ'
import { Discord } from '@components/Discord'

export default function FaqPage() {
	return (
		<main>
			<div className='mb-20 mt-32'>
				<FAQ />
			</div>
			<div className='mb-20'>
				<Discord />
			</div>
		</main>
	)
}
