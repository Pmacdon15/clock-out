import fs from 'node:fs/promises'
import path from 'node:path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import TermsContainer from '@/components/ui/containers/terms-container'
import BackHomeLink from '@/components/ui/links/back-home-link'

async function getPrivacyContent() {
	const filePath = path.join(process.cwd(), 'PRIVACY_POLICY.md')
	const content = await fs.readFile(filePath, 'utf8')
	return content
}

export default async function PrivacyPage() {
	'use cache'
	const privacyContent = await getPrivacyContent()

	return (
		<div className="flex min-h-screen w-full flex-col items-center gap-4 p-2 pt-4 text-foreground md:pt-8">
			<TermsContainer typeOfContainer={'Privacy Policy'}>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{privacyContent}
				</ReactMarkdown>
			</TermsContainer>
			<BackHomeLink />
		</div>
	)
}
