'use client'

import React from 'react'
import { Label } from '@components/ui/label'
import { Textarea } from '@components/ui/textarea'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@components/ui/hover-card'

type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label: string
	htmlFor: string
	helperText: string
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
	({ placeholder, label, htmlFor, helperText, ...props }, ref) => {
		return (
			<HoverCard>
				<div className='flex-1'>
					<Label htmlFor={htmlFor}>{label}</Label>
					<HoverCardTrigger>
						<Textarea
							ref={ref}
							id={htmlFor}
							className='whitespace-pre-wrap'
							placeholder={placeholder}
							rows={10}
							{...props}
						/>
					</HoverCardTrigger>
					<HoverCardContent>{helperText}</HoverCardContent>
				</div>
			</HoverCard>
		)
	}
)
