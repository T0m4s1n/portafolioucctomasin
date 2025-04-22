import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [visibleLineIndex, setVisibleLineIndex] = useState(0);
  const [showContinueText, setShowContinueText] = useState(false);

  const terminalLines = React.useMemo(() => [
    '> Inicializando sistema de portafolio...',
    '> Obteniendo datos de proyectos...',
    '> Optimizando componentes de UI...',
    '> Finalizando configuración de portafolio...',
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoadingComplete(true);
          setTimeout(() => setShowContinueText(true), 300);
          return 100;
        }

        const increment = prevProgress > 90 ? 1 : Math.floor(Math.random() * 4) + 2;
        const newProgress = Math.min(prevProgress + increment, 100);
        
        if ([25, 50, 75, 90].includes(Math.floor(newProgress / 5) * 5)) {
          setPulseEffect(true);
          setTimeout(() => setPulseEffect(false), 300);
        }
        
        return newProgress;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lineIndex = Math.min(
      Math.floor((progress / 100) * terminalLines.length),
      terminalLines.length - 1
    );
    
    if (lineIndex > visibleLineIndex) {
      setVisibleLineIndex(lineIndex);
    }
  }, [progress, terminalLines, visibleLineIndex]);

  const goToPortfolio = () => {
    if (!loadingComplete) return;
    
    setShowContent(false);
    setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 500);
  };

  useEffect(() => {
    if (!loadingComplete) return;

    const handleKeyDown = () => goToPortfolio();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loadingComplete, onLoadingComplete]);

  const getASCIIProgressBar = (value: number) => {
    const totalLength = 30;
    const filledLength = Math.floor((value / 100) * totalLength);
    const emptyLength = totalLength - filledLength;
    
    return `[${
      '█'.repeat(filledLength)}${
      '░'.repeat(emptyLength)
    }] ${value}%`;
  };

  const handleClick = () => goToPortfolio();

  if (!showContent) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center font-mono text-accent overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: showContent ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onClick={loadingComplete ? handleClick : undefined}
      style={{ cursor: loadingComplete ? 'pointer' : 'default' }}
    >
      <div className="w-full max-w-2xl px-4 sm:px-6 relative z-10">
        {/* Fixed size container */}
        <motion.div 
          className="border border-accent/50 rounded p-3 sm:p-4 bg-background/80 backdrop-blur-sm"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            height: '400px',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div className="flex items-center justify-between mb-2 border-b border-accent/30 pb-2">
            <div className="text-xs sm:text-sm opacity-80">portafolio@tomasin:~</div>
            <div className="flex gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="text-xs sm:text-sm mb-4 text-accent/80 flex-grow overflow-y-auto px-1 w-full overflow-x-hidden">
            <div className="h-full flex flex-col">
              {terminalLines.slice(0, visibleLineIndex + 1).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-1"
                >
                  {line}
                </motion.div>
              ))}
              {loadingComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-2"
                >
                  {'> ¡Portafolio listo! Presiona cualquier tecla o haz clic en cualquier lugar para entrar...'}
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-auto">
            <div className="relative w-full mb-1 overflow-hidden">
              <motion.div 
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: pulseEffect ? [0.7, 1, 0.7] : 0.9,
                  scale: pulseEffect ? [1, 1.02, 1] : 1,
                }}
                transition={{ 
                  duration: 0.3
                }}
                className="font-mono text-sm sm:text-base text-center my-1 tracking-wider text-accent whitespace-pre px-1 overflow-x-hidden"
              >
                <motion.span
                  className="inline-block"
                  animate={{ color: loadingComplete ? ['var(--accent-color)', 'var(--primary-color)', 'var(--accent-color)'] : 'var(--accent-color)' }}
                  transition={{ duration: 2, repeat: loadingComplete ? Infinity : 0 }}
                >
                  {getASCIIProgressBar(progress)}
                </motion.span>
              </motion.div>
            </div>
            
            <div className="flex justify-between items-center px-2 text-xs sm:text-sm opacity-80 overflow-hidden">
              <motion.div
                animate={{ 
                  rotateY: [0, 180, 360],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {progress < 100 ? '◁' : '◀'}
              </motion.div>
              
              <motion.div
                animate={{ 
                  rotateY: [0, 180, 360],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
                }}
              >
                {progress < 100 ? '▷' : '▶'}
              </motion.div>
            </div>
            
            {showContinueText && (
              <motion.div 
                className="font-mono text-xs sm:text-sm mt-2 sm:mt-3 text-accent/90 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5 }
                }}
                whileInView={{ 
                  opacity: [0.7, 1, 0.7],
                  transition: { duration: 1.5, repeat: Infinity, delay: 0.5 }
                }}
              >
                Presiona cualquier tecla o haz clic para continuar...
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;