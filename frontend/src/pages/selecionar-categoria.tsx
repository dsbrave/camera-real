import Link from 'next/link';
import { useState } from 'react';
import Layout from '@/components/Layout';

export default function SelecionarCategoria() {
  const [selectedCategory, setSelectedCategory] = useState<string>('mulher');

  const categories = [
    { id: 'mulher', label: 'Mulher' },
    { id: 'homem', label: 'Homem' },
    { id: 'trans_girl', label: 'Trans girl' },
    { id: 'trans_boy', label: 'Trans boy' },
    { id: 'casal', label: 'Casal' }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-[#9968c7] flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Link href="/">
          <h1 className="text-white text-3xl font-bold">
            CAMERA<br />REAL
            <span className="inline-block ml-1">👑</span>
          </h1>
        </Link>
      </div>
      
      <div className="text-center mb-8 px-4 max-w-lg">
        <h1 className="text-3xl font-bold text-white mb-2">Com quem você quer conversar?</h1>
        <p className="text-white opacity-90">
          Você pode selecionar mais de uma opção para iniciar a vídeo chamada.
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`px-8 py-3 rounded-full text-lg font-medium transition-all
              ${selectedCategory === category.id 
                ? 'bg-white text-[#9968c7]' 
                : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'}`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      <button 
        className="bg-[#F25790] text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 transition-all mb-8"
      >
        Iniciar chamada
      </button>
      
      <Link 
        href="/"
        className="text-white bg-white bg-opacity-20 px-6 py-2 rounded-full text-sm hover:bg-opacity-30 transition-all"
      >
        Voltar para home
      </Link>
    </div>
  );
}
