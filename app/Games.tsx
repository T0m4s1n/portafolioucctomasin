import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, Trophy,
  Clock,
  ChevronDown, Heart,
  Medal, Target
} from 'lucide-react';

const GamesSection = () => {
  const sectionRef = useRef(null);
  useInView(sectionRef, { once: true, amount: 0.2 });
  const [expandedGame, setExpandedGame] = useState<number | null>(null);
  const [hoveredGame, setHoveredGame] = useState<number | null>(null);

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

  const games = [
    {
      id: "sekiro",
      title: "Sekiro",
      icon: <Gamepad2 className="w-6 h-6 text-accent" />,
      description: "Juego de acción y aventura donde la precisión es clave para derrotar a enemigos con el sistema de combate de Parrys",
      level: 5,
      accentColor: "var(--accent)",
      details: [
        { title: "Completado en", details: "60h" },
        { title: "Practicado para", details: "Speedrun" },
        { title: "Boss favorito", details: "La Monja" }
      ],
      timeInvested: "105 horas",
      achievements: "Platinado"
    },
    {
      id: "minecraft",
      title: "Minecraft",
      icon: <Gamepad2 className="w-6 h-6 text-accent" />,
      description: "Mundo sandbox donde construyo estructuras complejas y exploro generación procedural.",
      level: 4,
      accentColor: "var(--accent)",
      details: [
        { title: "Modo preferido", details: "Supervivencia" },
        { title: "Construcción notable", details: "Base Medieval" },
        { title: "Mods favoritos", details: "JCraft, DBC" }
      ],
      timeInvested: "2300 horas",
      achievements: "Top 100 en servidor de PvP de 1.8 en bedwars"
    },
    {
      id: "eldenring",
      title: "Elden Ring",
      icon: <Gamepad2 className="w-6 h-6 text-accent" />,
      description: "RPG de mundo abierto que me desafía con combates intensos y exploración atmosférica.",
      level: 3,
      accentColor: "var(--accent)",
      details: [
        { title: "Clase", details: "Samurai" },
        { title: "Área favorita", details: "Caelid" },
        { title: "Jefe más difícil", details: "Mogh" }
      ],
      timeInvested: "568 horas",
      achievements: "Platinado al 100% con todos los finales"
    },
    {
      id: "fallout",
      title: "Fallout New Vegas",
      icon: <Target className="w-6 h-6 text-accent" />,
      description: "Juego de rol post-apocalíptico donde tomo decisiones que afectan el mundo y la historia.",
      level: 4,
      accentColor: "var(--accent)",
      details: [
        { title: "Run favorita", details: "RNC" },
        { title: "Arma favorita", details: "Fat boy" },
        { title: "Companion favorito", details: "Lili" }
      ],
      timeInvested: "567 horas",
      achievements: "Completado todas las misiones secundarias"
    },
    {
      id: "reddead",
      title: "Red dead Redemption 2",
      icon: <Heart className="w-6 h-6 text-accent" />,
      description: "Juego de mundo abierto donde la narrativa y la exploración son clave para disfrutar de la historia.",
      level: 3,
      accentColor: "var(--accent)",
      details: [
        { title: "Estilo de juego", details: "Good Karma" },
        { title: "Caballo favorito", details: "Buell" },
        { title: "Arma favorita", details: "LeMat Revolver" }
      ],
      timeInvested: "390 horas",
      achievements: "Completado todas las misiones secundarias"
    },
    {
      id: "darksouls",
      title: "Dark Souls 3",
      icon: <Medal className="w-6 h-6 text-accent" />,
      description: "Juego de rol de acción donde la dificultad y la exploración son clave para disfrutar de la historia.",
      level: 4,
      accentColor: "var(--accent)",
      details: [
        { title: "Rol principal", details: "Caballero" },
        { title: "Run favorita", details: "La usurpacion del fuego" },
        { title: "Arma favorita", details: "Coiled Sword" }
      ],
      timeInvested: "102 horas",
      achievements: "Practicando para speedrun"
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedGame(expandedGame === index ? null : index);
  };

  return (
    <section 
      id="games" 
      ref={sectionRef}
      className="py-24 bg-deluge-50 dark:bg-deluge-950"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16 relative z-10"
        >
          
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          `}</style>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Mis <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>videojuegos</span>
          </motion.h2>
          
          <motion.div variants={itemVariants} className="text-lg max-w-3xl mx-auto mb-8">
            <p className="mb-4 text-muted-foreground">
              El gaming es más que un pasatiempo para mí; es una <span className="text-accent">forma de arte interactiva</span> que 
              me permite sumergirme en narrativas inmersivas y desafíos estratégicos.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* Card container */}
              <div 
                className={`
                  bg-deluge-50/5 dark:bg-deluge-950/30 
                  backdrop-blur-md rounded-2xl shadow-md 
                  border transition-all duration-200
                  ${hoveredGame === index && expandedGame !== index 
                    ? "border-accent" 
                    : "border-accent/20"}
                  ${hoveredGame === index && expandedGame !== index 
                    ? "shadow-lg shadow-accent/20" 
                    : ""}
                  overflow-hidden
                `}
                onMouseEnter={() => setHoveredGame(index)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                {/* Card Header - Always Visible */}
                <div 
                  className="p-5 cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-xl bg-accent/10 mr-3">
                        {game.icon}
                      </div>
                      <h3 className="text-xl font-medium text-accent">{game.title}</h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: expandedGame === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-accent/10 p-1 rounded-full"
                    >
                      <ChevronDown className="w-4 h-4 text-accent" />
                    </motion.div>
                  </div>
                  
                  {/* Game level indicator */}
                  <div className="flex items-center mt-3">
                    <div className="flex mr-3">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-full mx-0.5 ${
                            i < game.level 
                              ? "bg-accent" 
                              : "bg-accent/20"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="ml-auto inline-flex items-center bg-accent/10 px-2 py-1 rounded-full text-xs">
                      <Clock className="w-3 h-3 mr-1 text-accent" />
                      <span>{game.timeInvested}</span>
                    </div>
                  </div>
                </div>
                
                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedGame === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5"
                    >
                      <div className="h-px w-full bg-accent/10 mb-4"></div>
                      
                      <p className="text-muted-foreground text-sm mb-4">
                        {game.description}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-2 mb-4">
                        {game.details.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.05 + idx * 0.05 }}
                            className="bg-deluge-50/10 dark:bg-deluge-950/40 border border-accent/10 rounded-lg p-3 flex justify-between"
                          >
                            <h5 className="font-medium text-xs">{item.title}</h5>
                            <p className="text-xs text-muted-foreground">{item.details}</p>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-sm bg-accent/10 p-3 rounded-lg">
                        <Trophy className="w-4 h-4 text-accent mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{game.achievements}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Always show description for non-expanded cards */}
                {expandedGame !== index && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground text-sm">
                      {game.description}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;