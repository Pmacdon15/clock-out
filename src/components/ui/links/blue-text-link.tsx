import type { Route } from 'next'
import Link from 'next/link'

export default function BlueTextLink({
	path,
	text,
}: {
	path: Route
	text: string
}) {
	return (
		<Link className="text-blue-500 hover:underline" href={path}>
			{text}
		</Link>
	)
}
