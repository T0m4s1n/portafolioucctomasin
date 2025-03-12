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
        <div className="min-h-screen bg-white font-['Poppins'] p-8 flex justify-center items-center overflow-hidden">
            <div className="relative max-w-2xl w-full mx-auto">
                <motion.div 
                    className="relative z-10 text-center p-12"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        className="mb-10"
                    >
                        <motion.h1 
                            className="text-6xl font-bold text-wine-800"
                            variants={textVariants}
                            style={{ 
                                textShadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.1)"
                            }}
                        >
                            Tomasin
                        </motion.h1>
                        <motion.div 
                            className="h-1 w-32 mx-auto mt-4 bg-wine-700 rounded-full shadow-md"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "12rem", opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                        />
                    </motion.div>

                    <motion.div 
                        className="mt-12 flex flex-col items-center justify-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                    >
                        <div className="flex items-center justify-center mb-8 relative">
                            
                            <motion.div
                                animate={showHammer ? "up" : "down"}
                                variants={hammerVariants}
                                className="mr-6 text-wine-700"
                            >
                                <Hammer size={48} />
                            </motion.div>
                            
                            <motion.div
                                animate={rotateCode ? "rotated" : "normal"}
                                variants={codeVariants}
                                className="ml-6 text-wine-700"
                            >
                                <Code size={48} />
                            </motion.div>
                        </div>
                        
                        <div className="text-center">
                            <motion.span 
                                className="font-bold text-3xl block text-wine-700"
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
                                className="font-medium text-2xl text-wine-800 block mt-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                PORTAFOLIO
                            </motion.span>
                            
                            <motion.p 
                                className="text-gray-600 mt-5 italic text-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                Construyendo mi portafolio. Soy tomasin
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
            `}</style>
        </div>
    );
};

export default PortfolioHeader;