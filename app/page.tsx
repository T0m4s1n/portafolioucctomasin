"use client";

import React, { useEffect, useState, useRef } from 'react';
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
import Recomendations from './Recomendations';
import LoadingScreen from './LoadingScreen';
import Footer from './Footer';

import { ThemeManager, useTheme } from './themeutils';

const PortfolioPage = () => {
    useTheme(); 
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('home');
    
    const sectionRefs = {
        home: useRef(null),
        work: useRef(null),
        expertise: useRef(null),
        experience: useRef(null),
        contact: useRef(null),
        about: useRef(null),
        skills: useRef(null),
        education: useRef(null),
        hobbies: useRef(null),
        games: useRef(null),
        recommendations: useRef(null)
    };
    
    const handleSectionChange = (sectionId: keyof typeof sectionRefs) => {
        setActiveSection(sectionId);
        const sectionRef = sectionRefs[sectionId];
        
        
        if (sectionRef && sectionRef.current) {
            //@ts-expect-error: Icon property is dynamically assigned and may not match strict type checks
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
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
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-expect-error: Icon property is dynamically assigned and may not match strict type checks */}
                    <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
                    
                    <section ref={sectionRefs.home} id="home">
                        <Home />
                    </section>
                    
                    <section ref={sectionRefs.work} id="work">
                        <Inside />
                    </section>
                    
                    <section ref={sectionRefs.expertise} id="expertise">
                        <Expertise />
                    </section>
                    
                    <section ref={sectionRefs.experience} id="experience">
                        <Experience />
                    </section>
                    
                    <section ref={sectionRefs.contact} id="contact">
                        <Contact />
                    </section>
                    
                    <section ref={sectionRefs.about} id="about">
                        <About />
                    </section>
                    
                    <section ref={sectionRefs.skills} id="skills">
                        <Habilities />
                    </section>
                                                                   
                    <section ref={sectionRefs.recommendations} id="recommendations">
                        <Recomendations />
                    </section>
                    
                    <Footer />
                </>
            )}
        </main>
    );
};

export default PortfolioPage;