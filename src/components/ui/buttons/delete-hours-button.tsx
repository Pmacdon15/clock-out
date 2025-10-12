'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '../button'

export default function DeleteHoursButton() {
	return (
		<Button variant={'outline'}>
			<Trash2 />
		</Button>
	)
}
