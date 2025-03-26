"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './themeutils';
import Link from 'next/link';
import { Sun, Moon} from 'lucide-react';

const PortfolioNavHeader = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { theme, toggleTheme } = useTheme();
    const [language, setLanguage] = useState('es');
    const [isLanguageHovered, setIsLanguageHovered] = useState(false);

    const isDarkMode = theme === 'dark';

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const sections = [
        { id: 'home', name: 'Inicio', number: '01' },
        { id: 'work', name: 'Proyectos', number: '02' },
        { id: 'expertise', name: 'Especialidades', number: '03' },
        { id: 'experience', name: 'Experiencia', number: '04' },
        { id: 'contact', name: 'Contacto', number: '05' }
    ];

    const personalSections = [
        { id: 'about', name: 'Sobre Mí', number: '06', route: '/person#about' },
        { id: 'skills', name: 'Habilidades', number: '07', route: '/person#skills' },
        { id: 'education', name: 'Educación', number: '08', route: '/person#education' },
        { id: 'hobbies', name: 'Pasatiempos', number: '09', route: '/person#hobbies' },
        { id: 'recommendations', name: 'Recomendaciones', number: '10', route: '/person#recommendations' }
    ];

    const handleSectionChange = (sectionId: string) => {
        setActiveSection(sectionId);
        setIsMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const changeLanguage = (newLang: string) => {
        setLanguage(newLang);
    };

    const menuVariants = {
        closed: { 
            opacity: 0,
            clipPath: "circle(0% at calc(100% - 40px) 40px)",
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        open: { 
            opacity: 1,
            clipPath: "circle(150% at calc(100% - 40px) 40px)",
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const logoVariants = {
        initial: { y: -20, opacity: 0 },
        animate: { 
            y: 0, 
            opacity: 1,
            transition: { 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };
    
    const languageVariants = {
        container: {
            initial: { scale: 1 },
            hover: { 
                scale: 1.05,
                transition: { duration: 0.3 } 
            }
        },
        button: {
            active: { 
                backgroundColor: "var(--accent)",
                color: "white",
                transition: { duration: 0.3 }
            },
            inactive: { 
                backgroundColor: "transparent",
                color: "var(--accent)",
                transition: { duration: 0.3 }
            },
            hover: {
                backgroundColor: "var(--accent-10)",
                transition: { duration: 0.3 }
            }
        },
        underline: {
            initial: { width: "0%" },
            hover: { width: "100%", transition: { duration: 0.3 } }
        }
    };

    const headerControlsVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: (custom: number) => ({
            y: 0,
            opacity: 1,
            transition: { 
                delay: custom * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        })
    };

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+HU:wght@100..400&display=swap');
            `}</style>
            
            <motion.header 
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-8 ${
                    isVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="container mx-auto px-8 flex justify-between items-center">
                    <motion.div 
                        className="text-accent text-2xl font-light overflow-hidden relative"
                        variants={logoVariants}
                        initial="initial"
                        animate="animate"
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.3 } 
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div 
                            className="absolute top-0 left-0 opacity-10 text-accent" 
                            style={{ 
                                fontFamily: "'Playwrite HU', cursive", 
                                fontWeight: 100,
                                transform: 'translate(-8px, -4px) rotate(-2deg)',
                                fontSize: '2.2rem'
                            }}
                        >
                            /.Tomasin
                        </div>
                        
                        <div 
                            className="absolute top-0 left-0 opacity-20 text-accent" 
                            style={{ 
                                fontFamily: "'Dancing Script', cursive", 
                                fontWeight: 400,
                                transform: 'translate(-5px, -2px) rotate(-1deg)',
                                fontSize: '2.1rem'
                            }}
                        >
                            /.Tomasin
                        </div>
                        
                        <div 
                            className="absolute top-0 left-0 opacity-15 text-accent" 
                            style={{ 
                                fontFamily: "'Playwrite HU', cursive", 
                                fontWeight: 100,
                                transform: 'translate(-3px, -1px) rotate(-0.5deg)',
                                fontSize: '2rem'
                            }}
                        >
                            /.Tomasin
                        </div>
                        
                        <motion.span
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-block relative"
                        >
                            /.Tomasin
                            <motion.span 
                                className="absolute -top-1 -right-1 text-xs text-accent"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                style={{ fontFamily: "'Dancing Script', cursive" }}
                            >
                                dev
                            </motion.span>
                        </motion.span>
                    </motion.div>
                    
                    <div className="flex items-center gap-4">
                        <motion.div 
                            className="flex items-center border border-accent/30 rounded overflow-hidden h-8 relative"
                            variants={headerControlsVariants}
                            initial="hidden"
                            whileHover="hover"
                            custom={0}
                            animate="visible"
                            onHoverStart={() => setIsLanguageHovered(true)}
                            onHoverEnd={() => setIsLanguageHovered(false)}
                        >
                            <motion.button
                                className={`px-2 h-full flex items-center justify-center text-sm font-medium focus:outline-none relative overflow-hidden`}
                                variants={languageVariants.button}
                                animate={language === 'en' ? 'active' : 'inactive'}
                                whileHover={language === 'en' ? undefined : 'hover'}
                                onClick={() => changeLanguage('en')}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Switch to English"
                            >
                                <motion.span
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    EN
                                </motion.span>
                                {language !== 'en' && (
                                    <motion.div 
                                        className="absolute bottom-0 left-0 h-0.5 bg-accent/60"
                                        variants={languageVariants.underline}
                                        initial="initial"
                                        animate={isLanguageHovered ? "hover" : "initial"}
                                    />
                                )}
                            </motion.button>
                            <motion.button
                                className={`px-2 h-full flex items-center justify-center text-sm font-medium focus:outline-none relative overflow-hidden`}
                                variants={languageVariants.button}
                                animate={language === 'es' ? 'active' : 'inactive'}
                                whileHover={language === 'es' ? undefined : 'hover'}
                                onClick={() => changeLanguage('es')}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Switch to Spanish"
                            >
                                <motion.span
                                    initial={{ y: 20 }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    ES
                                </motion.span>
                                {language !== 'es' && (
                                    <motion.div 
                                        className="absolute bottom-0 left-0 h-0.5 bg-accent/60"
                                        variants={languageVariants.underline}
                                        initial="initial"
                                        animate={isLanguageHovered ? "hover" : "initial"}
                                    />
                                )}
                            </motion.button>
                            <motion.div 
                                className="absolute bottom-0 h-0.5 bg-accent"
                                initial={false}
                                animate={{ 
                                    left: language === 'en' ? '0%' : '50%',
                                    width: '50%'
                                }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 300, 
                                    damping: 30 
                                }}
                            />
                        </motion.div>
                        <motion.button
                            className="w-10 h-10 flex justify-center items-center text-accent hover:text-foreground focus:outline-none"
                            onClick={toggleTheme}
                            whileHover={{ 
                                scale: 1.1,
                                rotate: isDarkMode ? 180 : -180,
                                transition: { duration: 0.5 }
                            }}
                            whileTap={{ scale: 0.9 }}
                            custom={1}
                            variants={headerControlsVariants}
                            initial="hidden"
                            animate="visible"
                            aria-label="Toggle dark mode"
                        >
                            <AnimatePresence mode="wait">
                                {isDarkMode ? (
                                    <motion.div 
                                        key="sun"
                                        initial={{ rotate: -180, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 180, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Sun className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="moon"
                                        initial={{ rotate: 180, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -180, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Moon className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                        <motion.button
                            className="relative w-12 h-12 flex flex-col justify-center items-center focus:outline-none z-50"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            custom={2}
                            variants={headerControlsVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ 
                                scale: 1.1,
                                transition: { duration: 0.3 } 
                            }}
                            aria-label="Toggle menu"
                        >
                            <div className="grid grid-cols-3 gap-1.5 w-8 h-8">
                                {[...Array(9)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        className={`bg-accent block`}
                                        initial={false}
                                        animate={{
                                            width: isMenuOpen ? '6px' : i % 3 === 0 ? '100%' : '0%',
                                            height: isMenuOpen ? '6px' : '2px',
                                            opacity: isMenuOpen ? 1 : i % 3 === 0 ? 1 : 0,
                                            borderRadius: isMenuOpen ? '50%' : '2px',
                                            rotateZ: isMenuOpen ? i * 45 : 0,
                                            scale: isMenuOpen ? 1 + (i * 0.05) : 1
                                        }}
                                        transition={{ 
                                            duration: 0.4, 
                                            delay: isMenuOpen ? i * 0.03 : i * 0.01,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.button>
                    </div>
                </div>
            </motion.header>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 flex items-center justify-center"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <motion.nav className="container mx-auto px-8 py-16 flex flex-col items-center justify-center">
                            <div className="flex w-full">
                                <div className="w-1/2 pr-8 border-r border-accent/20">
                                    {sections.map((section, index) => (
                                        <motion.button
                                            key={section.id}
                                            className={`group py-4 text-center w-full flex items-center justify-center ${
                                                activeSection === section.id 
                                                    ? 'text-accent' 
                                                    : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                            onClick={() => handleSectionChange(section.id)}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ 
                                                opacity: 1, 
                                                y: 0,
                                                transition: { 
                                                    delay: index * 0.1 + 0.2,
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 24
                                                } 
                                            }}
                                            exit={{ 
                                                opacity: 0,
                                                y: 20,
                                                transition: { delay: (sections.length - index) * 0.05 } 
                                            }}
                                            whileHover={{ 
                                                scale: 1.05, 
                                                x: 10,
                                                transition: { duration: 0.3 }
                                            }}
                                        >
                                            <div className="flex items-center text-2xl md:text-3xl">
                                                <motion.span 
                                                    className="text-sm opacity-70 mr-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ 
                                                        opacity: 0.7, 
                                                        x: 0,
                                                        transition: { delay: index * 0.1 + 0.4 }
                                                    }}
                                                >
                                                    {section.number}
                                                </motion.span>
                                                <motion.span 
                                                    className="mr-2"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ 
                                                        opacity: 1,
                                                        transition: { delay: index * 0.1 + 0.3 }
                                                    }}
                                                >
                                                    {'//'}
                                                </motion.span>
                                                <motion.span 
                                                    className="font-light relative overflow-hidden"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ 
                                                        opacity: 1,
                                                        transition: { delay: index * 0.1 + 0.5 }
                                                    }}
                                                >
                                                    {section.name}
                                                    <motion.div 
                                                        className="absolute bottom-0 left-0 h-0.5 bg-accent/60 w-full"
                                                        initial={{ scaleX: 0, originX: 0 }}
                                                        whileHover={{ 
                                                            scaleX: 1,
                                                            transition: { duration: 0.3 } 
                                                        }}
                                                    />
                                                </motion.span>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                                <div className="w-1/2 pl-8">
                                    {personalSections.map((section, index) => (
                                        <Link 
                                            href={section.route} 
                                            key={section.id}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <motion.div
                                                className={`group py-4 text-center w-full flex items-center justify-center cursor-pointer ${
                                                    activeSection === section.id 
                                                        ? 'text-accent' 
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ 
                                                    opacity: 1, 
                                                    y: 0,
                                                    transition: { 
                                                        delay: index * 0.1 + 0.2,
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 24
                                                    } 
                                                }}
                                                exit={{ 
                                                    opacity: 0,
                                                    y: 20,
                                                    transition: { delay: (personalSections.length - index) * 0.05 } 
                                                }}
                                                whileHover={{ 
                                                    scale: 1.05, 
                                                    x: -10,
                                                    transition: { duration: 0.3 }
                                                }}
                                            >
                                                <div className="flex items-center text-2xl md:text-3xl">
                                                    <motion.span 
                                                        className="text-sm opacity-70 mr-2"
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ 
                                                            opacity: 0.7, 
                                                            x: 0,
                                                            transition: { delay: index * 0.1 + 0.4 }
                                                        }}
                                                    >
                                                        {section.number}
                                                    </motion.span>
                                                    <motion.span 
                                                        className="mr-2"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ 
                                                            opacity: 1,
                                                            transition: { delay: index * 0.1 + 0.3 }
                                                        }}
                                                    >
                                                        {'//'}
                                                    </motion.span>
                                                    <motion.span 
                                                        className="font-light relative overflow-hidden"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ 
                                                            opacity: 1,
                                                            transition: { delay: index * 0.1 + 0.5 }
                                                        }}
                                                    >
                                                        {section.name}
                                                        <motion.div 
                                                            className="absolute bottom-0 left-0 h-0.5 bg-accent/60 w-full"
                                                            initial={{ scaleX: 0, originX: 0 }}
                                                            whileHover={{ 
                                                                scaleX: 1,
                                                                transition: { duration: 0.3 } 
                                                            }}
                                                        />
                                                    </motion.span>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PortfolioNavHeader;