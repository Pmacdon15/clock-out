import Link from 'next/link'

export default function BlueTextLink({
	path,
	text,
}: {
	path: string
	text: string
}) {
	return (
		<Link className="text-blue-500 hover:underline" href={`${path}`}>
			{text}
		</Link>
	)
}
