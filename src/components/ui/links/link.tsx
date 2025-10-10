import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default function LinkWithPath({
	path,
	text,
}: {
	path: string
	text: string
}) {
	return (
		<Link href={`${path}`}>
			<Button variant={'outline'}>{text}</Button>
		</Link>
	)
}
