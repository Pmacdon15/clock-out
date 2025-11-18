import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="flex w-full shrink-0 flex-col items-center gap-1 border-t px-4 py-3 sm:flex-row md:px-6">
			<p className="text-gray-500 text-xs dark:text-gray-400">
				&copy; 2023 Clock Out. All rights reserved.
			</p>
			<nav className="flex gap-4 sm:ml-auto sm:gap-6">
				<Link
					className="text-xs underline-offset-4 hover:underline"
					href="/privacy"
				>
					Privacy Policy
				</Link>
				<Link
					className="text-xs underline-offset-4 hover:underline"
					href="/terms"
				>
					Terms of Service
				</Link>
				<a
					className="text-xs underline-offset-4 hover:underline"
					href="mailto:patrick@patmac.ca"
				>
					patrick@patmac.ca
				</a>
			</nav>
		</footer>
	)
}
