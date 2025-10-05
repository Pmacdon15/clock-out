import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { Suspense } from 'react';
import LinkWithPath from '../components/ui/links/link';
import BlueTextLink from '@/components/ui/links/blue-text-link';

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
          <nav className="flex space-x-4">
            <LinkWithPath path={'/punch-clock'} text={'Punch Clock'} />
            <LinkWithPath path={'/hours-worked'} text={'Hours Worked'} />
          </nav>
        </SignedIn>
      </Suspense>
      <nav className="flex space-x-4">
        <BlueTextLink path={'/terms'} text={'Terms of Service'} />
        <BlueTextLink path={'/privacy'} text={' Privacy Policy'} />
      </nav>
    </div>
  );
}