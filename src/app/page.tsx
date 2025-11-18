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
import TextLink from '@/components/ui/links/text-link'
import LinkWithPath from '../components/ui/links/link'

export default function Home() {
	return (
		<>
			<BorderBox>
				<h1 className="mb-4 font-bold text-4xl">
					Welcome to Clock-Out
				</h1>
				<p className="mx-auto max-w-2xl indent-6 text-xl">
					Effortlessly track your working hours with our simple and
					intuitive punch clock system. Stay organized, monitor your
					productivity, and manage your time effectively.
				</p>
			</BorderBox>

			<Suspense>
				<SignedOut>
					<div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
						<div className="rounded-lg bg-background p-4 text-white">
							<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
								<SignInButton />
								<SignUpButton />
							</div>
						</div>
					</div>
				</SignedOut>
				<SignedIn>
					<BorderBox>
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
					</BorderBox>
				</SignedIn>
			</Suspense>

			<BorderBox>
				<nav className="flex flex-col items-center justify-center gap-4 text-sm sm:flex-row">
					<TextLink path={'/terms'} text={'Terms of Service'} />
					<TextLink path={'/privacy'} text={'Privacy Policy'} />
				</nav>
			</BorderBox>
		</>
	)
}
