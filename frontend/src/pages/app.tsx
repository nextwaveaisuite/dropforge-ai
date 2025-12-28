import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps ) {
  const router = useRouter();

  useEffect(() => {
    // Redirect root to dashboard
    if (router.pathname === '/') {
      router.push('/dashboard');
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default App;
