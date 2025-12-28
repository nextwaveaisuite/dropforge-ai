import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  React.useEffect(() => {
    // Redirect to sales page automatically
    router.push('/sales');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">🔥 DropForge AI</h1>
        <p className="text-xl text-slate-300 mb-8">Loading...</p>
      </div>
    </div>
  );
}
