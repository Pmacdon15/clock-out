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
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <pre className="whitespace-pre-wrap font-sans">
          {privacyContent}
        </pre>
      </div>
    </div>
  );
}
