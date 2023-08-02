import React from 'react'
import Link from 'next/link'
import { cn } from '@/presentation/lib/utils'

interface EditActionProps {
	id: string
	className?: string
}

export const EditAction: React.FC<EditActionProps> = ({ id, className }) => {
	return (
		<Link
			href={`/solutions/edit/${id}`}
			aria-label='Deletar solução'
			className={cn(
				'flex items-center gap-2 bg-red-500 font-medium transition hover:bg-red-600 disabled:opacity-40',
				className
			)}>
			Editar
		</Link>
	)
}
