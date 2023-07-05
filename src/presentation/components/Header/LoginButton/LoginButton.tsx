'use client'

import { cn } from '@/presentation/lib/utils'
import { signIn } from '@externals/libs/auth'
import { Button } from '@components/ui/button'

interface LoginButtonProps {
	className?: string
}

export const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
	return (
		<Button
			variant='ghost'
			className={cn('border border-primary uppercase leading-none transition', className)}
			onClick={() => signIn()}>
			Login
		</Button>
	)
}
