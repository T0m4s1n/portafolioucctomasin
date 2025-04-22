import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const RecomendacionesSection = () => {
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
    }
  };

  const recomendacionesItems = [
    {
      id: 1,
      name: "Sara Enriquez",
      position: "CEO de ArquiSolutions",
      quote: "Tomás demostró un profundo conocimiento técnico y creatividad excepcional. Entregó soluciones que superaron nuestras expectativas.",
      avatar: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
          <circle cx="12" cy="10" r="3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      bgText: 'testimonial'
    },
    {
      id: 2,
      name: "Luis Carlos Revelo",
      position: "Decano de la Facultad de Ingenieria, UCC",
      quote: "Trabajar con Tomás fue una experiencia excelente. Su enfoque metódico y atención al detalle elevaron significativamente la calidad de nuestro proyecto.",
      avatar: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
          <circle cx="12" cy="10" r="3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      bgText: 'feedback'
    },
    {
      id: 3,
      name: "River Bonilla",
      position: "CEO RiverSoluciones",
      quote: "Su capacidad para traducir ideas complejas en soluciones prácticas y elegantes es notable. Definitivamente volveremos a colaborar en futuros proyectos.",
      avatar: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
          <circle cx="12" cy="10" r="3" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
      bgText: 'review'
    }
  ];

  interface RecomendacionItem {
    id: number;
    name: string;
    position: string;
    quote: string;
    //@ts-expect-error: Avatar property is dynamically assigned and may not match strict type checks
    avatar: JSX.Element;
    bgText: string;
  }

  const TestimonialCard = ({ item }: { item: RecomendacionItem }) => {
    const ref = useRef(null);
    const isCardInView = useInView(ref, { once: true, amount: 0.3 });

    return (
      <motion.div
        ref={ref}
        key={item.id}
        variants={itemVariants}
        initial="hidden"
        animate={isCardInView ? "visible" : "hidden"}
        className="border border-accent/10 rounded-md p-8 bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md relative overflow-hidden"
      >
        <div className="absolute inset-0 flex flex-wrap content-center justify-center opacity-10 text-2xl font-mono text-accent/30 overflow-hidden p-4 select-none">
          {Array(8).fill(item.bgText).map((text, idx) => (
            <span key={idx} className="m-2 whitespace-nowrap">{text}</span>
          ))}
        </div>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent/30 mb-6">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
        
        <p className="text-muted-foreground opacity-90 relative z-10 text-sm italic mb-6">
          &quot;{item.quote}&quot;
        </p>
        
        <div className="flex items-center mt-4 relative z-10">
          <div className="text-accent mr-4">
            {item.avatar}
          </div>
          <div>
            <h3 className="text-base font-medium text-accent">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {item.position}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      id="recomendaciones" 
      ref={sectionRef}
      className="py-24 bg-deluge-100 dark:bg-deluge-975 relative"
    >
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-3xl rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">10</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Recomendaciones</span>
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
            Lo que <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>Dicen</span> de mí
          </motion.h2>
          </>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Comentarios de clientes y colegas con quienes he tenido el placer de colaborar en proyectos desafiantes y emocionantes.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {recomendacionesItems.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecomendacionesSection;