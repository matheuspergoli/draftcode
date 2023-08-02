import React from 'react'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { cn } from '@/presentation/lib/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/ui/hover-card'

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string
	htmlFor: string
	helperText: string
	className?: string
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
	(
		{ type = 'text', placeholder, label, htmlFor, helperText, className, ...props },
		ref
	) => {
		return (
			<HoverCard>
				<div className={cn('mb-3 flex w-full flex-col gap-2', className)}>
					<Label htmlFor={htmlFor}>{label}</Label>
					<HoverCardTrigger>
						<Input
							id={htmlFor}
							type={type}
							placeholder={placeholder}
							ref={ref}
							{...props}
						/>
					</HoverCardTrigger>
					<HoverCardContent>{helperText}</HoverCardContent>
				</div>
			</HoverCard>
		)
	}
)
