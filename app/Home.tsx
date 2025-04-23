import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const PortfolioHomeSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ref for the Three.js container
  const threeContainerRef = useRef<HTMLDivElement>(null);
  
  // Three.js setup and animation
  useEffect(() => {
    if (!threeContainerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    // Aumentando el tamaño del renderizador para la T 3D
    renderer.setSize(350, 350);
    renderer.setClearColor(0x000000, 0);
    
    // Clear any existing canvas
    if (threeContainerRef.current.firstChild) {
      threeContainerRef.current.removeChild(threeContainerRef.current.firstChild);
    }
    
    threeContainerRef.current.appendChild(renderer.domElement);
    
    // Extract accent color from CSS variable
    const getAccentColor = () => {
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim();
      return accentColor.startsWith('#') ? accentColor : '--accent';
    };
    
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(getAccentColor()),
      metalness: 0.3,
      roughness: 0.4,
      emissive: new THREE.Color(getAccentColor()),
      emissiveIntensity: 0.2,
    });
    
    const createTShape = () => {
      const shape = new THREE.Shape();
      
      shape.moveTo(-0.7, 1);       // Top-left of the T
      shape.lineTo(0.7, 1);        // Top-right of the T
      shape.lineTo(0.7, 0.7);      // Right edge of top bar
      shape.lineTo(0.2, 0.7);      // Inner right corner
      shape.lineTo(0.2, -1);       // Bottom right
      shape.lineTo(-0.2, -1);      // Bottom left
      shape.lineTo(-0.2, 0.7);     // Inner left corner
      shape.lineTo(-0.7, 0.7);     // Left edge of top bar
      shape.lineTo(-0.7, 1);       // Back to start

      const extrudeSettings = {
        steps: 1,
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 5
      };
      
      return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    };
    
    // Create mesh
    const tGeometry = createTShape();
    const tMesh = new THREE.Mesh(tGeometry, material);
    
    // Add to scene
    scene.add(tMesh);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 1);
    scene.add(frontLight);
    
    const backLight = new THREE.DirectionalLight(new THREE.Color(getAccentColor()), 0.7);
    backLight.position.set(0, 0, -1);
    scene.add(backLight);
    
    // Position camera
    camera.position.z = 3;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate on Y axis (to the right)
      tMesh.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      renderer.setSize(350, 350);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeContainerRef.current) {
        threeContainerRef.current.removeChild(renderer.domElement);
      }
      tGeometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="home" className="min-h-screen md:min-h-screen pt-20 md:pt-0 relative flex flex-col justify-center bg-deluge-100 dark:bg-deluge-975">
        <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <h1 className="text-[20vw] font-bold text-stroke text-transparent opacity-5 whitespace-nowrap tracking-tighter"
            style={{ 
            WebkitTextStroke: '2px var(--accent)'
            }}>
            TOMASIN
          </h1>
        </div>
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl flex-1"
          >
            <motion.div variants={itemVariants} className="flex items-center mb-6">
              <span className="text-sm text-accent opacity-80 mr-2">01</span>
              <span className="text-sm text-accent mr-2">{'//'}</span>
              <span className="text-sm text-accent font-light">introduccion</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-3xl md:text-6xl lg:text-7xl font-light mb-6">
            Me llamo <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>Tomasin</span><br />
            <span> y soy un </span> <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>software developer</span>
          </motion.h1>
                      
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Desarrollador frontend y diseñador especializado en crear aplicaciones web elegantes, funcionales y accesibles con un enfoque en movimiento y experiencia de usuario.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contactarme
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('work')}
                className="px-6 py-3 border border-accent/30 text-accent rounded-lg hover:bg-accent/10 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver proyectos
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex-shrink-0 flex flex-col items-center justify-center"
          >
            <div 
              ref={threeContainerRef} 
              className="w-100 h-70 flex items-center justify-center"
            />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-8 md:bottom-16 md:left-16">
        <motion.div 
          className="flex gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {['github', 'twitter', 'linkedin'].map((platform) => (
            <motion.a
              key={platform}
              href={`https://github.com/T0m4s1n`}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {platform === 'github' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              )}
              {platform === 'twitter' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              )}
              {platform === 'linkedin' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-xs text-muted-foreground mb-2 rotate-90 origin-bottom-right">scrollea</span>
        <motion.div 
          className="w-px h-16 bg-accent/30"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+HU:wght@100..400&display=swap');
      `}</style>
    </section>
  );
};

export default PortfolioHomeSection;