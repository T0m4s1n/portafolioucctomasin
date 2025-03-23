"use client";

import React, { useEffect } from 'react';
import SpaceBackground from './SpaceBackground';
import Header from './Header';
import Home from './Home';
import CustomCursor from './CustomCursor';
import Expertise from './Expertise';
import { ThemeManager, useTheme } from './themeutils';

const PortfolioPage = () => {
    const { theme } = useTheme();
    console.log('Current theme:', theme); // Use the theme variable
    
    // Inicializar el tema cuando se monta el componente
    useEffect(() => {
        ThemeManager.initTheme();
    }, []);

    return (
        <main className="min-h-screen text-foreground font-sans overflow-hidden relative">
            <CustomCursor />
            <SpaceBackground />
            <Header />
            <Home />
            <Expertise />
        </main>
    );
};

export default PortfolioPage;