import fs from 'node:fs/promises'
import path from 'node:path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import TermsContainer from '@/components/ui/containers/terms-container'
import BackHomeLink from '@/components/ui/links/back-home-link'

async function getTermsContent() {
	const filePath = path.join(process.cwd(), 'TERMS_OF_SERVICE.md')
	const content = await fs.readFile(filePath, 'utf8')
	return content
}

export default async function TermsPage() {
	'use cache'
	const termsContent = await getTermsContent()

	return (
		<div className="flex min-h-screen w-full flex-col items-center gap-4 bg-background p-2 pt-4 text-foreground md:pt-8">
			<TermsContainer typeOfContainer={'Terms of Service'}>
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{termsContent}
				</ReactMarkdown>
			</TermsContainer>
			<BackHomeLink />
		</div>
	)
}
