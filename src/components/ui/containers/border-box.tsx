export default function BorderBox({ children }: { children: React.ReactNode }) {
	return (
		<div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full md:w-4/6 ">
			<div className="flex flex-col gap-4 rounded-xl p-8 bg-black">
				{children}
			</div>
		</div>
	)
}
