import type { Route } from 'next'
import Link from 'next/link'

export default function TextLink({
	path,
	text,
}: {
	path: Route
	text: string
}) {
	return (
		<Link className="hover:underline" href={path}>
			{text}
		</Link>
	)
}
