"use client";

import React, { useEffect } from 'react';
import CustomCursor from './CustomCursor';
import SpaceBackground from './SpaceBackground';
import Header from './Header';
import Home from './Home';
import Inside from './Inside';
import Expertise from './Expertise';

import { ThemeManager, useTheme } from './themeutils';

const PortfolioPage = () => {
    const { theme } = useTheme();
    console.log('Current theme:', theme);
    
    useEffect(() => {
        ThemeManager.initTheme();
    }, []);

    return (
        <main className="min-h-screen text-foreground font-sans overflow-hidden relative">
            <CustomCursor />
            <SpaceBackground />
            <Header />
            <Home />
            <Inside />
            <Expertise />
        </main>
    );
};

export default PortfolioPage;