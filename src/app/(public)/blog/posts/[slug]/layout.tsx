import { LandingHeader } from '@/components/ui/landing/header';

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingHeader />
      {children}
    </>
  );
}
