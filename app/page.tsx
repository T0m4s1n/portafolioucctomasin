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
import Footer from './Footer';

import { ThemeManager, useTheme } from './themeutils';

const PortfolioPage = () => {
    useTheme(); 
    const [activeSection, setActiveSection] = useState('home');
    
    const sectionRefs = {
        home: useRef(null),
        work: useRef(null),
        expertise: useRef(null),
        experience: useRef(null),
        contact: useRef(null),
        about: useRef(null),
        skills: useRef(null),
        recommendations: useRef(null)
    };
    
    const handleSectionChange = (sectionId: "home" | "work" | "expertise" | "experience" | "contact" | "about" | "skills" | "recommendations") => {
        setActiveSection(sectionId);
        const sectionRef = sectionRefs[sectionId];
        
        
        if (sectionRef && sectionRef.current) {
            //@ts-expect-error: Icon property is dynamically assigned and may not match strict type checks
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    useEffect(() => {
        ThemeManager.initTheme();
    }, []);

    return (
        <main className="min-h-screen text-foreground font-sans overflow-hidden relative">
            <SpaceBackground />
            
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
                                                       
            <div ref={sectionRefs.recommendations} id="recommendations">
                <Recomendations />
            </div>
            
            <Footer onSectionChange={handleSectionChange} />
        </main>
    );
};

export default PortfolioPage;
