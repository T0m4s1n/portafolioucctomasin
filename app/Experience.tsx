import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ExperienceSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const projects = [
    {
      id: 1,
      name: "MASTERMIND",
      type: "ESTUDIANTE",
      isNew: false,
      description: "Plataforma de aprendizaje en la que desarolle mis primeras habilidades de programacion en Python, C# y JavaScript."
    },
    {
      id: 2,
      name: "CAMBRIDGE",
      type: "DESAROLLADOR",
      isNew: false,
      description: "Mi primer contrato en el cual junto a un equipo de 2 programadores mas se realizo una pagina para la empresa Cambridge Pasto."
    },
    {
      id: 3,
      name: "MASTERCOFFEE",
      type: "DESAROLLADOR PRINCIPAL",
      isNew: true,
      description: "Desarrollo de una plataforma que se creo para la recoleccion de los votos de la competencia Mastercoffee que se celebro el 2023."
    },
    {
      id: 4,
      name: "HACKATHON",
      type: "DESAROLLADOR LIDER",
      isNew: false,
      description: "Desarrollo de una plataforma para la participacion en una hackathon que se celebro en la ciudad de pasto, creando una pagina de logistica de inventario con inteligencia artificial."
    }
  ];

  type Project = {
    id: number;
    name: string;
    type: string;
    isNew: boolean;
    description: string;
  };

  const ProjectItem = ({ project }: { project: Project }) => {
    const itemRef = useRef(null);
    const isItemInView = useInView(itemRef, { once: true, amount: 0.3 });

    return (
      <motion.section
        ref={itemRef}
        variants={itemVariants}
        initial="hidden"
        animate={isItemInView ? "visible" : "hidden"}
        className="mb-12 relative"
        whileHover={{ x: 10, transition: { duration: 0.2 } }}
      >
        <section className="flex flex-col md:flex-row md:items-center border-b border-accent/20 pb-4">
          <section className="md:w-2/5">
            <h2 className="text-4xl md:text-5xl font-light text-accent mb-2 tracking-wider">{project.name}</h2>
            <section className="flex items-center mb-4 md:mb-0">
              <span className="text-xs text-accent/70 uppercase tracking-wider">— {project.type}</span>
              {project.isNew && (
                <span className="ml-3 text-xs px-2 py-0.5 bg-accent/10 rounded-full uppercase tracking-wider text-accent">Reciente</span>
              )}
            </section>
          </section>
          
          <section className="md:w-3/5 md:pl-8">
            <p className="text-sm md:text-base">{project.description}</p>
          </section>
        </section>
      </motion.section>
    );
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-24 relative"
    >
      <section className="container mx-auto px-8">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.section variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">04</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Experiencia</span>
          </motion.section>
          
          <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          `}</style>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Mi <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>Experiencia</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl">
            Un recorrido por mi camino profesional y las experiencias que han forjado mis habilidades.
          </motion.p>
        </motion.section>
        
        <section className="mt-12">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.map((project) => (
              <ProjectItem 
                key={project.id} 
                project={project}
              />
            ))}
          </motion.section>
        </section>
        
        <section className="absolute bottom-8 left-6 text-accent/50 text-sm">
          © 2025
        </section>
      </section>
    </section>
  );
};

export default ExperienceSection;