import Link from 'next/link'
import { cn } from '@/presentation/lib/utils'
import { buttonVariants } from '@components/ui/button'

interface LoginButtonProps {
	className?: string
}

export const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
	return (
		<Link
			href='/login'
			className={cn(
				buttonVariants({ variant: 'ghost' }),
				'border border-primary uppercase transition',
				className
			)}>
			Login
		</Link>
	)
}
