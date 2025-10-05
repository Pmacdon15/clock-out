import TermsContainer from '@/components/ui/containers/terms-container';
import fs from 'fs/promises';
import path from 'path';

async function getTermsContent() {
  const filePath = path.join(process.cwd(), 'TERMS_OF_SERVICE.md');
  const content = await fs.readFile(filePath, 'utf8');
  return content;
}

export default async function TermsPage() {
  const termsContent = await getTermsContent();

  return (
    <div className="min-h-screen bg-background text-foreground p-8 w-full">
      <TermsContainer typeOfContainer={'Terms of Service'}>
        {termsContent}
      </TermsContainer>
    </div>
  );
}
