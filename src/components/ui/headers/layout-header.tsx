import { ClockAlert } from 'lucide-react'
import Link from 'next/link'
import BorderBox from '../containers/border-box'

export default function Header() {
	return (
		<Link className="flex w-full items-center justify-center" href={'/'}>
			<BorderBox>
				<span className="flex justify-center gap-4 text-center text-4xl">
					Clock Out <ClockAlert size={34} />
				</span>
			</BorderBox>
		</Link>
	)
}
