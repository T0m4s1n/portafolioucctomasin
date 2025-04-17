import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [showContent, setShowContent] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const terminalLines = React.useMemo(() => [
    '> Initializing portfolio system...',
    '> Loading dependencies...',
    '> Fetching project data...',
    '> Optimizing UI components...',
    '> Setting up interactive elements...',
    '> Finalizing portfolio setup...',
  ], []);

  // Handle loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setLoadingComplete(true);
          return 100;
        }
        
        // Add increments between 2-5% randomly
        return Math.min(prevProgress + Math.floor(Math.random() * 4) + 2, 100);
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  // Function to go directly to portfolio
  const goToPortfolio = () => {
    if (!loadingComplete) return;
    
    // Simple fade out animation, then call the completion handler
    setShowContent(false);
    setTimeout(() => {
      if (onLoadingComplete) onLoadingComplete();
    }, 500);
  };

  // Handle key press after loading is complete
  useEffect(() => {
    if (!loadingComplete) return;

    const handleKeyDown = () => goToPortfolio();

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [loadingComplete, onLoadingComplete]);

  // Update terminal text based on progress
  useEffect(() => {
    // Show terminal messages based on progress
    const lineIndex = Math.min(
      Math.floor((progress / 100) * terminalLines.length),
      terminalLines.length - 1
    );
    
    if (progress < 100) {
      setLoadingText(terminalLines.slice(0, lineIndex + 1).join('\n'));
    } else {
      setLoadingText(terminalLines.join('\n') + '\n> Launch complete!');
    }
  }, [progress, terminalLines]);

  const getASCIIProgressBar = (value: number) => {
    const totalLength = 40; // Reduced length to fit better in the container
    const filledLength = Math.floor((value / 100) * totalLength);
    const emptyLength = totalLength - filledLength;
    
    return `[${'█'.repeat(filledLength)}${' '.repeat(emptyLength)}] ${value}%`;
  };

  // Click handler for the entire component
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
      <div className="w-full max-w-2xl px-4 relative z-10">
        <motion.div 
          className="border border-accent/50 rounded p-4 bg-background/80 backdrop-blur-sm"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-2 border-b border-accent/30 pb-2">
            <div className="text-sm opacity-80">portfolio@tomasin:~</div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          
          <pre className="whitespace-pre-wrap text-sm mb-4 text-accent/80 h-48 overflow-y-auto">
            {loadingText}
            {loadingComplete && (
              '\n\n> Portfolio ready! Press any key or click anywhere to enter...'
            )}
          </pre>
          
          <div className="font-mono text-sm mb-1 text-accent overflow-x-hidden">
            {getASCIIProgressBar(progress)}
          </div>
          
          {/* Press any key message */}
          {loadingComplete && (
            <div className="font-mono text-sm mt-3 text-accent/90 text-center animate-pulse">
              Press any key or click anywhere to continue...
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;