import React, { useState } from 'react';
import { Github, Linkedin, Mail, ArrowUp, Code, Heart } from 'lucide-react';

interface FooterProps {
  onSectionChange?: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onSectionChange }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavigate = (sectionId: string) => {
    if (onSectionChange && typeof onSectionChange === 'function') {
      onSectionChange(sectionId);
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const navigationSections = [
    { id: 'home', name: 'Inicio' },
    { id: 'work', name: 'Proyectos' },
    { id: 'expertise', name: 'Especialidades' },
    { id: 'experience', name: 'Experiencia' },
    { id: 'contact', name: 'Contacto' }
  ];
  const personalSections = [
    { id: 'about', name: 'Sobre Mí' },
    { id: 'skills', name: 'Habilidades' },
    { id: 'education', name: 'Educación' },
    { id: 'hobbies', name: 'Pasatiempos' },
    { id: 'recomendations', name: 'Recomendaciones' }
  ];

  return (
    <footer className="bg-deluge-100 dark:bg-deluge-950 relative overflow-hidden">
      <section className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      <section className="absolute top-0 left-0 w-1/3 h-1/3 bg-deluge-300 dark:bg-deluge-700 opacity-10 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <section className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-deluge-300 dark:bg-deluge-700 opacity-10 blur-3xl rounded-full translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <section className="relative z-10">
        <section className="container mx-auto px-4 py-4 flex justify-center">
          <button
            onClick={scrollToTop}
            className="bg-deluge-200 dark:bg-deluge-800 p-3 rounded-full text-deluge-600 dark:text-deluge-400 shadow-lg hover:shadow-xl transition-all duration-300 group border border-deluge-300 dark:border-deluge-700 hover:-translate-y-2 hover:bg-deluge-300 dark:hover:bg-deluge-700"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:text-deluge-800 dark:group-hover:text-deluge-200" />
          </button>
        </section>
      </section>
      
      <section className="container mx-auto px-4 md:px-8 py-12 relative z-10">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <section className="md:col-span-1">
            <section className="mb-4">
              <h2 className="text-2xl font-light">
                <span className="text-deluge-600 dark:text-deluge-400">Tomasin</span>
                <span className="text-deluge-500 dark:text-deluge-500">Dev</span>
              </h2>
            </section>
            <p className="text-sm text-muted-foreground mb-4">
              Desarrollador frontend apasionado por crear experiencias digitales impactantes y funcionales.
            </p>
            
            <section className="flex space-x-3 mt-4">
              <a
                href="mailto:thriftytomas@gmail.com"
                className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full text-deluge-600 dark:text-deluge-400 hover:shadow-lg transition-all duration-300 hover:scale-115 hover:bg-deluge-300 dark:hover:bg-deluge-700 hover:text-deluge-800 dark:hover:text-deluge-200 hover:rotate-6"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 transition-all" />
              </a>
              <a
                href="https://github.com/T0m4s1n"
                className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full text-deluge-600 dark:text-deluge-400 hover:shadow-lg transition-all duration-300 hover:scale-115 hover:bg-deluge-300 dark:hover:bg-deluge-700 hover:text-deluge-800 dark:hover:text-deluge-200 hover:rotate-6"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 transition-all" />
              </a>
              <a
                href="https://www.linkedin.com/in/tomas-benavides-calderon-81936632b/"
                className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full text-deluge-600 dark:text-deluge-400 hover:shadow-lg transition-all duration-300 hover:scale-115 hover:bg-deluge-300 dark:hover:bg-deluge-700 hover:text-deluge-800 dark:hover:text-deluge-200 hover:rotate-6"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 transition-all" />
              </a>
            </section>
          </section>
          
          <section className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4 text-deluge-600 dark:text-deluge-400">Navegación</h3>
            <ul className="space-y-2">
              {navigationSections.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    onMouseEnter={() => setHoveredItem(`nav-${item.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="text-sm hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300 flex items-center group relative px-2 py-1 rounded-md hover:bg-deluge-200/50 dark:hover:bg-deluge-800/50 w-full text-left"
                  >
                    <span className={`inline-block transition-all duration-300 ${hoveredItem === `nav-${item.id}` ? 'translate-x-2 font-medium' : ''}`}>
                      {item.name}
                    </span>
                    <span 
                      className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-0 bg-deluge-500 transition-all duration-300 rounded-full opacity-0 ${
                        hoveredItem === `nav-${item.id}` ? 'h-3/4 opacity-100' : ''
                      }`} 
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>
          
          <section className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4 text-deluge-600 dark:text-deluge-400">Secciones Personales</h3>
            <ul className="space-y-2">
              {personalSections.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item.id)}
                    onMouseEnter={() => setHoveredItem(`personal-${item.id}`)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="text-sm hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300 flex items-center group relative px-2 py-1 rounded-md hover:bg-deluge-200/50 dark:hover:bg-deluge-800/50 w-full text-left"
                  >
                    <span className={`inline-block transition-all duration-300 ${hoveredItem === `personal-${item.id}` ? 'translate-x-2 font-medium' : ''}`}>
                      {item.name}
                    </span>
                    <span 
                      className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-0 bg-deluge-500 transition-all duration-300 rounded-full opacity-0 ${
                        hoveredItem === `personal-${item.id}` ? 'h-3/4 opacity-100' : ''
                      }`} 
                    />
                  </button>
                </li>
              ))}
            </ul>
          </section>
          
          <section className="md:col-span-1">
            <h3 className="text-lg font-medium mb-4 text-deluge-600 dark:text-deluge-400">Contacto</h3>
            <section className="space-y-4 text-sm">
              <p>Pasto, Nariño</p>
              <p>
                <a 
                  href="mailto:thriftytomas@gmail.com" 
                  className="hover:text-deluge-600 dark:hover:text-deluge-400 transition-all duration-300 group relative inline-block"
                >
                  thriftytomas@gmail.com
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-deluge-500 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              </p>
              <p>
                <a 
                  href="tel:+573106406198" 
                  className="hover:text-deluge-600 dark:hover:text-deluge-400 transition-all duration-300 group relative inline-block"
                >
                  +57 310-6406198
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-deluge-500 transition-all duration-300 group-hover:w-full rounded-full" />
                </a>
              </p>
            </section>
          </section>
        </section>
      </section>
      
      <section className="border-t border-deluge-200 dark:border-deluge-800 relative z-10">
        <section className="container mx-auto px-4 md:px-8 py-4">
          <section className="flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <section className="mb-4 md:mb-0">
              © {currentYear} Tomasin. Todos los derechos reservados.
            </section>
            <section className="flex items-center">
              <span className="flex items-center">
                Hecho con 
                <Heart className="w-3 h-3 mx-1 text-red-500 hover:scale-150 transition-all duration-300 hover:rotate-12 cursor-pointer" /> 
                y 
                <Code className="w-3 h-3 mx-1 text-deluge-500 hover:scale-150 transition-all duration-300 hover:rotate-12 cursor-pointer" />
              </span>
            </section>
          </section>
        </section>
      </section>
    </footer>
  );
};

export default Footer;