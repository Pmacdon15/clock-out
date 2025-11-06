export default function BorderBox({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-1 md:w-4/6">
			<div className="flex flex-col gap-4 rounded-xl bg-black p-8">
				{children}
			</div>
		</div>
	)
}
