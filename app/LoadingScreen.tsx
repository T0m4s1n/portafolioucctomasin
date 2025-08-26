import React, { useState, useEffect, useCallback } from 'react';
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

  const goToPortfolio = useCallback(() => {
    if (!loadingComplete) return;
    
    setShowContent(false);
    setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 500);
  }, [loadingComplete, onLoadingComplete]);

  useEffect(() => {
    if (!loadingComplete) return;

    const handleKeyDown = () => goToPortfolio();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loadingComplete, goToPortfolio]);

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
    <motion.section 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center font-mono text-accent overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: showContent ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onClick={loadingComplete ? handleClick : undefined}
      style={{ cursor: loadingComplete ? 'pointer' : 'default' }}
    >
      <section className="w-full max-w-2xl px-4 sm:px-6 relative z-10">
        <motion.section 
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
          <section className="flex items-center justify-between mb-2 border-b border-accent/30 pb-2">
            <section className="text-xs sm:text-sm opacity-80">portafolio@tomasin:~</section>
            <section className="flex gap-1 sm:gap-2">
              <section className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></section>
              <section className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></section>
              <section className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></section>
            </section>
          </section>

          <section className="text-xs sm:text-sm mb-4 text-accent/80 flex-grow overflow-y-auto px-1 w-full overflow-x-hidden">
            <section className="h-full flex flex-col">
              {terminalLines.slice(0, visibleLineIndex + 1).map((line, index) => (
                <motion.section
                  key={index}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-1"
                >
                  {line}
                </motion.section>
              ))}
              {loadingComplete && (
                <motion.section
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-2"
                >
                  {'> ¡Portafolio listo! Presiona cualquier tecla o haz clic en cualquier lugar para entrar...'}
                </motion.section>
              )}
            </section>
          </section>

          <section className="mt-auto">
            <section className="relative w-full mb-1 overflow-hidden">
              <motion.section 
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
              </motion.section>
            </section>
            
            <section className="flex justify-between items-center px-2 text-xs sm:text-sm opacity-80 overflow-hidden">
              <motion.section
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
              </motion.section>
              
              <motion.section
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
              </motion.section>
            </section>
            
            {showContinueText && (
              <motion.section 
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
              </motion.section>
            )}
          </section>
        </motion.section>
      </section>
    </motion.section>
  );
};

export default LoadingScreen;