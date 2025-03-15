"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hammer, Code } from 'lucide-react';

const PortfolioHeader = () => {
    const [showHammer, setShowHammer] = useState(true);
    const [rotateCode, setRotateCode] = useState(false);

    useEffect(() => {
        const hammerInterval = setInterval(() => {
            setShowHammer(prev => !prev);
        }, 800);
        
        const codeInterval = setInterval(() => {
            setRotateCode(prev => !prev);
        }, 2000);
        
        return () => {
            clearInterval(hammerInterval);
            clearInterval(codeInterval);
        };
    }, []);
    
    const textVariants = {
        hidden: { opacity: 0, y: -20 },
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
    const hammerVariants = {
        up: { 
            rotate: -45,
            y: -15,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 15
            }
        },
        down: { 
            rotate: 10,
            y: 5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const codeVariants = {
        normal: { rotate: 0, scale: 1 },
        rotated: { 
            rotate: 360, 
            scale: 1.2,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    };

    return (
        <main className="min-h-screen bg-background text-foreground font-sans p-8 flex justify-center items-center overflow-hidden">
            <section className="relative max-w-2xl w-full mx-auto">
                <motion.header 
                    className="relative z-10 text-center p-12"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                >
                    <motion.article
                        initial="hidden"
                        animate="visible"
                        className="mb-10"
                    >
                        <motion.h1 
                            className="text-6xl font-bold text-accent-dark"
                            variants={textVariants}
                            style={{ 
                                textShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            Tomasin
                        </motion.h1>
                        <motion.span 
                            className="h-1 w-32 mx-auto mt-4 bg-accent rounded-full shadow-md block"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "12rem", opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                        />
                    </motion.article>

                    <motion.section 
                        className="mt-12 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                    >
                        <figure className="flex items-center justify-center mb-8 relative">
                            
                            <motion.span
                                animate={showHammer ? "up" : "down"}
                                variants={hammerVariants}
                                className="mr-6 text-accent"
                            >
                                <Hammer size={48} />
                            </motion.span>
                            
                            <motion.span
                                animate={rotateCode ? "rotated" : "normal"}
                                variants={codeVariants}
                                className="ml-6 text-accent-light"
                            >
                                <Code size={48} />
                            </motion.span>
                        </figure>
                        
                        <article className="text-center">
                            <motion.span 
                                className="font-bold text-3xl block text-accent"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                style={{ 
                                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                TRABAJANDO EN ESTO
                            </motion.span>
                            
                            <motion.span 
                                className="font-medium text-2xl text-accent-dark block mt-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                PORTAFOLIO
                            </motion.span>
                            
                            <motion.p 
                                className="text-muted-foreground mt-5 italic text-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                Construyendo mi portafolio. Soy tomasin
                            </motion.p>
                        </article>
                    </motion.section>
                </motion.header>
            </section>
        </main>
    );
};

export default PortfolioHeader;