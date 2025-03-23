import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ReactNode } from 'react';

const PortfolioWindow = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const windowVariants = {
    closed: {
      width: '300px',
      height: '200px',
      borderRadius: '12px',
      position: 'fixed' as const,
      bottom: '32px',
      right: '32px',
      zIndex: 1000,
    },
    open: {
      width: '100vw',
      height: '100vh',
      borderRadius: '0px',
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const handleToggleWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      variants={windowVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-deluge-100 dark:bg-deluge-975 shadow-2xl overflow-hidden cursor-pointer border border-accent/30`}
      onClick={!isOpen ? handleToggleWindow : undefined}
    >
      {/* Window header */}
      <div className="h-8 bg-accent/10 flex items-center justify-between px-4 border-b border-accent/20">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-accent opacity-80">portfolio.exe</span>
        </div>
        
        {isOpen && (
          <button 
            onClick={handleToggleWindow}
            className="text-accent hover:text-accent-dark transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* Window content */}
      <AnimatePresence>
        {!isOpen ? (
          <div className="p-4 flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <p className="text-accent font-light mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>Click to open</p>
              <div className="opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="h-full overflow-y-auto"
          >
            {/* Grid background pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
            
            {/* Big watermark */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <h1 className="text-[20vw] font-bold text-stroke text-transparent opacity-5 whitespace-nowrap tracking-tighter"
                style={{ 
                WebkitTextStroke: '2px var(--accent)'
                }}>
                PORTFOLIO
              </h1>
            </div>
            
            {/* Actual content */}
            <div className="relative z-10 p-8">
              <motion.div variants={itemVariants} className="flex items-center mb-6">
                <span className="text-sm text-accent opacity-80 mr-2">02</span>
                <span className="text-sm text-accent mr-2">{'//'}</span>
                <span className="text-sm text-accent font-light">portfolio</span>
              </motion.div>
              
              <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-light mb-8">
                Proyectos <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>destacados</span>
              </motion.h2>
              
              {/* Portfolio content goes here */}
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioWindow;