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
import LoadingScreen from './LoadingScreen';

import { ThemeManager, useTheme } from './themeutils';

const PortfolioPage = () => {
    useTheme(); 
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        ThemeManager.initTheme();
        
        // Add keyboard event listener to allow skipping the loading animation
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
            {/* SpaceBackground is always visible, even during loading */}
            <SpaceBackground />
            
            {/* Loading screen shown over SpaceBackground */}
            {isLoading && (
                <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
            )}
            
            {/* Main content shows up after loading completes */}
            {!isLoading && (
                <>
                    <CustomCursor />
                    <Header />
                    <Home />
                    <Inside />
                    <Expertise />
                    <Experience/>
                    <Contact />
                </>
            )}
        </main>
    );
};

export default PortfolioPage;