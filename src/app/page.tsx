import {
	OrganizationSwitcher,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs'
import { Suspense } from 'react'
import BorderBox from '@/components/ui/containers/border-box'
import BlueTextLink from '@/components/ui/links/blue-text-link'
import LinkWithPath from '../components/ui/links/link'

export default function Home() {
	return (
		<>
			<BorderBox>
				<h1 className="mb-4 font-bold text-4xl">
					Welcome to Clock-Out
				</h1>
				<p className="mx-auto max-w-2xl text-xl">
					Effortlessly track your working hours with our simple and
					intuitive punch clock system. Stay organized, monitor your
					productivity, and manage your time effectively.
				</p>
			</BorderBox>

			<Suspense>
				<SignedOut>
					<div className="max-w- md w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
						<div className="rounded-lg bg-black p-4 text-white">
							<div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
								<SignInButton />
								<SignUpButton />
							</div>
						</div>
					</div>
				</SignedOut>
				<SignedIn>
					<div className="w-full max-w-md rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
						<div className="flex flex-col items-center gap-6 rounded-lg bg-black p-4 text-white">
							<div className="flex items-center gap-4">
								<UserButton />
								<OrganizationSwitcher />
							</div>
							<div className="flex flex-col items-center gap-4 sm:flex-row">
								<LinkWithPath
									path={'/punch-clock'}
									text={'Punch Clock'}
								/>
								<LinkWithPath
									path={'/hours-worked'}
									text={'Hours Worked'}
								/>
								<LinkWithPath
									path={'/manage-hours'}
									text={'Manage Hours'}
								/>
							</div>
						</div>
					</div>
				</SignedIn>
			</Suspense>

			<div className="w-full max-w-md rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
				<div className="rounded-lg bg-black p-4 text-white">
					<nav className="flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
						<BlueTextLink
							path={'/terms'}
							text={'Terms of Service'}
						/>
						<BlueTextLink
							path={'/privacy'}
							text={'Privacy Policy'}
						/>
					</nav>
				</div>
			</div>
			{/* // </div> */}
		</>
	)
}
