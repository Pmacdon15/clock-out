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
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <pre className="whitespace-pre-wrap font-sans">
          {termsContent}
        </pre>
      </div>
    </div>
  );
}
