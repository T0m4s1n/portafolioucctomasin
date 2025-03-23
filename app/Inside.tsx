import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';

// Import SpaceBackground component
import SpaceBackground from './SpaceBackground';

interface InsideProps {
  onClose: () => void;
}

const Inside: React.FC<InsideProps> = ({ onClose }) => {
  // Using props for close functionality instead of internal state
  // This allows the Window component to control visibility
  
  // Add state to track container dimensions
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  // Add resize observer to detect container size changes
  useEffect(() => {
    if (!containerRef) return;

    const resizeObserver = new ResizeObserver(() => {});
    resizeObserver.observe(containerRef);

    return () => {
      if (containerRef) {
        resizeObserver.unobserve(containerRef);
      }
    };
  }, [containerRef]);
  
  // Define the CloseButton component
  const CloseButton: React.FC<{ onClick: () => void; accentColor?: string }> = ({ onClick, accentColor = 'var(--deluge-600)' }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
    <div>
      <button
        className="absolute top-4 right-4 z-50 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300"
        style={{
          backgroundColor: isHovered ? `${accentColor}30` : `${accentColor}15`,
          transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
          boxShadow: isHovered ? `0 0 12px ${accentColor}40` : 'none'
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Close"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ color: accentColor }}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    );
  };

  // Define the PortfolioItem component inside the Inside component
  interface PortfolioItemProps {
    title: string;
    date: string;
    category: string;
    type?: string;
    backgroundImage?: string | null;
    backgroundPattern?: "dots" | "lines" | "grid" | "none";
    onClick: () => void;
    accentColor?: string;
  }

  const PortfolioItem: React.FC<PortfolioItemProps> = ({ 
    title, 
    date, 
    category, 
    type = "Design & Dev",
    backgroundImage = null,
    backgroundPattern = "dots", // "dots", "lines", "grid", "none"
    onClick,
    accentColor = "var(--accent)",
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Get background patterns
    const getBackgroundPattern = () => {
      switch(backgroundPattern) {
        case "dots":
          return "radial-gradient(circle, currentColor 1px, transparent 1px)";
        case "lines":
          return "linear-gradient(45deg, currentColor 1px, transparent 1px)";
        case "grid":
          return `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `;
        default:
          return "none";
      }
    };

    return (
        <div 
        className="portfolio-item relative overflow-hidden rounded-lg cursor-pointer border border-accent/20 transition-all duration-300 h-56 md:h-64 hover:shadow-lg"
        style={{ 
          background: `linear-gradient(170deg, var(--card-background) 0%, ${accentColor}10 100%)`,
          transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: isHovered ? `0 15px 30px -10px ${accentColor}40` : `0 5px 15px -10px ${accentColor}20`,
          transition: 'all 0.3s ease-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10 transition-transform duration-500 ease-out"
          style={{ 
            backgroundImage: getBackgroundPattern(),
            backgroundSize: backgroundPattern === "dots" ? "20px 20px" : "40px 40px",
            color: accentColor,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />

        {/* Background image if provided */}
        {backgroundImage && (
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
        )}

          {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent transition-opacity duration-500" />

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-5">
          {/* Date and category */}
          <div className="text-xs flex justify-between items-center">
            <div 
              className="px-2 py-1 rounded-full text-xs"
              style={{ 
                backgroundColor: `${accentColor}15`,
                color: accentColor
              }}
            >
              {category}
            </div>
            <div style={{ color: `${accentColor}90` }}>
              {date}
            </div>
          </div>

          {/* Title */}
          <div className="mt-auto transition-transform duration-300" style={{ transform: isHovered ? 'translateY(-8px)' : 'translateY(0)' }}>
            <h3 className="text-xl md:text-2xl font-light mb-2">
              {title}
            </h3>
            
            {/* Type */}
            <div className="text-sm opacity-70">{type}</div>
            
            {/* Animated line */}
            <div 
              className="h-0.5 mt-3 origin-left transition-all duration-300"
              style={{ 
                background: accentColor,
                width: isHovered ? '100%' : '30%',
                opacity: isHovered ? 1 : 0.5
              }}
            />
          </div>
        </div>

        {/* View project button - appears on hover */}
        <div 
          className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full border flex items-center space-x-1 transition-all duration-300"
          style={{ 
            backgroundColor: `${accentColor}15`,
            borderColor: `${accentColor}30`,
            color: accentColor,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <span>View project</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>

        {/* Animated corner decoration */}
        <div
          className="absolute top-0 right-0 w-16 h-16 overflow-hidden transition-transform duration-300"
          style={{
            transform: isHovered ? 'scale(1.2) rotate(5deg)' : 'scale(1) rotate(0)',
            opacity: isHovered ? 1 : 0.5
          }}
        >
          <div 
            className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 rounded-tr-lg"
            style={{ borderColor: accentColor }}
          />
        </div>
      </div>
    );
  };

  interface Project {
    title: string;
    date: string;
    category: string;
    type?: string;
    backgroundImage?: string | null;
    accentColor?: string;
  }

  const PortfolioGrid: React.FC<{ projects: Project[] }> = ({ projects }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {projects.map((project, index) => (
          <PortfolioItem
            key={`${project.title}-${index}`}
            title={project.title}
            date={project.date}
            category={project.category}
            type={project.type}
            backgroundImage={project.backgroundImage}
            backgroundPattern={index % 3 === 0 ? "dots" : index % 3 === 1 ? "lines" : "grid"}
            accentColor={project.accentColor}
            onClick={() => console.log(`Clicked on project: ${project.title}`)}
          />
        ))}
      </div>
    );
  };

  // Sample projects data with added color variations
  const delugeColors = [
    'var(--deluge-700)',
    'var(--deluge-600)',
    'var(--deluge-800)',
    'var(--deluge-500)',
    'var(--deluge-900)',
    'var(--deluge-600)'
  ];

  const sampleProjects = [
    {
      title: "PRODUCTION HASU",
      date: "Oct.2024",
      category: "Portfolio",
      type: "Design & Dev",
      backgroundImage: null,
      accentColor: delugeColors[0]
    },
    {
      title: "emuni",
      date: "Jul.2024",
      category: "Portfolio",
      type: "Dev",
      backgroundImage: null,
      accentColor: delugeColors[1]
    },
    {
      title: "UNDER VOYAGER",
      date: "Apr.2024",
      category: "Special",
      type: "Design & Dev",
      backgroundImage: null,
      accentColor: delugeColors[2]
    },
    {
      title: "obake.blue",
      date: "Feb.2024",
      category: "Portfolio",
      type: "Design & Dev",
      backgroundImage: null,
      accentColor: delugeColors[3]
    },
    {
      title: "cocoon records",
      date: "Jan.2024",
      category: "Portfolio",
      type: "Design & Dev",
      backgroundImage: null,
      accentColor: delugeColors[4]
    },
    {
      title: "Starpeggio",
      date: "Aug.2023",
      category: "Special",
      type: "Design & Dev",
      backgroundImage: null,
      accentColor: delugeColors[5]
    }
  ];

  // Filter controls
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(sampleProjects.map(project => project.category))];
  const filteredProjects = filter === 'All' 
    ? sampleProjects 
    : sampleProjects.filter(project => project.category === filter);

  return (
    <div 
      ref={setContainerRef}
      className="relative h-full w-full overflow-hidden"
    >
      {/* Space background with fixed positioning that adapts to container dimensions */}
      <div className="absolute inset-0 overflow-hidden">
        <SpaceBackground />
      </div>
      
      {/* Close button - now uses the onClose prop */}
      <CloseButton onClick={onClose} accentColor="var(--deluge-600)" />
      
      {/* Main content container with higher z-index to appear above the background */}
      <div className="container mx-auto px-4 py-8 relative z-10 h-full overflow-auto">
        {/* Improved header with animation */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-deluge-500 to-deluge-700 bg-clip-text text-transparent">
            Recent Projects
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Explore my creative work across different categories and technologies.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  filter === category 
                    ? 'bg-deluge-600 text-deluge-100 shadow-md' 
                    : 'bg-deluge-200/30 hover:bg-deluge-300/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Project grid with staggered layout */}
        <motion.div 
          className="flex flex-col gap-8 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Featured project (larger) */}
          {filteredProjects.length > 0 && (
            <div className="w-full md:h-80">
              <PortfolioItem
                title={filteredProjects[0].title}
                date={filteredProjects[0].date}
                category={filteredProjects[0].category}
                type={filteredProjects[0].type}
                backgroundImage={filteredProjects[0].backgroundImage}
                backgroundPattern="dots"
                accentColor={filteredProjects[0].accentColor}
                onClick={() => console.log(`Clicked on featured project: ${filteredProjects[0].title}`)}
              />
            </div>
          )}
          
          {/* Rest of projects in grid */}
          <PortfolioGrid projects={filteredProjects.slice(1)} />
        </motion.div>
      </div>
    </div>
  );
};

export default Inside;