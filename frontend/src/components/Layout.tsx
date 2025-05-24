import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

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
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-black text-white">
        {showHeader && <Header />}
        
        <main className="flex-grow">
          {children}
        </main>
        
        {showFooter && <Footer />}
      </div>
    </>
  );
}
