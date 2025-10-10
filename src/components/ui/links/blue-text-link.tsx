import Link from 'next/link'

export default function BlueTextLink({
	path,
	text,
}: {
	path: string
	text: string
}) {
	return (
		<Link href={`${path}`} className="text-blue-500 hover:underline">
			{text}
		</Link>
	)
}
