import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Camera, Music, BookOpen,
  ChevronRight, Clock
} from 'lucide-react';

const HobbiesSection = () => {
  const sectionRef = useRef(null);
  useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeHobby, setActiveHobby] = useState(0);
  const [hoveredHobby, setHoveredHobby] = useState<number | null>(null);

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

  const fastTransition = {
    duration: 0.1,
    ease: "easeOut"
  };

  const hobbies = [
    {
      id: "fotografia",
      title: "Fotografía",
      icon: <Camera className="w-6 h-6 text-accent" />,
      description: "Capturo arquitectura urbana explorando el contraste entre lo antiguo y moderno.",
      level: 4,
      accentColor: "var(--accent)",
      gallery: [
        { title: "Laguna de la Cocha", details: "Pasto, 2023" },
        { title: "Carnaval de Negros y Blancos", details: "Pasto, 2024" },
        { title: "Volcán Galeras", details: "Pasto, 2023" }
    ],
      timeInvested: "1 años",
      nextProject: "Serie sobre arquitectura brutalista europea."
    },
    {
      id: "musica",
      title: "Música",
      icon: <Music className="w-6 h-6 text-accent" />,
      description: "Me considero melomano y disfruto mucho de escuchar musica y descubrir",
      level: 4,
      accentColor: "var(--accent)",
      gallery: [
        { title: "Let It Happen", details: "Tame Impala" },
        { title: "Good Looking ", details: "Suki Waterhouse" },
        { title: "Echoes", details: "Pink Floyd" }
      ],
      timeInvested: "6 años",
      nextProject: "Álbum conceptual con acústica de espacios abandonados."
    },
    {
      id: "lectura",
      title: "Lectura",
      icon: <BookOpen className="w-6 h-6 text-accent" />,
      description: "Exploro ciencia ficción, foros ficticios y libros interesantes.",
      level: 5,
      accentColor: "var(--accent)",
      gallery: [
        { title: "Ciencia ficción", details: "Codigo Davinci, Dan Brown" },
        { title: "Foros como SCP", details: "" },
        { title: "Narrativa actual", details: "Estructuras experimentales" }
      ],
      timeInvested: "Toda la vida",
      nextProject: "Club de lectura sobre narrativa especulativa y ciencia."
    }
  ];

  const getCurrentHobby = () => {
    if (hoveredHobby !== null) {
      return hobbies[hoveredHobby];
    }
    return hobbies[activeHobby];
  };

  return (
    <section 
      id="hobbies" 
      ref={sectionRef}
      className="py-24 bg-deluge-100 dark:bg-deluge-975"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 relative z-10"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">09</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Pasatiempos</span>
          </motion.div>
          
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          `}</style>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Mis <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>pasiones</span>
          </motion.h2>
          
          <motion.div variants={itemVariants} className="text-lg max-w-3xl mb-8">
            <p className="mb-4 text-muted-foreground">
              Fuera del ámbito profesional, cultivo diversas <span className="text-accent">pasiones creativas</span> que 
              enriquecen mi perspectiva y alimentan mi inspiración para el trabajo digital.
            </p>
          </motion.div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side - Hobby List */}
          <div className="md:w-1/2 lg:w-6/12">
            <h3 className="text-xl font-medium mb-4 text-accent">Selecciona una pasión</h3>
            <div className="space-y-2 bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md rounded-xl p-3 border border-accent/20">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="rounded-lg overflow-hidden"
                >
                  <div 
                    className={`
                      cursor-pointer py-3 px-4 flex justify-between items-center group
                      transition-all duration-200 
                      ${activeHobby === index ? 'bg-accent text-white shadow-md' : 'hover:bg-accent/10'}
                    `}
                    onClick={() => setActiveHobby(index)}
                    onMouseEnter={() => setHoveredHobby(index)}
                    onMouseLeave={() => setHoveredHobby(null)}
                  >
                    <div className="flex items-center">
                      <div 
                        className={`
                          flex items-center justify-center w-8 h-8 rounded-full mr-3
                          ${activeHobby === index ? 'bg-white/20' : 'bg-accent/10'}
                        `}
                      >
                        {hobby.icon && React.cloneElement(hobby.icon, { 
                          className: `w-4 h-4 ${activeHobby === index ? 'text-white' : 'text-accent'}` 
                        })}
                      </div>
                      <h3 className={`text-base font-medium ${activeHobby === index ? 'text-white' : ''}`}>
                        {hobby.title}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-3">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
                              i < hobby.level 
                                ? activeHobby === index ? "bg-white" : "bg-accent" 
                                : activeHobby === index ? "bg-white/20" : "bg-accent/20"
                            }`}
                          />
                        ))}
                      </div>
                      <ChevronRight className={`w-4 h-4 ${
                        activeHobby === index ? 'text-white opacity-100' : 'text-accent opacity-0 group-hover:opacity-100'
                      } transition-opacity`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 lg:w-6/12 mt-11">
            <AnimatePresence mode="wait">
              <motion.div
                key={`hobby-${hoveredHobby !== null ? hoveredHobby : activeHobby}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fastTransition}
                className="h-full"
              >
                <div className="bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md rounded-2xl shadow-md p-5 border border-accent/10 relative">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-xl bg-accent/10 mr-3">
                      {getCurrentHobby().icon && React.cloneElement(getCurrentHobby().icon, { 
                        className: "w-6 h-6 text-accent" 
                      })}
                    </div>
                    
                    <h3 className="text-xl font-medium text-accent">
                      {getCurrentHobby().title}
                    </h3>
                    
                    <div className="ml-auto inline-flex items-center bg-accent/10 px-2 py-1 rounded-full text-xs">
                      <Clock className="w-3 h-3 mr-1 text-accent" />
                      <span>{getCurrentHobby().timeInvested}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {getCurrentHobby().description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {getCurrentHobby().gallery.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.05 + idx * 0.05 }}
                        className="bg-deluge-50/10 dark:bg-deluge-950/40 border border-accent/10 rounded-lg p-3"
                      >
                        <h5 className="font-medium text-xs mb-1">{item.title}</h5>
                        <p className="text-xs text-muted-foreground">{item.details}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HobbiesSection;