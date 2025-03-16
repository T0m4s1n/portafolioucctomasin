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
                // Cerrar el menú móvil cuando se esconde el header
                if (isMenuOpen) {
                    setIsMenuOpen(false);
                }
            } 
            else {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMenuOpen]);

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
            animate={isVisible ? "visible" : "hidden"}
            variants={navVariants}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <motion.div 
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-accent">
                        <Hammer size={28} />
                    </span>
                    <span className="font-bold text-2xl text-foreground">Tomasin</span>
                </motion.div>
                <nav className="hidden md:flex items-center space-x-6">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            onClick={() => handleSectionChange(section.id)}
                            className={`flex items-center space-x-1 font-medium text-sm relative px-3 py-2 rounded-full ${
                                activeSection === section.id 
                                    ? 'text-accent' 
                                    : 'text-muted-foreground hover:text-foreground'
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
                    className="md:hidden text-foreground p-2 rounded-full bg-background/30 backdrop-blur-sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>
            
            {/* Menú móvil separado que se muestra solo cuando está abierto */}
            {isMenuOpen && isVisible && (
                <motion.nav 
                    className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg"
                    initial="closed"
                    animate="open"
                    variants={mobileMenuVariants}
                    exit="closed"
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
            )}
        </motion.header>
    );
};

export default PortfolioNavHeader;