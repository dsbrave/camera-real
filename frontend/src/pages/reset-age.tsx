import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ResetAge() {
  const router = useRouter();

  useEffect(() => {
    // Remove a verificação de idade e redireciona para a home
    localStorage.removeItem('age-verified');
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#ff4d8d]">Resetando verificação +18...</h1>
        <p>Caso não seja redirecionado automaticamente, <a href="/" className="text-[#ff4d8d] underline">clique aqui</a>.</p>
      </div>
    </div>
  );
}
