import TermsContainer from '@/components/ui/containers/terms-container';
import fs from 'fs/promises';
import path from 'path';

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), 'PRIVACY_POLICY.md');
  const content = await fs.readFile(filePath, 'utf8');
  return content;
}

export default async function PrivacyPage() {
  const privacyContent = await getPrivacyContent();

  return (
    <div className="min-h-screen bg-background text-foreground p-8 w-full">
      <TermsContainer  typeOfContainer={'Privacy Policy'}> 
          {privacyContent}
      </TermsContainer>
    </div>
  );
}
