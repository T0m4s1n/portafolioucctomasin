"use client";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

const Inside: React.FC = () => {
  // State for the modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  interface PortfolioItemProps {
    project: Project;
    onClick: () => void;
    index?: number;
    featured?: boolean;
  }

  interface Project {
    id: string;
    title: string;
    date: string;
    category: string;
    type: string;
    description: string;
    backgroundImage?: string | null;
    backgroundPattern?: "dots" | "lines" | "grid" | "none";
    accentColor: string;
    detailImages?: (string | null)[];
  }

  const PortfolioItem: React.FC<PortfolioItemProps> = ({ 
    project,
    onClick,
    index = 0,
    featured = false
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const { 
      title, 
      date, 
      category, 
      type, 
      backgroundImage = null,
      backgroundPattern = "dots",
      accentColor
    } = project;
    
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
      <motion.div 
        className={`portfolio-item relative overflow-hidden rounded-lg cursor-pointer border border-accent/20 ${featured ? 'h-80' : 'h-56 md:h-64'}`}
        style={{ 
          background: `linear-gradient(170deg, var(--card-background) 0%, ${accentColor} 100%)`,
          boxShadow: isHovered ? `0 15px 30px -10px ${accentColor}40` : `0 5px 15px -10px ${accentColor}20`,
          opacity: 1
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.1, 
          ease: "easeOut" 
        }}
        whileHover={{ 
          y: -5, 
          transition: { duration: 0.3 } 
        }}
      >
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: getBackgroundPattern(),
            backgroundSize: backgroundPattern === "dots" ? "20px 20px" : "40px 40px",
            color: accentColor,
          }}
          animate={{ 
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {backgroundImage && (
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent transition-opacity duration-500" />
        <div className="relative z-10 h-full flex flex-col justify-between p-4 md:p-5">
          <div className="text-xs flex justify-between items-center">
            <motion.div 
              className="px-2 py-1 rounded-full text-xs"
              style={{ 
                backgroundColor: `${accentColor}15`,
                color: accentColor
              }}
              whileHover={{ scale: 1.05 }}
            >
              {category}
            </motion.div>
            <div style={{ color: `${accentColor}90` }}>
              {date}
            </div>
          </div>
          <motion.div 
            className="mt-auto"
            animate={{ 
              y: isHovered ? -8 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-light mb-2 text-foreground`}>
              {title}
            </h3>

            <div className="text-sm text-muted-foreground">{type}</div>
            
            <motion.div 
              className="h-0.5 mt-3 origin-left"
              style={{ 
                background: accentColor,
              }}
              initial={{ width: '30%', opacity: 0.5 }}
              animate={{ 
                width: isHovered ? '100%' : '30%',
                opacity: isHovered ? 1 : 0.5
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
        <motion.div 
          className="absolute top-4 right-4 text-sm px-3 py-2 rounded-full border flex items-center space-x-1"
          style={{ 
            backgroundColor: `${accentColor}15`,
            borderColor: `${accentColor}30`,
            color: accentColor,
          }}
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.9,
            y: isHovered ? 0 : -10
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: `${accentColor}30`,
          }}
        >
          <span>Ver proyecto</span>
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            animate={{ x: isHovered ? 3 : 0 }}
            transition={{ repeat: isHovered ? Infinity : 0, repeatType: "reverse", duration: 0.6 }}
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </motion.svg>
        </motion.div>

        {/* Animated corner decoration */}
        <motion.div
          className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 5 : 0,
            opacity: isHovered ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 rounded-tr-lg"
            style={{ borderColor: accentColor }}
          />
        </motion.div>
      </motion.div>
    );
  };

  const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {


    return (
      <motion.div 
        className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-card relative rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background text-foreground"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div 
            className="h-56 md:h-72 relative overflow-hidden"
            style={{ background: `linear-gradient(170deg, var(--card-background) 0%, ${project.accentColor} 100%)` }}
          >
            <div 
              className="absolute inset-0 opacity-10"
              style={{ 
                backgroundImage: getBackgroundPattern(project.backgroundPattern || "dots"),
                backgroundSize: (project.backgroundPattern || "dots") === "dots" ? "20px 20px" : "40px 40px",
                color: project.accentColor,
              }}
            />
            
            {project.backgroundImage && (
              <div 
                className="absolute inset-0 opacity-30 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.backgroundImage})` }}
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex flex-col justify-end p-6">
              <div 
                className="inline-block px-3 py-1 rounded-full text-sm mb-3"
                style={{ backgroundColor: `${project.accentColor}20`, color: project.accentColor }}
              >
                {project.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">{project.title}</h2>
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">{project.type}</div>
                <div className="text-sm" style={{ color: `${project.accentColor}90` }}>{project.date}</div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-medium mb-4 text-foreground">Descripción del proyecto</h3>
            <p className="text-muted-foreground mb-6">{project.description}</p>
            {project.detailImages && project.detailImages.length > 0 && (
              <div className="space-y-6 mt-8">
                <h3 className="text-xl font-medium mb-4 text-foreground">Detalles del proyecto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.detailImages.map((img, i) => (
                    <div key={i} className="rounded-lg overflow-hidden bg-accent/10 aspect-video flex items-center justify-center">
                      {img ? (
                        <img src={img} alt={`${project.title} detail ${i+1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-accent/50 text-sm">Imagen {i+1}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  const getBackgroundPattern = (pattern: "dots" | "lines" | "grid" | "none") => {
    switch(pattern) {
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

  const delugeColors = [
    'var(--deluge-700)',
    'var(--deluge-600)',
    'var(--deluge-800)',
    'var(--deluge-500)',
    'var(--deluge-900)',
    'var(--deluge-600)'
  ];

  const sampleProjects: Project[] = [
    {
      id: "production-hasu",
      title: "PRODUCTION HASU",
      date: "Oct.2024",
      category: "Portafolio",
      type: "Diseño y Dev",
      description: "Un completo rediseño del sitio web de Production HASU enfocado en mejorar la experiencia de usuario y destacar sus proyectos creativos. Implementado con Next.js y Framer Motion para lograr transiciones fluidas.",
      backgroundImage: null,
      backgroundPattern: "dots",
      accentColor: delugeColors[0],
      detailImages: [null, null]
    },
    {
      id: "emuni",
      title: "emuni",
      date: "Jul.2024",
      category: "Portafolio",
      type: "Desarrollo",
      description: "Plataforma educativa con diseño minimalista enfocada en la experiencia de aprendizaje. Desarrollada con React y Node.js, implementando características interactivas para estudiantes y profesores.",
      backgroundImage: null,
      backgroundPattern: "lines",
      accentColor: delugeColors[1],
      detailImages: [null, null]
    },
    {
      id: "under-voyager",
      title: "UNDER VOYAGER",
      date: "Abr.2024",
      category: "Especial",
      type: "Diseño y Dev",
      description: "Proyecto experimental que combina visualizaciones de datos con narrativa interactiva. Creado con D3.js y Three.js para crear una experiencia inmersiva única.",
      backgroundImage: null,
      backgroundPattern: "grid",
      accentColor: delugeColors[2],
      detailImages: [null, null]
    },
    {
      id: "obake-blue",
      title: "obake.blue",
      date: "Feb.2024",
      category: "Portafolio",
      type: "Diseño y Dev",
      description: "Portafolio digital minimalista con enfoque en diseño responsivo y accesibilidad. Desarrollado con tecnologías web modernas y optimizado para todos los dispositivos.",
      backgroundImage: null,
      backgroundPattern: "dots",
      accentColor: delugeColors[3],
      detailImages: [null, null]
    },
  ];

  return (
    <div className="relative h-full text-foreground">
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: -10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }} 
          className="flex items-center mb-6"
        >
          <span className="text-sm text-accent opacity-80 mr-2">02</span>
          <span className="text-sm text-accent mr-2">{'//'}</span>
          <span className="text-sm text-accent font-light">Proyectos</span>
        </motion.div>
        
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-deluge-500 to-deluge-700 bg-clip-text">
              <span style={{ fontFamily: "'Dancing Script', cursive", color: "var(--deluge-500)" }}>Proyectos destacados</span>
            </h2>
          </div>
          <div>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Explora mi trabajo creativo en diferentes categorías y tecnologías.
            </p>
          </div>
        </motion.div>
        <motion.div 
          className="w-full mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PortfolioItem
            project={sampleProjects[0]}
            onClick={() => setSelectedProject(sampleProjects[0])}
            featured={true}
          />
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {sampleProjects.slice(1).map((project, index) => (
            <PortfolioItem
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
              index={index}
            />
          ))}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+HU:wght@100..400&display=swap');
      `}</style>
    </div>
  );
};

export default Inside;