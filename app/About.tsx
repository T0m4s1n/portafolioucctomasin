import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 relative bg-deluge-100 dark:bg-deluge-975"
    >
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-6 relative z-10"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">06</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Sobre mí</span>
          </motion.div>
        </motion.div>
        
        <div className="flex flex-col-reverse md:flex-row relative">
          <div className="w-full md:w-2/3 relative z-10 md:pr-12">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-8"
            >
              <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
              `}</style>
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-light mb-2"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <span className="text-accent">Sobre Mi</span>
              </motion.h1>
              
              <motion.h2 
                variants={itemVariants}
                className="text-2xl md:text-3xl font-light mb-8"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Soy desarrollador, diseñador y solucionador de problemas.
              </motion.h2>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6 max-w-2xl"
            >
              <motion.p variants={itemVariants} className="text-base">
                La convergencia del arte y la tecnología siempre me ha fascinado y nunca he tenido miedo de sumergirme y experimentar, ya sea con Python, JavaScript o C#. He estado programando desde que recuerdo, transformando ideas en soluciones digitales que resuelven problemas reales.
              </motion.p>
              
              <motion.p variants={itemVariants} className="text-base">
                Lo que más me emociona de ser Desarrollador es poder diseñar y crear cosas que tienen un propósito y resuelven problemas reales. Va más allá de diseñar botones y sitios web e implica tener pasión por diseñar cosas que realmente importan.
              </motion.p>
            </motion.div>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0 relative">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="md:absolute md:top-0 md:-left-6"
            >
              <motion.div 
                variants={itemVariants}
                className="border border-accent/10 rounded-md p-2 bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md overflow-hidden shadow-md relative mx-auto md:mx-0"
                style={{ maxWidth: "250px" }}
              >
                <img 
                  src="./ar.jpg" 
                  alt="Profile photo" 
                  className="w-full h-auto object-cover rounded-sm"
                />
                <div className="absolute inset-0 border border-accent/20 rounded-sm pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute bottom-8 left-6 text-accent/50 text-xs"
        >
          <motion.span variants={itemVariants}>© 2025</motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;