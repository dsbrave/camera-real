import { useState, useEffect } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  showLensFlare?: boolean;
  isStatic?: boolean;
}

export default function AnimatedBackground({ 
  className = '', 
  intensity = 'subtle',
  showLensFlare = true,
  isStatic = false
}: AnimatedBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (isStatic) return;
    
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        });
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [isStatic]);

  const intensitySettings = {
    subtle: {
      baseOpacity: 0.04,
      waveOpacity: 0.015,
      flareOpacity: 0.08,
      overlayOpacity: 0.25,
      blur: 150,
      rotation: 0.008,
      scale: 0.00005
    },
    medium: {
      baseOpacity: 0.08,
      waveOpacity: 0.025,
      flareOpacity: 0.12,
      overlayOpacity: 0.2,
      blur: 130,
      rotation: 0.012,
      scale: 0.0001
    },
    strong: {
      baseOpacity: 0.15,
      waveOpacity: 0.04,
      flareOpacity: 0.18,
      overlayOpacity: 0.15,
      blur: 110,
      rotation: 0.018,
      scale: 0.00015
    }
  };

  const settings = intensitySettings[intensity];
  const fixedPosition = { x: 50, y: 50 };
  const currentPosition = isStatic ? fixedPosition : mousePosition;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div 
        className={`absolute inset-0 ${isStatic ? '' : 'transition-all duration-[8000ms] ease-out'}`}
        style={{
          opacity: settings.baseOpacity,
          background: `radial-gradient(circle at ${currentPosition.x}% ${currentPosition.y}%, 
            #F25790 0%, 
            #8B5CF6 40%, 
            #3B82F6 70%, 
            #1E1B4B 85%, 
            #000000 100%)`
        }}
      />
      
      {!isStatic && (
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 animate-pulse" 
            style={{ 
              opacity: settings.waveOpacity,
              animationDuration: '12s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <div 
              className="absolute w-full h-full transition-transform duration-[10000ms] ease-out"
              style={{
                background: `conic-gradient(from ${currentPosition.x * 0.15}deg at 50% 50%, 
                  transparent 0deg, 
                  #F25790 90deg, 
                  transparent 180deg, 
                  #8B5CF6 270deg, 
                  transparent 360deg)`,
                filter: `blur(${settings.blur}px)`,
                transform: `rotate(${currentPosition.x * settings.rotation}deg) scale(${1 + currentPosition.y * settings.scale})`
              }}
            />
          </div>
        </div>
      )}

      {!isStatic && (
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 animate-pulse" 
            style={{ 
              opacity: settings.waveOpacity * 0.5,
              animationDelay: '6s',
              animationDuration: '18s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <div 
              className="absolute w-full h-full transition-transform duration-[15000ms] ease-out"
              style={{
                background: `conic-gradient(from ${-currentPosition.y * 0.1}deg at 30% 70%, 
                  transparent 0deg, 
                  #8B5CF6 60deg, 
                  transparent 120deg, 
                  #F25790 240deg, 
                  transparent 300deg)`,
                filter: `blur(${settings.blur + 30}px)`,
                transform: `rotate(${-currentPosition.y * settings.rotation * 0.3}deg) scale(${1 + currentPosition.x * settings.scale * 0.3})`
              }}
            />
          </div>
        </div>
      )}

      {!isStatic && (
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 animate-pulse" 
            style={{ 
              opacity: settings.waveOpacity * 0.3,
              animationDelay: '3s',
              animationDuration: '25s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <div 
              className="absolute w-full h-full transition-transform duration-[20000ms] ease-out"
              style={{
                background: `radial-gradient(ellipse at ${currentPosition.x * 0.8}% ${currentPosition.y * 0.8}%, 
                  rgba(242, 87, 144, 0.1) 0%, 
                  rgba(139, 92, 246, 0.05) 50%, 
                  transparent 80%)`,
                filter: `blur(${settings.blur + 50}px)`,
                transform: `scale(${1 + currentPosition.x * settings.scale * 0.2})`
              }}
            />
          </div>
        </div>
      )}
      
      {showLensFlare && !isStatic && (
        <div 
          className="absolute transition-all duration-[1000ms] ease-out pointer-events-none"
          style={{
            left: `${currentPosition.x}%`,
            top: `${currentPosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div 
            className="absolute w-4 h-4 rounded-full"
            style={{
              opacity: settings.flareOpacity,
              background: 'radial-gradient(circle, rgba(242, 87, 144, 0.2) 0%, rgba(242, 87, 144, 0.05) 40%, transparent 70%)',
              filter: 'blur(2px)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          <div 
            className="absolute w-8 h-8 rounded-full"
            style={{
              opacity: settings.flareOpacity * 0.4,
              background: 'radial-gradient(circle, transparent 50%, rgba(139, 92, 246, 0.08) 60%, transparent 70%)',
              filter: 'blur(1px)',
              transform: 'translate(-50%, -50%)'
            }}
          />
          
          <div 
            className="absolute w-0.5 h-2"
            style={{
              opacity: settings.flareOpacity * 0.6,
              background: 'linear-gradient(to bottom, transparent, rgba(242, 87, 144, 0.2), transparent)',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(0.3px)'
            }}
          />
          <div 
            className="absolute w-2 h-0.5"
            style={{
              opacity: settings.flareOpacity * 0.6,
              background: 'linear-gradient(to right, transparent, rgba(242, 87, 144, 0.2), transparent)',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(0.3px)'
            }}
          />
        </div>
      )}
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          backgroundColor: `rgba(0, 0, 0, ${settings.overlayOpacity})` 
        }}
      />
    </div>
  );
} 