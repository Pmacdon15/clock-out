import { ClockAlert } from 'lucide-react'
import Link from 'next/link'

export default function Header() {
	return (
		<Link href={'/'}>
			<div className="mx-auto mt-8 flex w-full items-center justify-center rounded-full border-[3px] border-blue-400 border-dashed p-4 md:w-4/6">
				<div
					className={
						'flex items-center justify-center gap-2 text-center align-middle font-bold text-4xl'
					}
				>
					Clock Out <ClockAlert size={34} />
				</div>
			</div>
		</Link>
	)
}
