import { Button } from '@/components/ui/button';
import TermsContainer from '@/components/ui/containers/terms-container';
import BackHomeLink from '@/components/ui/links/back-home-link';
import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), 'PRIVACY_POLICY.md');
  const content = await fs.readFile(filePath, 'utf8');
  return content;
}

export default async function PrivacyPage() {
  const privacyContent = await getPrivacyContent();

  return (
    <div className=" flex flex-col min-h-screen bg-background text-foreground p-8 w-full items-center gap-4">
      <TermsContainer typeOfContainer={'Privacy Policy'}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {privacyContent}
        </ReactMarkdown>
      </TermsContainer>
      <BackHomeLink />
    </div >
  );
}
