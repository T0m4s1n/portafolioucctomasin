"use client";

import SpaceBackground from './SpaceBackground';
import Header from './Header';
import Home from './Home';
import CustomCursor from './CustomCursor';
import Expertise from './Expertise';


const PortfolioHeader = () => {
    return (
        <main className="min-h-screen text-foreground font-sans overflow-hidden relative">
            <CustomCursor />
            <SpaceBackground />
            <Header />
            <Home/>
            <Expertise/>
        </main>
    );
};

export default PortfolioHeader;