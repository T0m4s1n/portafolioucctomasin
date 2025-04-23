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
import Education from './Education';
import Hobbies from './Hobbies';
import Games from './Games';
import Recomendations from './Recomendations';
import LoadingScreen from './LoadingScreen';
import Footer from './Footer';

import { ThemeManager, useTheme } from './themeutils';

const PortfolioPage = () => {
    useTheme(); 
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('home');
    
    // Create references for all sections
    const sectionRefs = {
        home: useRef(null),
        work: useRef(null), // Assuming Inside component is for 'work' section
        expertise: useRef(null),
        experience: useRef(null),
        contact: useRef(null),
        about: useRef(null),
        skills: useRef(null), // Assuming Habilities component is for 'skills' section
        education: useRef(null),
        hobbies: useRef(null),
        games: useRef(null), // This seems to be an additional section compared to your header
        recommendations: useRef(null) // Assuming Recomendations component is for 'recommendations' section
    };
    
    // Function to handle section navigation from header
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
                    <Header activeSection={activeSection} onSectionChange={handleSectionChange} />
                    
                    <div ref={sectionRefs.home} id="home">
                        <Home />
                    </div>
                    
                    <div ref={sectionRefs.work} id="work">
                        <Inside />
                    </div>
                    
                    <div ref={sectionRefs.expertise} id="expertise">
                        <Expertise />
                    </div>
                    
                    <div ref={sectionRefs.experience} id="experience">
                        <Experience />
                    </div>
                    
                    <div ref={sectionRefs.contact} id="contact">
                        <Contact />
                    </div>
                    
                    <div ref={sectionRefs.about} id="about">
                        <About />
                    </div>
                    
                    <div ref={sectionRefs.skills} id="skills">
                        <Habilities />
                    </div>
                    
                    <div ref={sectionRefs.education} id="education">
                        <Education />
                    </div>
                    
                    <div ref={sectionRefs.hobbies} id="hobbies">
                        <Hobbies />
                    </div>
                    
                    <div ref={sectionRefs.games} id="games">
                        <Games />
                    </div>
                    
                    <div ref={sectionRefs.recommendations} id="recommendations">
                        <Recomendations />
                    </div>
                    
                    <Footer />
                </>
            )}
        </main>
    );
};

export default PortfolioPage;