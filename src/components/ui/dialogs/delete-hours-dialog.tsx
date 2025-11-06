'use client'
import { useOrganization } from '@clerk/nextjs'
import { Trash2 } from 'lucide-react'
import { Button } from '../button'
import DeleteHoursButton from '../buttons/delete-hours-button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../dialog'

export default function DeleteHoursDialog({ hoursId }: { hoursId: number }) {
	const { membership } = useOrganization()
	console.log('orginfo:', membership)

	if (membership?.roleName !== 'Admin') return null
	return (
		<Dialog>
			<DialogTrigger>
				<Trash2 />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="flex flex-col justify-end gap-2 sm:flex-row sm:justify-end sm:gap-0">
					<DialogClose asChild>
						<div className="flex w-full justify-end gap-2 sm:w-auto">
							<Button type="button" variant="secondary">
								Cancel
							</Button>
							<DeleteHoursButton hoursId={hoursId} />
						</div>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
