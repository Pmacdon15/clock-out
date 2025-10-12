import DeleteHoursButton from '../buttons/delete-hours-button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../dialog'

export default function DeleteHoursDialog() {
	return (
		<Dialog>
			<DialogTrigger>
				<DeleteHoursButton />
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
			</DialogContent>
		</Dialog>
	)
}
