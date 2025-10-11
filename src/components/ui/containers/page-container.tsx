export default function PageContainer({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex flex-col justify-center items-center p-4 mt-8 gap-4  md:gap-8">
			{children}
		</div>
	)
}
