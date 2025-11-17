export default function PageContainer({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-[url('/background.png')] bg-center bg-cover bg-no-repeat p-4 md:gap-8">
			{children}
		</div>
	)
}
