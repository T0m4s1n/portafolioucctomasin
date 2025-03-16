"use client";

import React from 'react';
import { motion } from 'framer-motion';

const MoonAstronautIntro = () => {
  return (
    <section className="min-h-screen flex flex-col-reverse items-center justify-center p-8 relative z-10 mt-20">
      {/* Moon and astronaut animation on top */}
      <div className="w-full flex justify-center items-center mb-32">
        <motion.div
          className="relative w-96 h-96"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {/* Moon and Astronaut SVG */}
          <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            {/* Animated stars */}
            <motion.circle 
              cx="30" 
              cy="50" 
              r="2" 
              fill="white" 
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle 
              cx="240" 
              cy="80" 
              r="3" 
              fill="white" 
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle 
              cx="50" 
              cy="200" 
              r="2" 
              fill="white" 
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle 
              cx="260" 
              cy="160" 
              r="2.5" 
              fill="white" 
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle 
              cx="20" 
              cy="120" 
              r="1.5" 
              fill="white" 
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* Moon with improved appearance - using accent light colors */}
            <defs>
              <radialGradient id="moonGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#f8f9fa" />
                <stop offset="85%" stopColor="#e9ecef" />
                <stop offset="100%" stopColor="#dee2e6" />
              </radialGradient>
            </defs>
            
            {/* Moon with gradient */}
            <circle cx="150" cy="170" r="100" fill="url(#moonGradient)" stroke="#d0d0d0" strokeWidth="1" />
            
            {/* Moon texture and craters with shadows for more depth */}
            <circle cx="100" cy="140" r="20" fill="#e9ecef" filter="url(#shadowFilter)" />
            <circle cx="190" cy="200" r="15" fill="#e9ecef" filter="url(#shadowFilter)" />
            <circle cx="150" cy="120" r="12" fill="#e9ecef" filter="url(#shadowFilter)" />
            <circle cx="210" cy="140" r="8" fill="#e9ecef" filter="url(#shadowFilter)" />
            <circle cx="120" cy="210" r="18" fill="#e9ecef" filter="url(#shadowFilter)" />
            
            {/* Drop shadow filter for craters */}
            <defs>
              <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="1" dy="1" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Enhanced shadow beneath astronaut */}
            <ellipse 
              cx="140" 
              cy="142" 
              rx="22" 
              ry="6" 
              fill="rgba(0,0,0,0.25)" 
              filter="url(#astronautShadowFilter)" 
            />
            
            {/* Shadow filter for astronaut */}
            <defs>
              <filter id="astronautShadowFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.4" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            
            {/* Astronaut positioned on the surface planting the flag - anatomically improved */}
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              {/* Improved NASA-style spacesuit */}
              
              {/* Life Support Backpack (PLSS) */}
              <rect x="128" y="85" width="18" height="25" rx="2" fill="#e2e2e2" stroke="#bbb" strokeWidth="1" />
              
              {/* Main body/torso of spacesuit - more accurate EMU shape */}
              <path d="M125,85 C125,80 135,75 145,80 C155,75 155,90 155,95 L153,110 C153,115 147,120 140,120 C133,120 127,115 127,110 L125,95 Z" 
                   fill="white" stroke="#ccc" strokeWidth="1" />
              
              {/* Hard Upper Torso (HUT) connection */}
              <path d="M130,90 L150,90 L148,100 L132,100 Z" fill="#f0f0f0" stroke="#ddd" strokeWidth="0.5" />
              
              {/* NASA EMU Helmet with proper shape */}
              <ellipse cx="140" cy="72" rx="13" ry="14" fill="white" stroke="#ccc" strokeWidth="1" />
              
              {/* Helmet neck ring */}
              <ellipse cx="140" cy="86" rx="9" ry="2" fill="#e0e0e0" stroke="#ccc" strokeWidth="0.5" />
              
              {/* Accurate NASA visor assembly - outer shell */}
              <path d="M129,72 C129,63 151,63 151,72 L151,78 C151,84 129,84 129,78 Z" 
                    fill="white" stroke="#ddd" strokeWidth="0.5" />
              
                {/* Accurate gold sun visor (pulled down) */}
                <path d="M130,68 C130,62 150,62 150,68 L150,74 C150,80 130,80 130,74 Z" 
                  fill="#9289C8" fillOpacity="0.6" stroke="#8178B7" strokeWidth="0.5" />
              {/* Clear pressure helmet bubble underneath */}
              <ellipse cx="140" cy="72" rx="10" ry="12" fill="rgba(255,255,255,0.3)" stroke="rgba(220,220,220,0.5)" strokeWidth="0.5" />
              
              {/* Helmet light and camera assembly */}
              <rect x="137" y="59" width="6" height="3" rx="1" fill="#aaa" stroke="#999" strokeWidth="0.3" />
              <circle cx="140" cy="61" r="0.8" fill="#333" />
              
              {/* Feedport (for water/food) */}
              <rect x="150" y="72" width="2" height="3" rx="1" fill="#ddd" stroke="#ccc" strokeWidth="0.3" />
                            
              {/* Arms with proper joints and gloves */}
              {/* Left arm - holding flag pole */}
              <path d="M127,95 Q120,100 120,110 Q118,115 125,118" 
                   fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
              
              {/* Left glove */}
              <circle cx="125" cy="118" r="3" fill="white" stroke="#ddd" strokeWidth="0.5" />
              
              {/* Right arm - bent at elbow helping to plant */}
              <path d="M153,95 Q160,100 160,110 Q163,112 165,115" 
                   fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" />
              
              {/* Right glove */}
              <circle cx="165" cy="115" r="3" fill="white" stroke="#ddd" strokeWidth="0.5" />
              
              {/* Legs with proper joint articulation */}
              {/* Left leg - straight supporting weight */}
              <path d="M133,120 L133,138" 
                   fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
              
              {/* Right leg - slight bend for stability */}
              <path d="M147,120 Q153,125 148,138" 
                   fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" />
              
              {/* Boots with NASA detail */}
              <path d="M130,136 L136,136 L136,141 L130,141 Z" fill="#ddd" stroke="#bbb" strokeWidth="0.5" />
              <path d="M145,136 L151,136 L151,141 L145,141 Z" fill="#ddd" stroke="#bbb" strokeWidth="0.5" />
              
              {/* Suit details - connectors and reinforcements */}
              <circle cx="140" cy="105" r="2" fill="#ddd" stroke="#bbb" strokeWidth="0.5" />
              <line x1="140" y1="102" x2="140" y2="108" stroke="#bbb" strokeWidth="0.5" />
            </motion.g>
            
            {/* Flag planting scene */}
            {/* Flag pole with proper detail */}
            <line x1="165" y1="140" x2="165" y2="90" stroke="#aaa" strokeWidth="1.5" />
            
            {/* Flag base showing planting action */}
            <motion.path 
              d="M165,137 L168,143 L162,143 Z" 
              fill="#999"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* Shadow for flag pole */}
            <line x1="165" y1="140" x2="175" y2="143" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            
            {/* Flag with proper fabric dynamics - UPDATED WITH NEW COLOR */}
            <motion.path 
              d="M165,90 Q180,85 195,90 Q200,95 205,100 L205,110 Q200,115 195,120 Q180,125 165,120 Z" 
              fill="#9289C8"
              stroke="#8178B7"
              strokeWidth="1"
              animate={{ 
                skewX: [0, 2, 0], 
                d: [
                  "M165,90 Q180,85 195,90 Q200,95 205,100 L205,110 Q200,115 195,120 Q180,125 165,120 Z",
                  "M165,90 Q180,87 195,92 Q200,94 205,100 L205,110 Q200,116 195,118 Q180,123 165,120 Z",
                  "M165,90 Q180,85 195,90 Q200,95 205,100 L205,110 Q200,115 195,120 Q180,125 165,120 Z"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* Flag details - large T in the middle */}
            <path 
              d="M178,98 L192,98 L192,100 L187,100 L187,112 L183,112 L183,100 L178,100 Z" 
              fill="white" 
              stroke="white"
              strokeWidth="0.5"
            />
            
            {/* Small highlights on flag for texture */}
            <path d="M170,95 L175,95" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
            <path d="M180,115 L190,115" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
            <path d="M195,100 L200,100" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" />
            
            {/* Small impression in moon surface from planting */}
            <path d="M160,140 Q165,143 170,140" stroke="#d0d0d0" strokeWidth="0.5" fill="none" />
          </svg>
        </motion.div>
      </div>
      {/* Text section below animation with increased spacing */}
      <div className="w-full text-center mb-12">
        <motion.h2 
          className="text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0,
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          style={{ 
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
          }}
        >
          ¡Hola! Soy Tomasin
        </motion.h2>
        
        <motion.div 
          className="h-1.5 w-32 bg-accent-light rounded-full shadow-md mb-8 mx-auto"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "10rem", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />
        
        <motion.p 
          className="text-xl text-accent mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
        >
          Estudiante de ingeneria de Software apasionado por crear nuevas propuestas y soluciones tecnológicas.
        </motion.p>
        
        <motion.p 
          className="text-xl text-accent mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
        >
          Con enfoque en tecnologías modernas de frontend como Next.js, Vue, React y backend como SpringBoot y Django.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.9,
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
        >
          <button className="bg-accent-dark hover:bg-accent-dark text-white font-medium py-3 px-8 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg">
            Explorar Proyectos
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MoonAstronautIntro;