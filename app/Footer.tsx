import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, Code, Heart } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const linkHoverVariants = {
    rest: { x: 0 },
    hover: { 
      x: 3, 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  const iconHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.2,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 10 
      } 
    }
  };

  return (
    <footer className="bg-deluge-100 dark:bg-deluge-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-deluge-300 dark:bg-deluge-700 opacity-10 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-deluge-300 dark:bg-deluge-700 opacity-10 blur-3xl rounded-full translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-deluge-200 dark:bg-deluge-800 p-3 rounded-full text-deluge-600 dark:text-deluge-400 shadow-lg hover:shadow-xl transition-all duration-300 group border border-deluge-300 dark:border-deluge-700"
          >
            <ArrowUp className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
          </motion.button>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="container mx-auto px-4 md:px-8 py-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Logo & brief */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="mb-4">
              <h2 className="text-2xl font-light">
                <span className="text-deluge-600 dark:text-deluge-400">Tomasin</span>
                <span className="text-deluge-500 dark:text-deluge-500">Dev</span>
              </h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Desarrollador frontend apasionado por crear experiencias digitales impactantes y funcionales.
            </p>
            
            <div className="flex space-x-3 mt-4">
              <motion.a
                href="mailto:thriftytomas@gmail.com"
                initial="rest"
                whileHover="hover"
                className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full text-deluge-600 dark:text-deluge-400 hover:shadow-md transition-all duration-300"
              >
                <motion.div variants={iconHoverVariants}>
                  <Mail className="w-4 h-4" />
                </motion.div>
              </motion.a>
              <motion.a
                href="#github"
                initial="rest"
                whileHover="hover"
                className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full text-deluge-600 dark:text-deluge-400 hover:shadow-md transition-all duration-300"
              >
                <motion.div variants={iconHoverVariants}>
                  <Github className="w-4 h-4" />
                </motion.div>
              </motion.a>
              <motion.a
                href="#linkedin"
                initial="rest"
                whileHover="hover"
                className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full text-deluge-600 dark:text-deluge-400 hover:shadow-md transition-all duration-300"
              >
                <motion.div variants={iconHoverVariants}>
                  <Linkedin className="w-4 h-4" />
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4 text-deluge-600 dark:text-deluge-400">Navegación</h3>
            <ul className="space-y-2">
              {['Inicio', 'Acerca de', 'Habilidades', 'Proyectos', 'Contacto'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    initial="rest"
                    whileHover="hover"
                    className="text-sm hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300 flex items-center"
                  >
                    <motion.span variants={linkHoverVariants} className="inline-block">
                      {item}
                    </motion.span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Services */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4 text-deluge-600 dark:text-deluge-400">Servicios</h3>
            <ul className="space-y-2">
              {['Diseño Web', 'Desarrollo Frontend', 'Desarrollo Backend', 'Aplicaciones React', 'Sitios Responsivos'].map((item) => (
                <li key={item}>
                  <motion.span
                    initial="rest"
                    whileHover="hover"
                    className="text-sm hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300 flex items-center"
                  >
                    <motion.span variants={linkHoverVariants} className="inline-block">
                      {item}
                    </motion.span>
                  </motion.span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4 text-deluge-600 dark:text-deluge-400">Contacto</h3>
            <div className="space-y-4 text-sm">
              <p>Pasto, Nariño</p>
              <p>
                <a href="mailto:thriftytomas@gmail.com" className="hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300">
                  thriftytomas@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+56912345678" className="hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300">
                  +57 310-6406198
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="border-t border-deluge-200 dark:border-deluge-800 relative z-10">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <div className="mb-4 md:mb-0">
              © {currentYear} Tomasin. Todos los derechos reservados.
            </div>
            <div className="flex items-center">
              <span className="flex items-center">
                Hecho con <Heart className="w-3 h-3 mx-1 text-red-500" /> y <Code className="w-3 h-3 mx-1 text-deluge-500" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;