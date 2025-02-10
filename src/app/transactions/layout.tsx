import React from 'react';
import type { Metadata } from 'next';

import '../globals.css';
import Header from '../../components/layouts/Header';

export const metadata: Metadata = {
  title: 'FormMatic',
  description: 'Generated by create next app',
};

export default function TransactionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
