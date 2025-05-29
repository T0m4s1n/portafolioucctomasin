import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Building, Award, BookOpen, ChevronRight, ChevronLeft } from 'lucide-react';

const EducationSection = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

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

  const iconHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 10 
      } 
    }
  };

  const educationItems = [
    {
      title: 'Formación Académica',
      icon: <GraduationCap className="w-6 h-6 text-accent" />,
      description: 'Formación universitaria todavia en aprendizaje.',
      items: [
        { 
          name: 'Titulo de ingeneria de software',
          institution: 'Universidad Cooperativa de Colombia.',
          year: '2023 - Presente',
          highlights: ['Monitoria en segundo semestre', 'Estudiante destacado']
        },
        {
          name: 'Formacion academica bachiller',
          institution: 'Colegio Filipense de Pasto',
          year: '2011 - 2022',
          highlights: ['Graduado con honores', 'Participación en actividades extracurriculares']
        }
      ]
    },
    {
      title: 'Experiencia Profesional',
      icon: <Building className="w-6 h-6 text-accent" />,
      description: 'Trayectoria laboral en empresas líderes del sector digital y tecnológico.',
      items: [
        {
          name: 'UX Designer & Frontend Developer',
          institution: 'Freelancer',
          year: '2023 - Presente',
          highlights: ['Developer Lider', 'Actualizacion de sistemas']
        },
        {
          name: 'Ionic Developer',
          institution: 'Freelancer',
          year: '2024 - Presente',
          highlights: ['Desarrollo de aplicaciones web/moviles', 'Integración de APIs']
        }
      ]
    },
    {
      title: 'Certificaciones',
      icon: <Award className="w-6 h-6 text-accent" />,
      description: 'Acreditaciones profesionales en tecnologías, metodologías y herramientas avanzadas.',
      items: [
        {
          name: 'Participacion en Hackhaton',
          institution: 'ConexTicSur',
          year: '2024',
          highlights: ['Gestión ágil de proyectos', 'Facilitación de equipos de desarrollo']
        },
        {
          name: 'Certificados Python, C# y JavaScript',
          institution: 'MASTERMIND',
          year: '2021',
          highlights: ['Aprendizaje en poco tiempo', 'Practicas y desarrollo de proyectos']
        }
      ]
    },
    {
      title: 'Formación Continua',
      icon: <BookOpen className="w-6 h-6 text-accent" />,
      description: 'Cursos especializados y programas de desarrollo profesional.',
      items: [
        {
          name: 'Advanced Next Patterns',
          institution: 'Freelancer',
          year: '2025',
          highlights: ['Patrones avanzados de Next', 'Optimización de rendimiento']
        },
        {
          name: 'Java Avanzado',
          institution: 'Pragma',
          year: '2025',
          highlights: ['Patrones avanzados en java', 'Optimización de rendimiento']
        }
      ]
    }
  ];

  const handleNextCategory = () => {
    setActiveCategory((prev) => (prev + 1) % educationItems.length);
    setActiveItem(0);
  };

  const handlePrevCategory = () => {
    setActiveCategory((prev) => (prev - 1 + educationItems.length) % educationItems.length);
    setActiveItem(0);
  };

  const handleNextItem = () => {
    const currentCategory = educationItems[activeCategory];
    setActiveItem((prev) => (prev + 1) % currentCategory.items.length);
  };

  const handlePrevItem = () => {
    const currentCategory = educationItems[activeCategory];
    setActiveItem((prev) => (prev - 1 + currentCategory.items.length) % currentCategory.items.length);
  };

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="py-24 bg-deluge-100 dark:bg-deluge-975 relative"
    >
      <section className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      <section className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <section className="container mx-auto px-4 md:px-8">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 relative z-10"
        >
          <motion.section variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">08</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Educación</span>
          </motion.section>
          
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          `}</style>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Mi <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>formación</span>
          </motion.h2>
          
          <motion.section variants={itemVariants} className="text-lg max-w-3xl mb-8">
            <p className="mb-4 text-muted-foreground">
              Mi trayectoria formativa combina <span className="text-accent">educación formal</span> con
              <span className="text-accent"> aprendizaje continuo</span>, permitiéndome mantenerme 
              a la vanguardia de las tecnologías y metodologías emergentes.
            </p>
          </motion.section>
        </motion.section>
        
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12"
        >
          <section className="relative flex justify-center items-center">
            <motion.button 
              onClick={handlePrevCategory}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-deluge-50/50 dark:bg-deluge-950/50 border border-accent/10 p-2 rounded-full shadow-md hover:bg-accent/20 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5 text-accent" />
            </motion.button>
            
            <section className="overflow-hidden relative w-full max-w-4xl mx-auto">
              <section className="flex justify-center items-center relative px-12">
                <section className="absolute left-0 right-0 h-px bg-accent/10 top-12 z-0" />

                <section className="flex gap-16 md:gap-24 justify-center items-center relative">
                  {educationItems.map((category, idx) => (
                    <motion.section
                      key={idx}
                      initial={{ opacity: 0.5, scale: 0.9 }}
                      animate={{ 
                        opacity: activeCategory === idx ? 1 : 0.5,
                        scale: activeCategory === idx ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => setActiveCategory(idx)}
                      className={`cursor-pointer transition-all duration-300 flex flex-col items-center ${
                        activeCategory === idx ? 'z-10' : 'z-0'
                      } ${

                        idx !== activeCategory && 
                        idx !== (activeCategory + 1) % educationItems.length && 
                        idx !== (activeCategory - 1 + educationItems.length) % educationItems.length
                        ? 'hidden md:flex' : ''
                      }`}
                    >
                      <motion.section 
                        className={`p-3 rounded-full border shadow-lg mb-3 transition-all duration-300 ${
                          activeCategory === idx 
                            ? 'bg-deluge-50/50 dark:bg-deluge-950/50 border-accent/30' 
                            : 'bg-deluge-50/30 dark:bg-deluge-950/30 border-accent/10'
                        }`}
                        whileHover={iconHoverVariants.hover}
                        initial="rest"
                      >
                        <section className="bg-white dark:bg-deluge-950 rounded-full p-3 shadow-inner">
                          {React.cloneElement(category.icon, { className: `w-6 h-6 text-accent` })}
                        </section>
                      </motion.section>
                      <section className="w-24 text-center">
                        <span className={`font-medium text-sm transition-colors duration-300 ${
                          activeCategory === idx ? 'text-accent' : 'text-muted-foreground'
                        }`}>
                          {category.title}
                        </span>
                      </section>
                    </motion.section>
                  ))}
                </section>
              </section>
              
              <section className="flex justify-center mt-4">
                <section className="flex gap-2">
                  {educationItems.map((_, idx) => (
                    <motion.section
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeCategory === idx ? 'bg-accent shadow-md' : 'bg-accent/20'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: activeCategory === idx ? 1.2 : 0.8 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </section>
              </section>
            </section>
            
            <motion.button 
              onClick={handleNextCategory}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-deluge-50/50 dark:bg-deluge-950/50 border border-accent/10 p-2 rounded-full shadow-md hover:bg-accent/20 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5 text-accent" />
            </motion.button>
          </section>
        </motion.section>
        
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.section
              key={`category-${activeCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              
              <section className="max-w-5xl mx-auto relative z-10">
                <section className="bg-deluge-50/50 dark:bg-deluge-950/50 rounded-2xl shadow-xl p-8 border border-accent/10 relative overflow-hidden">
                  <section className="absolute inset-0 flex flex-wrap content-center justify-center opacity-10 text-2xl font-mono text-accent/30 overflow-hidden p-4 select-none">
                    {Array(16).fill("education.details").map((text, idx) => (
                      <span key={idx} className="m-2 whitespace-nowrap">{text}</span>
                    ))}
                  </section>
                  
                  <section className="flex flex-col md:flex-row gap-8 relative z-10">
                    <section className="md:w-1/3">
                      <motion.section 
                        className="p-4 rounded-xl bg-accent/10 mb-6 inline-flex shadow-sm"
                        whileHover={iconHoverVariants.hover}
                        initial="rest"
                      >
                        {React.cloneElement(educationItems[activeCategory].icon, { 
                          className: "w-8 h-8 text-accent" 
                        })}
                      </motion.section>
                      
                      <h3 className="text-2xl font-medium mb-3 text-accent">
                        {educationItems[activeCategory].title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6">
                        {educationItems[activeCategory].description}
                      </p>
                      <section className="space-y-2 mb-4">
                        {educationItems[activeCategory].items.map((item, idx) => (
                          <motion.section 
                            key={idx}
                            onClick={() => setActiveItem(idx)}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className={`cursor-pointer p-3 rounded-lg transition-all duration-300 flex items-center gap-3 border ${
                              activeItem === idx 
                                ? "bg-accent text-white shadow-lg border-accent" 
                                : "hover:bg-accent/10 border-transparent hover:border-accent/20"
                            }`}
                          >
                            <section 
                              className={`w-2 h-2 rounded-full ${
                                activeItem === idx 
                                  ? "bg-white" 
                                  : "bg-accent opacity-60"
                              }`}
                            />
                            <span className={`text-sm ${
                              activeItem === idx ? "font-medium" : "text-muted-foreground"
                            }`}>
                              {item.name}
                            </span>
                          </motion.section>
                        ))}
                      </section>
                    </section>
                    
                    <section className="md:w-2/3 relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.section
                          key={`item-${activeItem}`}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="bg-deluge-50/50 dark:bg-deluge-950/70 p-6 rounded-xl border border-accent/10 h-full shadow-inner relative overflow-hidden"
                        >
                          <section className="absolute inset-0 flex flex-wrap content-center justify-center opacity-5 text-xl font-mono text-accent/30 overflow-hidden p-4 select-none">
                            {Array(8).fill(educationItems[activeCategory].items[activeItem].name).map((text, idx) => (
                              <span key={idx} className="m-2 whitespace-nowrap">{text}</span>
                            ))}
                          </section>
                          
                          <section className="relative z-10">
                            <h4 className="text-xl font-medium mb-2">
                              {educationItems[activeCategory].items[activeItem].name}
                            </h4>
                            
                            <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                              <span className="text-sm text-accent font-medium">
                                {educationItems[activeCategory].items[activeItem].institution}
                              </span>
                              <span className="text-sm bg-accent/10 px-3 py-1 rounded-full inline-block w-fit">
                                {educationItems[activeCategory].items[activeItem].year}
                              </span>
                            </section>
                            
                            <h5 className="text-sm font-medium mb-3 text-muted-foreground">Logros destacados:</h5>
                            <ul className="space-y-3">
                              {educationItems[activeCategory].items[activeItem].highlights.map((highlight, hidx) => (
                                <motion.li 
                                  key={hidx}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.5, delay: 0.2 + hidx * 0.1 }}
                                  className="flex items-start gap-3"
                                >
                                  <section className="mt-1 w-3 h-3 rounded-full bg-accent flex-shrink-0 shadow-sm" />
                                  <span>{highlight}</span>
                                </motion.li>
                              ))}
                            </ul>
                            <motion.section 
                              className="mt-8 flex justify-end gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <motion.button 
                                onClick={handlePrevItem}
                                whileHover={{ scale: 1.1, x: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors shadow-sm"
                              >
                                <ChevronLeft className="w-4 h-4 text-accent" />
                              </motion.button>
                              <motion.button 
                                onClick={handleNextItem}
                                whileHover={{ scale: 1.1, x: 2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors shadow-sm"
                              >
                                <ChevronRight className="w-4 h-4 text-accent" />
                              </motion.button>
                            </motion.section>
                          </section>
                        </motion.section>
                      </AnimatePresence>
                    </section>
                  </section>
                </section>
              </section>
            </motion.section>
          </AnimatePresence>
        </motion.section>
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <motion.p variants={itemVariants} className="text-sm text-gray-600 dark:text-gray-400 italic">
            Mi filosofía educativa se basa en el aprendizaje continuo. Actualmente estoy cursando un 
            programa especializado en Inteligencia Artificial aplicada al diseño y desarrollo web, 
            explorando cómo estas tecnologías pueden potenciar la experiencia del usuario.
          </motion.p>
        </motion.section>
      </section>
    </section>
  );
};

export default EducationSection;