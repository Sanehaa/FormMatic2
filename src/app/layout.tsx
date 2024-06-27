import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppWrapper } from '@/context';
import { AuthContextProvider } from '../context/AuthContext';
import { ScenarioProvider } from '../context/ScenarioContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ScenarioProvider>
            <AppWrapper>
              <div>
                <main>{children}</main>
              </div>
            </AppWrapper>
          </ScenarioProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
