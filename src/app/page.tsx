import { Button } from '@/components/ui/button';
import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-8 gap-8 ">
      <h1 className="text-4xl font-bold mb-8 mt-16 text-center">Welcome to Clock-Out</h1>
      <Suspense>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          <OrganizationSwitcher />
        </SignedIn>
      </Suspense>
      <Suspense>
        <SignedIn>
          <nav className="flex space-x-4">
            <Link href={'/punch-clock'}>
              <Button>
                Punch Clock
              </Button>
            </Link>
            <Link href={'/hours-worked'}>
              <Button>
                Hours Worked
              </Button>
            </Link>
          </nav>
        </SignedIn>
      </Suspense>
      <nav className="flex space-x-4">

        <Link href="/terms" className="text-blue-500 hover:underline">
          Terms of Service
        </Link>
        <Link href="/privacy" className="text-blue-500 hover:underline">
          Privacy Policy
        </Link>
      </nav>
    </div>
  );
}