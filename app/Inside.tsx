import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const ProjectExplorer: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      category: "Logistica e Inventario",
      type: "Desarrollo",
      description: "Organiza tu inventario con IA, busca items instantáneamente y optimiza los tiempos de tu negocio. Desarrollado con Vue y Node.js.",
      liveUrl: "https://loginar.vercel.app/",
      accentColor: delugeColors[1],
      technologies: ["Vue", "IA", "Node.js"]
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
      technologies: ["React"]
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
      technologies: ["Vue", "Three.js", "WebGL"]
    }
  ];

  return (
    <div className="relative h-full text-foreground">
      <div className="container mx-auto px-10 py-8 relative z-10">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div 
                  className={`
                    absolute -left-4 top-0 bottom-0 w-0.5 transition-all duration-300 
                    ${selectedProject?.id === project.id 
                      ? 'opacity-100' 
                      : 'opacity-0 group-hover:opacity-50'
                    }
                  `}
                  style={{ backgroundColor: project.accentColor }}
                />
                
                <div
                  className={`
                    cursor-pointer p-4 rounded-lg transition-all 
                    border border-transparent backdrop-blur-md
                    ${selectedProject?.id === project.id 
                      ? `border-opacity-100 shadow-xl scale-105 border-2` 
                      : `hover:border-opacity-50 hover:shadow-md`
                    }
                  `}
                  style={{ 
                    backgroundColor: `${project.accentColor}80`, // More opaque background
                    borderColor: selectedProject?.id === project.id 
                      ? project.accentColor 
                      : `${project.accentColor}50`
                  }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 
                        className="font-bold text-lg mb-1"
                        style={{ color: project.accentColor }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.category} • {project.type}
                      </p>
                    </div>
                    <span 
                      className="text-xs font-medium opacity-70"
                      style={{ color: project.accentColor }}
                    >
                      {project.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {selectedProject ? (
                <motion.div
                  key={selectedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    bg-card rounded-lg p-6 border 
                    transition-all duration-300 backdrop-blur-md
                  `}
                  style={{
                    borderColor: `${selectedProject.accentColor}50`,
                    backgroundColor: `${selectedProject.accentColor}80` // More opaque background
                  }}
                >
                  <div className="mb-6">
                    <h2 
                      className="text-3xl font-bold mb-2 flex items-center"
                      style={{ color: selectedProject.accentColor }}
                    >
                      <span className="mr-3 w-2 h-2 rounded-full" style={{ backgroundColor: selectedProject.accentColor }} />
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center space-x-2 mb-4">
                      <span 
                        className="px-2 py-1 rounded-full text-xs"
                        style={{ 
                          backgroundColor: `${selectedProject.accentColor}80`, // More opaque background
                          color: selectedProject.accentColor
                        }}
                      >
                        {selectedProject.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {selectedProject.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6 bg-background/70 p-4 rounded-lg backdrop-blur-sm">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-2">Tecnologías</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 rounded-full text-xs backdrop-blur-sm"
                          style={{ 
                            backgroundColor: `${selectedProject.accentColor}80`, // More opaque background
                            color: selectedProject.accentColor
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.liveUrl && (
                    <motion.div 
                      className="bg-background rounded-lg overflow-hidden shadow-lg backdrop-blur-md"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div 
                        className="bg-muted p-2 text-sm flex items-center"
                        style={{ borderBottom: `2px solid ${selectedProject.accentColor}20` }}
                      >
                        <span 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: selectedProject.accentColor }}
                        />
                        {selectedProject.liveUrl}
                      </div>
                      <iframe 
                        src={selectedProject.liveUrl}
                        className="w-full h-[500px] border-none"
                        title={`${selectedProject.title} Live Preview`}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  className="bg-card rounded-lg p-6 text-center text-muted-foreground backdrop-blur-md border-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>Selecciona un proyecto para ver más detalles</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectExplorer;