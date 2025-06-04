import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function Layout({ 
  children, 
  title, 
  description = "Camera Real - A melhor plataforma de videochat",
  showHeader = true,
  showFooter = true
}: LayoutProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsNavigating(true);
    };

    const handleRouteChangeComplete = () => {
      setIsNavigating(false);
    };

    const handleRouteChangeError = () => {
      setIsNavigating(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-black text-white relative">
        {/* Loading overlay durante navegação */}
        {isNavigating && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F25790] mx-auto mb-2"></div>
              <p className="text-sm">Carregando...</p>
            </div>
          </div>
        )}

        {showHeader && <Header />}
        
        <main className={`flex-grow transition-opacity duration-300 ${isNavigating ? 'opacity-50' : 'opacity-100'}`}>
          {children}
        </main>
        
        {showFooter && <Footer />}
      </div>
    </>
  );
}
