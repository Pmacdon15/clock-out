import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { Suspense } from 'react'
import PageContainer from '@/components/ui/containers/page-container'
import Footer from '@/components/ui/footer'
import Header from '@/components/ui/headers/layout-header'
import { Providers } from '../components/providers'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Clock Out',
	description: 'Track your Working hours',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Providers>
						<PageContainer>
							<Suspense>
								<Header />
							</Suspense>
							<main className="flex w-full flex-col items-center gap-8">
								{children}
							</main>
							<Footer />
							<Analytics />
						</PageContainer>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	)
}
