import {
	OrganizationSwitcher,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs'
import { Suspense } from 'react'
import LinkWithPath from '../components/ui/links/link'
import BlueTextLink from '@/components/ui/links/blue-text-link'

export default function Home() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col items-center p-8 gap-8">
			<div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full max-w-4xl text-center mt-16 mb-8">
				<div className="bg-black text-white rounded-lg p-8 shadow-lg">
					<h1 className="text-4xl font-bold mb-4">
						Welcome to Clock-Out
					</h1>
					<p className="text-xl max-w-2xl mx-auto">
						Effortlessly track your working hours with our simple
						and intuitive punch clock system. Stay organized,
						monitor your productivity, and manage your time
						effectively.
					</p>
				</div>
			</div>

			<Suspense>
				<SignedOut>
					<div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full max-w-md">
						<div className="bg-black text-white rounded-lg p-4">
							<div className="flex flex-col sm:flex-row gap-4">
								<SignInButton />
								<SignUpButton />
							</div>
						</div>
					</div>
				</SignedOut>
				<SignedIn>
					<div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full max-w-md">
						<div className="bg-black text-white rounded-lg p-4 flex flex-col items-center gap-6">
							<div className="flex items-center gap-4">
								<UserButton />
								<OrganizationSwitcher />
							</div>
							<nav className="flex flex-col sm:flex-row gap-4 items-center">
								<LinkWithPath
									path={'/punch-clock'}
									text={'Punch Clock'}
								/>
								<LinkWithPath
									path={'/hours-worked'}
									text={'Hours Worked'}
								/>
							</nav>
						</div>
					</div>
				</SignedIn>
			</Suspense>

			<div className="rounded-xl p-1 bg-gradient-to-r from-blue-500 to-cyan-500 w-full max-w-md">
				<div className="bg-black text-white rounded-lg p-4">
					<nav className="flex flex-col sm:flex-row gap-4 text-sm justify-center items-center">
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
		</div>
	)
}
