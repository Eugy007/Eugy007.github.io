import type { Metadata, Viewport } from 'next';
import './globals.css';
import { profile } from '@/data/site';
import GridBackground from '@/components/GridBackground';
import SystemHUD from '@/components/SystemHUD';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientShell from '@/components/ClientShell';

export const metadata: Metadata = {
  title: `${profile.name} - ${profile.role}`,
  description:
    'Eugene Wambugu is a software developer building role-based web systems in ASP.NET Core and C#, from database schema to interface.',
  metadataBase: new URL(`https://${profile.siteUrl}`),
  openGraph: {
    title: `${profile.name} - ${profile.role}`,
    description: 'Software developer building role-based web systems, from database schema to interface.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#08090c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientShell>
          <GridBackground />
          <SystemHUD />
          <Navbar />
          {children}
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}
