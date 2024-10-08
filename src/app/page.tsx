'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    window.location.assign('/login');
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
