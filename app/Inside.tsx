import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const ProjectExplorer: React.FC = () => {
  const [activeProject, setActiveProject] = useState<string | null>("loginar");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  interface Project {
    id: string;
    title: string;
    date: string;
    category: string;
    type: string;
    description: string;
    liveUrl?: string;
    accentColor: string;
    technologies: string[];
    imageUrl: string;
  }

  const delugeColors = [
    'var(--deluge-700)',
    'var(--deluge-600)',
    'var(--deluge-800)',
    'var(--deluge-500)',
    'var(--deluge-900)',
    'var(--deluge-600)'
  ];

  const projects: Project[] = [
    {
      id: "loginar",
      title: "LOGINAR",
      date: "Dec.2024",
      category: "HACKATHON",
      type: "Desarrollo",
      description: "Organiza tu inventario con IA, busca items instantáneamente y optimiza los tiempos de tu negocio. Desarrollado con Vue y Node.js.",
      liveUrl: "https://loginar.vercel.app/",
      accentColor: delugeColors[1],
      technologies: ["Vue", "IA", "Node.js"],
      imageUrl: "./loginar.png"
    },
    {
      id: "cambridge",
      title: "CAMBRIDGE",
      date: "Jul.2024",
      category: "Educación",
      type: "Desarrollo Web",
      description: "Rediseño de la plataforma de Cambridge Academy Pasto para mejorar la experiencia de aprendizaje. Creado con React y manejando GitFlow.",
      liveUrl: "https://www.cambridgeacademy.edu.co/",
      accentColor: delugeColors[1],
      technologies: ["React"],
      imageUrl: "./cambridge.png"
    },
    {
      id: "encrypter",
      title: "ENCRYPTER",
      date: "Oct.2024",
      category: "Desarrolllo",
      type: "Diseño y Dev",
      description: "Proyecto experimental realizado para trabajar estructuras de datos en forma de un encriptador en liena.",
      liveUrl: "https://encrypter-t0m4s1n.vercel.app/",
      accentColor: delugeColors[1],
      technologies: ["Vue", "Three.js", "WebGL"],
      imageUrl: "./encrypt.png"
    },
    {
      id: "pigzas",
      title: "PIGZAS",
      date: "Jun.2024",
      category: "Desarrollo",
      type: "Diseño y Dev",
      description: "Aplicación web para la gestión de inventarios y ventas en tiempo real. Desarrollada con React y Firebase.",
      liveUrl: "https://pigzas.vercel.app/",
      accentColor: delugeColors[1],
      technologies: ["React", "Firebase"],
      imageUrl: "./pigzas.png"
    },
    {
      id: "Seminario UCC",
      title: "SEMINARIO UCC",
      date: "Nov.2024",
      category: "Educación",
      type: "Frontend",
      description: "Diseño de identidad visual para una marca de productos tecnológicos innovadores.",
      accentColor: delugeColors[0],
      technologies: ["Figma", "Illustrator"],
      imageUrl: "./seminario.png"
    },
    {
      id: "Mundo Linux",
      title: "MUNDO LINUX",
      date: "Sep.2024",
      category: "HACKATHON",
      type: "Desarrollo y Diseño",
      description: "Sitio web para una organización sin fines de lucro enfocada en temas ambientales.",
      liveUrl: "https://actresponsable.vercel.app/",
      accentColor: delugeColors[2],
      technologies: ["React", "Tailwind"],
      imageUrl: "./mundolinux.png"
    },
    {
      id: "MASTERCOFFEE",
      title: "MASTERCOFFEE",
      date: "jun.2023",
      category: "Competencia",
      type: "Desarrollo",
      description: "Competencia de café en la que se desarrolló una plataforma para la recolección de votos y se realizo en la ciudad de Pasto.",
      accentColor: delugeColors[3],
      technologies: ["React/CSS", "Node.js"],
      imageUrl: "./mastercoffe.png"
    }
  ];

  const getCurrentProjectImage = () => {
    if (hoveredProject) {
      return projects.find(p => p.id === hoveredProject)?.imageUrl;
    }
    return projects.find(p => p.id === activeProject)?.imageUrl;
  };

  const getCurrentProject = () => {
    if (hoveredProject) {
      return projects.find(p => p.id === hoveredProject);
    }
    return projects.find(p => p.id === activeProject);
  };

  const fastTransition = {
    duration: 0.1,
    ease: "easeOut"
  };

  return (
    <section className="relative h-full">
      <AnimatePresence mode="wait">
        <motion.section
          key={hoveredProject || activeProject}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={fastTransition}
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ filter: "blur(8px)" }}
        >
          <img 
            src={getCurrentProjectImage() || "/api/placeholder/800/500"} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </motion.section>
      </AnimatePresence>

      <section className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 relative z-10">
        <section className="md:w-1/2 lg:w-5/12">
          <motion.section 
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0, transition: fastTransition }
            }} 
            className="flex items-center mb-6"
          >
            <span className="text-sm text-accent opacity-80 mr-2">02</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Proyectos</span>
          </motion.section>

          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <section className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-deluge-500 to-deluge-700 bg-clip-text">
                <span style={{ fontFamily: "'Dancing Script', cursive", color: "var(--deluge-500)" }}>Proyectos destacados</span>
              </h2>
            </section>
            <section>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Explora mi trabajo creativo en diferentes categorías y tecnologías.
              </p>
            </section>
          </motion.section>
          <section className="space-y-0">
            {projects.map((project, index) => (
              <motion.section
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border-b last:border-b-0"
                style={{ borderColor: `${delugeColors[0]}30` }}
              >
                <section 
                  className={`
                    cursor-pointer py-4 px-2 flex justify-between items-center group
                    transition-all duration-200 hover:pl-4
                    ${activeProject === project.id ? 'bg-opacity-10 bg-deluge-500' : ''}
                  `}
                  onClick={() => setActiveProject(project.id)}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <section className="flex items-center">
                    <motion.section 
                      className={`w-1 h-4 mr-3 rounded-full transition-all duration-200 ${
                        activeProject === project.id || hoveredProject === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                      }`}
                      style={{ backgroundColor: project.accentColor }}
                    />
                    <h3 className="text-lg font-medium">{project.title}</h3>
                  </section>
                  <section className="text-sm text-right">
                    <span className="text-muted-foreground">{project.category}</span>
                  </section>
                </section>
              </motion.section>
            ))}
          </section>
        </section>
        <section className="md:w-1/2 lg:w-7/12">
          <AnimatePresence mode="wait">
            <motion.section
              key={hoveredProject || activeProject}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fastTransition}
              className="h-full"
            >
              <motion.section 
                className="h-full rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={fastTransition}
              >
                <section className="relative bg-transparent h-auto md:h-full">
                  <section className="aspect-[4/5] md:aspect-video w-full">
                    <img 
                      src={getCurrentProjectImage() || "/api/placeholder/800/500"} 
                      alt={getCurrentProject()?.title || "Project Image"}
                      className="w-full h-full object-cover transition-opacity duration-200" 
                    />
                  </section>               
                  <section className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></section>
                  <motion.section 
                    className="absolute bottom-0 left-0 p-4 md:p-6 w-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <section className="flex justify-between items-end mb-2 md:mb-3">
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {getCurrentProject()?.title}
                      </h2>
                      <span className="text-white/80 text-xs md:text-sm">
                        {getCurrentProject()?.date}
                      </span>
                    </section>
                    
                    <section className="mb-2 md:mb-4">
                      <p className="text-white/90 text-xs md:text-sm font-medium">
                        {getCurrentProject()?.category} • {getCurrentProject()?.type}
                      </p>
                    </section>
                    
                    <p className="text-white/80 mb-4 md:mb-6 text-xs md:text-sm max-w-xl">
                      {getCurrentProject()?.description}
                    </p>
                    <section className="flex flex-wrap gap-2">
                      {getCurrentProject()?.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                          className="px-2 md:px-3 py-1 rounded-full text-xs backdrop-blur-sm bg-white/10"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </section>
                    {getCurrentProject()?.liveUrl && (
                      <a 
                        href={getCurrentProject()?.liveUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 md:mt-6 inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
                      >
                        Ver proyecto
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </motion.section>
                </section>
              </motion.section>
            </motion.section>
          </AnimatePresence>
        </section>
      </section>
    </section>
  );
};

export default ProjectExplorer;