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
				<DialogFooter className="justify-end sm:justify-end flex flex-col sm:flex-row gap-2 sm:gap-0">
					<DialogClose asChild>
						<div className="flex justify-end gap-2 w-full sm:w-auto">
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