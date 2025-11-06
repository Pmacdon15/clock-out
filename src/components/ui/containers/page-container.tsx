export default function PageContainer({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="mt-4 flex flex-col items-center justify-center gap-4 p-4 md:gap-8">
			{children}
		</div>
	)
}
