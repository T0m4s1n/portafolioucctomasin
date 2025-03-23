import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Inside from './Inside'; // Import the Inside component

const Window = () => {
  const [isOpen, setIsOpen] = useState(false);

  const windowVariants = {
    closed: {
      width: '280px',
      height: '170px',
      position: 'relative' as const,
      scale: 1,
      zIndex: 10,
    },
    open: {
      width: '100vw',
      height: '100vh',
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      scale: 1,
      zIndex: 1000,
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };


  const handleToggleWindow = () => {
    setIsOpen(!isOpen);
  };

  const handleBackToStart = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-center">
      {!isOpen ? (
        <motion.div
          variants={windowVariants}
          initial="closed"
          animate="closed"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-background/90 border border-accent/20 rounded-lg overflow-hidden cursor-pointer"
          onClick={handleToggleWindow}
        >

          {/* Closed window content */}
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-center">
              <p className="text-accent font-light mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>Clickeame!</p>
              <div className="text-accent/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Window footer with rotated text */}
          <div className="h-6 bg-background/10 flex items-center justify-end px-2 border-t border-accent/20 relative">
            <span className="text-xs text-accent/60 rotate-90 origin-center absolute right-0 transform translate-x-6">portfolio.exe</span>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Full overlay to prevent seeing anything behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-40"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              width: '100vw',
              height: '100vh',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              borderRadius: 0
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-background overflow-auto"
          >
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="h-full overflow-y-auto"
            >
              {/* Grid background pattern */}
              <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
              
              <Inside onClose={() => {}} />
              
              {/* Improved home button - Fixed position */}
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="fixed bottom-6 right-6 flex items-center justify-center bg-accent text-background w-12 h-12 rounded-full shadow-lg hover:bg-accent/80 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2"
                onClick={handleBackToStart}
                aria-label="Volver al inicio"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="fixed top-6 right-6 flex items-center justify-center bg-background/80 text-accent w-10 h-10 rounded-full shadow-md hover:bg-background transition-all duration-300 border border-accent/20 hover:border-accent/50"
                onClick={handleBackToStart}
                aria-label="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Window;