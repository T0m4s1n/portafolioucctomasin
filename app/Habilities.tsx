import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Globe } from 'lucide-react';

const SkillsSection = () => {
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

  const skillCategories = [
    {
      title: 'Desarrollo Frontend',
      icon: <Code className="w-6 h-6 text-accent" />,
      description: 'Construyo interfaces modernas, responsivas y accesibles',
      skills: [
        { name: 'React & Next.js', level: 95 },
        { name: 'JavaScript & TypeScript', level: 90 },
        { name: 'HTML/CSS & Tailwind', level: 90 }
      ]
    },
    {
      title: 'Diseño UI/UX',
      icon: <Palette className="w-6 h-6 text-accent" />,
      description: 'Creo interfaces intuitivas y atractivas para la experiencia',
      skills: [
        { name: 'Figma & Adobe XD', level: 78 },
        { name: 'Sistemas de Diseño', level: 67 },
        { name: 'Design Thinking', level: 78 }
      ]
    },
    {
        title: 'Desarrollo Backend',
        icon: <Globe className="w-6 h-6 text-accent" />,
        description: 'Construyo y mantengo servidores robustos y escalables',
        skills: [
            { name: 'Node.js & Express', level: 85 },
            { name: 'Bases de Datos (SQL & NoSQL)', level: 80 },
            { name: 'API REST & GraphQL', level: 75 }
        ]
    }
  ];

  interface SkillCategory {
    title: string;
    //@ts-expect-error: Avatar property is dynamically assigned and may not match strict type checks
    icon: JSX.Element;
    description: string;
    skills: { name: string; level: number }[];
  }

  const SkillCard = ({ category }: { category: SkillCategory }) => {
    return (
      <motion.div
        variants={itemVariants}
        className="relative border border-accent/10 rounded-md p-6 bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md shadow-md h-full overflow-hidden mx-auto"
      >
        <div className="absolute top-0 right-0 opacity-10 text-xl font-mono text-accent/20 overflow-hidden p-4 select-none">
          {Array(3).fill(category.title.toLowerCase().replace(/\s/g, "")).map((text, idx) => (
            <span key={idx} className="block whitespace-nowrap">{text}</span>
          ))}
        </div>
        
        <div className="mb-4 flex items-center">
          <div className="mr-4 bg-accent/10 p-3 rounded-md">
            {category.icon}
          </div>
          <h3 className="text-xl font-light text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {category.title}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-5 line-clamp-3">
          {category.description}
        </p>
        
        <div className="space-y-4 relative z-10">
          {category.skills.map((skill, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{skill.name}</span>
                <span className="text-accent">{skill.level}%</span>
              </div>
              <div className="w-full h-2 bg-accent/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                  className="h-full bg-accent rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
        
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent/5 blur-3xl rounded-full pointer-events-none"
        />
      </motion.div>
    );
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 relative bg-deluge-50 dark:bg-deluge-950"
    >
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-3xl rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 relative z-10"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">07</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Habilidades</span>
          </motion.div>
          
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          `}</style>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Mis <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>habilidades</span>
          </motion.h2>
          
          <motion.div variants={itemVariants} className="text-lg max-w-3xl mb-8">
            <p className="mb-4 text-muted-foreground">
              A lo largo de mi carrera, he desarrollado un conjunto diverso de habilidades que me permiten abordar 
              proyectos digitales de forma integral.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skillCategories.map((category, idx) => (
            <SkillCard key={idx} category={category} />
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto text-center"
        >
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground italic">
            Además de estas habilidades principales, continuamente exploro nuevas tecnologías y metodologías, 
            incluyendo desarrollo backend con Node.js y metodologías ágiles para 
            gestión de proyectos.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -bottom-10 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full pointer-events-none"
        />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute bottom-8 left-6 text-accent/50 text-xs"
        >
          <motion.span variants={itemVariants}>© 2025</motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;