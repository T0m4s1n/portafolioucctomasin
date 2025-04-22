"use client";

import React, { useEffect, useState } from 'react';
import CustomCursor from './CustomCursor';
import SpaceBackground from './SpaceBackground';
import Header from './Header';
import Home from './Home';
import Inside from './Inside';
import Expertise from './Expertise';
import Experience from './Experience';
import Contact from './Contact';
import About from './About';
import Habilities from './Habilities';
import Education from './Education';
import Hobbies from './Hobbies';
import Recomendations from './Recomendations';
import LoadingScreen from './LoadingScreen';
import Footer from './Footer';

import { ThemeManager, useTheme } from './themeutils';

const PortfolioPage = () => {
    useTheme(); 
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        ThemeManager.initTheme();
        const handleKeyDown = () => {
            if (isLoading) setIsLoading(false);
        };
        
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLoading]);

    return (
        <main className="min-h-screen text-foreground font-sans overflow-hidden relative">
            <SpaceBackground />
            
            {isLoading && (
                <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
            )}
            
            {!isLoading && (
                <>
                    <CustomCursor />
                    <Header />
                    <Home />
                    <Inside />
                    <Expertise />
                    <Experience/>
                    <Contact />
                    <About />
                    <Habilities />
                    <Education />
                    <Hobbies />
                    <Recomendations />
                    <Footer />
                </>
            )}
        </main>
    );
};

export default PortfolioPage;