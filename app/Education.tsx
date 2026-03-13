import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Building, Award, BookOpen } from 'lucide-react';

const EducationSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);

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

  return (
    <div className="py-24 px-8 md:px-16 lg:px-24 bg-background dark:bg-deluge-975 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="flex-1">
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
              <div className="w-10 h-[1px] bg-accent" />
              <span className="text-accent uppercase tracking-[0.2em] text-sm font-medium">Trayectoria</span>
            </motion.div>
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
            >
              Educación & <span className="text-accent italic font-serif" style={{ fontFamily: "'Dancing Script', cursive" }}>Experiencia</span>
            </motion.h2>
          </div>
          
          <motion.div variants={itemVariants} className="max-w-md">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Un recorrido por mi formación académica y profesional, destacando los hitos que han definido mi perfil como desarrollador.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Navigation Controls */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {educationItems.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveCategory(index);
                }}
                className={`flex items-center gap-4 p-6 rounded-2xl transition-all duration-500 text-left group border ${
                  activeCategory === index 
                    ? 'bg-accent/10 border-accent/30 shadow-sm' 
                    : 'bg-card border-border hover:border-accent/20 hover:bg-accent/5'
                }`}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-3 rounded-xl transition-colors duration-500 ${
                  activeCategory === index ? 'bg-accent text-white' : 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white'
                }`}>
                  {React.cloneElement(category.icon as React.ReactElement<{ className?: string }>, { 
                    className: `w-6 h-6 transition-colors duration-500 ${activeCategory === index ? 'text-white' : ''}` 
                  })}
                </div>
                <div>
                  <h3 className={`font-bold transition-colors duration-500 ${
                    activeCategory === index ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 opacity-70">
                    {category.items.length} {category.items.length === 1 ? 'entrada' : 'entradas'}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Content Display */}
          <div className="lg:col-span-8 bg-card border border-border rounded-[2.5rem] p-8 md:p-12 shadow-sm min-h-[500px] relative overflow-hidden group/content">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-grid-pattern" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="relative z-10 h-full flex flex-col"
              >
                <div className="mb-10">
                  <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                    <span className="text-accent">{educationItems[activeCategory].title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl italic">
                    &quot;{educationItems[activeCategory].description}&quot;
                  </p>
                </div>

                <div className="flex-grow">
                  <div className="space-y-12">
                    {educationItems[activeCategory].items.map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-8 border-l border-accent/20 pb-2"
                      >
                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-accent" />
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-foreground mb-1">{item.name}</h4>
                            <div className="flex items-center gap-2 text-accent font-medium">
                              <BookOpen className="w-4 h-4" />
                              <span>{item.institution}</span>
                            </div>
                          </div>
                          <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold whitespace-nowrap self-start md:self-center">
                            {item.year}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {item.highlights.map((highlight, hIdx) => (
                            <span 
                              key={hIdx} 
                              className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium border border-border"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
