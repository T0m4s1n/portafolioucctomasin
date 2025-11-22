import React from 'react';

const PortfolioHomeSection = () => {

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen md:min-h-screen pt-20 md:pt-0 relative flex flex-col justify-center bg-deluge-100 dark:bg-deluge-975">
        <section className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
        <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <h1 className="text-[20vw] font-bold text-stroke text-transparent opacity-5 whitespace-nowrap tracking-tighter"
            style={{ 
            WebkitTextStroke: '2px var(--accent)'
            }}>
            TOMASIN
          </h1>
        </section>
      
      <section className="container mx-auto px-8 relative z-10">
        <section className="flex flex-col md:flex-row items-center justify-between gap-8">
          <section className="max-w-3xl flex-1">
            <section className="flex items-center mb-6">
              <span className="text-sm text-accent opacity-80 mr-2">01</span>
              <span className="text-sm text-accent mr-2">{'//'}</span>
              <span className="text-sm text-accent font-light">introduccion</span>
            </section>
            
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-light mb-6">
            Me llamo <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>Tomasin</span><br />
            <span> y soy un </span> <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>software developer</span>
          </h1>
                      
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Desarrollador frontend y diseñador especializado en crear aplicaciones web elegantes, funcionales y accesibles con un enfoque en movimiento y experiencia de usuario.
            </p>
            
            <section className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
              >
                Contactarme
              </button>
              
              <button
                onClick={() => scrollToSection('work')}
                className="px-6 py-3 border border-accent/30 text-accent rounded-lg hover:bg-accent/10 transition-colors"
              >
                Ver proyectos
              </button>
            </section>
          </section>
          
          <section className="flex-shrink-0 flex flex-col items-center justify-center md:mx-auto md:pr-16">
            <section 
              className="border border-accent/10 rounded-md p-2 bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md overflow-hidden shadow-md relative"
              style={{ maxWidth: "350px" }}
            >
              <img 
                src="./ar2.jpg" 
                alt="Profile photo" 
                className="w-full h-auto object-cover rounded-sm"
              />
              <section className="absolute inset-0 border border-accent/20 rounded-sm pointer-events-none" />
            </section>
          </section>
        </section>
      </section>
      
      <section className="absolute bottom-12 left-8 md:bottom-16 md:left-16">
        <section className="flex gap-6">
          <a
            href="https://github.com/T0m4s1n"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/tomas-benavides-calderon-81936632b/"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </section>
      </section>
      
      <section className="absolute bottom-8 right-8 md:bottom-16 md:right-16 flex flex-col items-center">
        <span className="text-xs text-muted-foreground mb-2 rotate-90 origin-bottom-right">scrollea</span>
        <section className="w-px h-16 bg-accent/30" />
      </section>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Playwrite+HU:wght@100..400&display=swap');
      `}</style>
    </section>
  );
};

export default PortfolioHomeSection;