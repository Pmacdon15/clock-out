import BorderBox from './border-box'

export default function TermsContainer({
	children,
	typeOfContainer,
}: {
	children: React.ReactNode
	typeOfContainer: string
}) {
	return (
		<BorderBox>
			<div className="mx-auto max-w-3xl">
				<h1 className="mb-6 font-bold text-3xl">{typeOfContainer}</h1>
				<pre className="whitespace-pre-wrap font-sans">{children}</pre>
			</div>
		</BorderBox>
	)
}
