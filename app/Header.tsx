"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Code, User, Briefcase, Mail, Menu, X } from 'lucide-react';

const PortfolioNavHeader = () => {
    const [activeSection, setActiveSection] = useState('inicio');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } 
            else {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const sections = [
        { id: 'inicio', name: 'Inicio', icon: <Hammer size={20} /> },
        { id: 'sobremi', name: 'Sobre Mí', icon: <User size={20} /> },
        { id: 'proyectos', name: 'Proyectos', icon: <Briefcase size={20} /> },
        { id: 'skills', name: 'Habilidades', icon: <Code size={20} /> },
        { id: 'contacto', name: 'Contacto', icon: <Mail size={20} /> }
    ];

    const navVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { 
            opacity: 1,
            y: 0,
            transition: { 
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        }
    };

    const mobileMenuVariants = {
        closed: { opacity: 0, scale: 0.95, x: 20 },
        open: { 
            opacity: 1, 
            scale: 1, 
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    const handleSectionChange = (sectionId: string) => {
        setActiveSection(sectionId);
        setIsMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isVisible ? 'translate-y-0' : '-translate-y-full'
            } ${
                isMenuOpen ? 'bg-background/95 backdrop-blur-md' : 'bg-transparent'
            } md:bg-transparent py-5`}
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <motion.div 
                    className="flex items-center space-x-3 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Holographic 3D Icon */}
                    <div className="relative w-10 h-10 flex items-center justify-center">
                        {/* Base glossy layer */}
                        <div className="absolute inset-0 flex items-center justify-center" 
                             style={{
                                 filter: 'drop-shadow(0 0 12px rgba(120, 255, 215, 0.5))'
                             }}>
                            <Hammer 
                                size={32} 
                                className="text-white" 
                                style={{
                                    filter: 'brightness(1.5)',
                                    stroke: 'url(#holographicGradientIcon)'
                                }}
                            />
                        </div>
                        
                        {/* Front reflection layer */}
                        <div className="absolute inset-0 flex items-center justify-center"
                             style={{
                                 transform: 'scale(0.9) translateX(2px) translateY(-1px)',
                                 opacity: 0.7,
                                 filter: 'blur(1px)'
                             }}>
                            <Hammer 
                                size={32} 
                                className="text-white"
                                style={{
                                    filter: 'brightness(2)',
                                }}
                            />
                        </div>
                        
                        {/* Color shift layer 1 */}
                        <div className="absolute inset-0 flex items-center justify-center"
                             style={{
                                 transform: 'scale(1.03) translateX(-3px) translateY(1px)',
                                 opacity: 0.4,
                                 filter: 'blur(2px)'
                             }}>
                            <Hammer 
                                size={32} 
                                className="text-cyan-300"
                            />
                        </div>
                        
                        {/* Color shift layer 2 */}
                        <div className="absolute inset-0 flex items-center justify-center"
                             style={{
                                 transform: 'scale(1.05) translateX(3px) translateY(1px)',
                                 opacity: 0.4,
                                 filter: 'blur(2px)'
                             }}>
                            <Hammer 
                                size={32} 
                                className="text-fuchsia-300"
                            />
                        </div>
                    </div>
                    
                    {/* Holographic 3D Text */}
                    <div className="relative font-bold text-3xl" style={{ perspective: '1000px' }}>
                        {/* Main text with holographic effect */}
                        <div className="relative">
                            <span className="block text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: 'linear-gradient(135deg, #a0ffef 10%, #ffffff 25%, #ffc1f9 50%, #a0ffef 75%, #ffffff 90%)',
                                    textShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
                                    WebkitBackgroundClip: 'text',
                                    letterSpacing: '0.05em',
                                    fontWeight: '900',
                                    filter: 'drop-shadow(0 0 12px rgba(160, 255, 239, 0.5))',
                                    transform: 'translateZ(20px) rotateX(10deg)',
                                }}>
                                Tomasin
                            </span>
                            
                            {/* Deep back layer */}
                            <span className="absolute top-0 left-0 block text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: 'linear-gradient(135deg, #00a088 10%, #a0a0a0 40%, #c040c0 60%, #00a088 90%)',
                                    WebkitBackgroundClip: 'text',
                                    letterSpacing: '0.05em',
                                    fontWeight: '900',
                                    opacity: 0.4,
                                    transform: 'scale(1.05) translateZ(-30px) translateY(3px)',
                                    filter: 'blur(4px)',
                                }}>
                                Tomasin
                            </span>
                            
                            {/* Cyan offset */}
                            <span className="absolute top-0 left-0 text-cyan-300"
                                style={{
                                    letterSpacing: '0.05em',
                                    fontWeight: '900',
                                    opacity: 0.4,
                                    transform: 'translateX(-3px) translateY(1px)',
                                    filter: 'blur(2px)',
                                }}>
                                Tomasin
                            </span>
                            
                            {/* Magenta offset */}
                            <span className="absolute top-0 left-0 text-fuchsia-300"
                                style={{
                                    letterSpacing: '0.05em',
                                    fontWeight: '900',
                                    opacity: 0.4,
                                    transform: 'translateX(3px) translateY(1px)',
                                    filter: 'blur(2px)',
                                }}>
                                Tomasin
                            </span>
                            
                            {/* Light reflection */}
                            <span className="absolute top-0 left-0 text-white"
                                style={{
                                    letterSpacing: '0.05em',
                                    fontWeight: '900',
                                    opacity: 0.5,
                                    transform: 'translateX(-1px) translateY(-2px) skewX(-10deg)',
                                    filter: 'blur(1px) brightness(2)',
                                }}>
                                Tomasin
                            </span>
                            
                            {/* Edge highlight */}
                            <span className="absolute top-0 left-0 text-white"
                                style={{
                                    letterSpacing: '0.05em',
                                    fontWeight: '900',
                                    opacity: 0.3,
                                    transform: 'scale(1.03)',
                                    filter: 'blur(8px)',
                                }}>
                                Tomasin
                            </span>
                        </div>
                    </div>
                </motion.div>
                
                {/* SVG gradient definitions */}
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <linearGradient id="holographicGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a0ffef" />
                            <stop offset="25%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#ffc1f9" />
                            <stop offset="75%" stopColor="#a0ffef" />
                            <stop offset="100%" stopColor="#ffffff" />
                        </linearGradient>
                    </defs>
                </svg>
                
                <nav className="hidden md:flex items-center space-x-6">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            onClick={() => handleSectionChange(section.id)}
                            className={`flex items-center space-x-1 font-medium text-sm relative px-3 py-2 rounded-full ${
                                activeSection === section.id 
                                    ? 'text-accent' 
                                    : 'text-accent-light hover:text-accent-dark'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>{section.icon}</span>
                            <span>{section.name}</span>
                            {activeSection === section.id && (
                                <motion.span 
                                    className="h-1 w-full bg-accent absolute bottom-0 left-0 rounded-full"
                                    layoutId="activeSection"
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </nav>
                <motion.button 
                    className="md:hidden text-accent-light p-2 rounded-full bg-background/30 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>
            <motion.nav 
                className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg ${
                    isMenuOpen ? 'block' : 'hidden'
                }`}
                initial="closed"
                animate={isMenuOpen ? "open" : "closed"}
                variants={mobileMenuVariants}
            >
                <div className="container mx-auto py-4 px-4">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            onClick={() => handleSectionChange(section.id)}
                            className={`flex items-center space-x-3 w-full py-3 px-4 my-1 rounded-xl ${
                                activeSection === section.id 
                                    ? 'bg-accent/15 text-accent' 
                                    : 'text-muted-foreground hover:bg-accent/5 hover:text-foreground'
                            }`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>{section.icon}</span>
                            <span className="font-medium">{section.name}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.nav>
        </motion.header>
    );
};

export default PortfolioNavHeader;