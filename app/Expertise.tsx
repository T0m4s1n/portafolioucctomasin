import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ExpertiseSection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const sectionRef = useRef(null);

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
    },
    exit: {
      y: -60,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const expertiseItems = [
    {
      id: 1,
      title: 'Software',
      subtitle: 'Desarrollo',
      description: 'Experiencia en programación funcional y OOP: Dart, Python, Java, JavaScript, TypeScript.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
      bgText: 'tomasin.dev'
    },
    {
      id: 2,
      title: 'Desarrollo Frontend',
      subtitle: 'React, NextJS',
      description: 'Apasionado por UI/UX. experiencia en desarrollo con HTML, CSS, JS, React. Vue y frameworks NextJS.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
          <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
          <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
        </svg>
      ),
      bgText: 'tomasin souls'
    },
    {
      id: 3,
      title: 'Desarrollo Backend',
      subtitle: 'Java, Python, NodeJS',
      description: 'Conocimientos en desarrollo de APIs RESTful y GraphQL, bases de datos SQL y NoSQL, y servicios en la nube.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
      bgText: 'tomasin chiquito'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const CardItem = ({ item }: { item: typeof expertiseItems[number] }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    const animationState = isInView 
      ? 'visible' 
      : scrollDirection === 'up' 
        ? 'exit' 
        : 'hidden';

    return (
      <motion.div
        ref={ref}
        key={item.id}
        variants={itemVariants}
        initial="hidden"
        animate={animationState}
        className="border border-accent/10 rounded-md p-8 bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute inset-0 flex flex-wrap content-center justify-center opacity-10 text-2xl font-mono text-accent/30 overflow-hidden p-4 select-none">
          {Array(8).fill(item.bgText).map((text, idx) => (
            <span key={idx} className="m-2 whitespace-nowrap">{text}</span>
          ))}
        </div>
        
        <div className="flex mb-4 relative z-10">
          <div className="text-4xl text-accent mr-4">
            {item.icon}
          </div>
        </div>
        
        <h3 className="text-xl font-mono mb-1 text-accent">
          {item.title}
        </h3>
        <h4 className="text-xl font-light mb-4">
          {item.subtitle}
        </h4>
      
        <p className="text-muted-foreground opacity-80 relative z-10 text-sm">
          {item.description}
        </p>
      </motion.div>
    );
  };

  return (
    <section 
      id="expertise" 
      ref={sectionRef}
      className="py-24 bg-deluge-100 dark:bg-deluge-975 relative"
    >
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">03</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Especialidades</span>
          </motion.div>
          
          <>
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          `}</style>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Mis <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>Especialidades</span>
          </motion.h2>
          </>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Combinando habilidades técnicas con soluciones creativas para construir experiencias digitales modernas y eficientes.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {expertiseItems.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;