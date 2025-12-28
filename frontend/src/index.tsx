import React from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">🔥 DropForge AI</h1>
        <p className="text-xl text-slate-300 mb-8">The Ultimate Dropshipping Platform</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
