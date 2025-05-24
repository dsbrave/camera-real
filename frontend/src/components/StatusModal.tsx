import Image from 'next/image';
import Link from 'next/link';

interface StatusModalProps {
  title: string;
  message: string;
  buttonText: string;
  buttonAction?: () => void;
  buttonHref?: string;
  type?: 'warning' | 'error' | 'success' | 'info';
}

export default function StatusModal({ 
  title, 
  message, 
  buttonText, 
  buttonAction, 
  buttonHref,
  type = 'warning' 
}: StatusModalProps) {
  const getIconColor = () => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      case 'warning': return 'text-[#F25790]';
      default: return 'text-[#F25790]';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: "url('/images/high-resolution_studio_photo_of_a_confident_brazilian-inspired_model_wearing_an_elegant_black_lace__i7mo7j07sng27o0fv86l_2.png')"
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      <div className="relative z-10">
        {/* Logo */}
        <div className="absolute top-6 left-6">
          <Link href="/">
            <Image 
              src="/icons/logo.svg" 
              alt="Camera Real" 
              width={120} 
              height={40}
              className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>
        
        {/* Central Modal */}
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center border border-gray-700">
            {/* Icon */}
            <div className={`w-16 h-16 rounded-full border-2 border-current ${getIconColor()} flex items-center justify-center mx-auto mb-6`}>
              {getIcon()}
            </div>
            
            {/* Message */}
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              {message}
            </p>
            
            {/* Button */}
            {buttonHref ? (
              <Link
                href={buttonHref}
                className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-3 px-6 rounded-full transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 block"
              >
                {buttonText}
              </Link>
            ) : (
              <button
                onClick={buttonAction}
                className="w-full bg-[#F25790] hover:bg-[#d93d75] text-white py-3 px-6 rounded-full transition-all duration-300 font-medium text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                {buttonText}
              </button>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap justify-between items-center text-sm text-gray-400">
            <div className="flex flex-wrap gap-4">
              <span>© 2024 Camera Real</span>
              <Link href="/politica-privacidade" className="hover:text-[#F25790] transition-colors">
                Política de privacidade
              </Link>
              <Link href="/sobre" className="hover:text-[#F25790] transition-colors">
                Fale conosco
              </Link>
              <Link href="/termos" className="hover:text-[#F25790] transition-colors">
                Termos e condições
              </Link>
            </div>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <Link href="/regras" className="text-[#F25790] hover:underline">
                Regras e ajuda
              </Link>
              <Link href="/assistencia" className="text-[#F25790] hover:underline">
                Assistência
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 