import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowRight, Check, Loader } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formState, setFormState] = useState<{
    isSubmitting: boolean;
    isSubmitted: boolean;
    error: string | null;
  }>({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ ...formState, isSubmitting: true });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Ha ocurrido un error. Por favor, intenta nuevamente.'
      });
    }
  };

  const linkHoverVariants = {
    rest: { x: 0 },
    hover: { 
      x: 5, 
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      } 
    }
  };

  const iconHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 10 
      } 
    }
  };

  const buttonHoverVariants = {
    rest: { 
      backgroundColor: "rgb(var(--accent))",
      boxShadow: "0 0 0 rgba(var(--accent), 0)"
    },
    hover: { 
      backgroundColor: "rgb(var(--accent))",
      boxShadow: "0 0 20px rgba(var(--accent), 0.5)",
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      } 
    }
  };

  const inputFocusVariants = {
    rest: { borderColor: "rgba(var(--accent), 0.2)" },
    focus: { 
      borderColor: "rgba(var(--accent), 0.8)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section 
      id="contact" 
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
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">04</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Contacto</span>
          </motion.div>
          
          <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          `}</style>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-light mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Conversemos sobre <span className="text-accent" style={{ fontFamily: "'Dancing Script', cursive" }}>tu proyecto</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Estoy aquí para transformar tus ideas en realidades digitales impactantes que conectan, inspiran y producen resultados.
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Info - Left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:w-1/3"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                boxShadow: "0 10px 30px -15px rgba(var(--accent), 0.3)",
                y: -5, 
                transition: { duration: 0.3 }
              }}
              className="border border-accent/10 rounded-md p-8 bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md relative overflow-hidden h-full transition-all duration-300"
            >
              <div className="absolute inset-0 flex flex-wrap content-center justify-center opacity-10 text-2xl font-mono text-accent/30 overflow-hidden p-4 select-none">
                {Array(8).fill("contact.me").map((text, idx) => (
                  <span key={idx} className="m-2 whitespace-nowrap">{text}</span>
                ))}
              </div>
              
              <div className="mb-8 relative z-10">
                <h3 className="text-xl font-mono mb-3 text-accent">
                  <motion.span 
                    initial={{ x: 0 }} 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="inline-block"
                  >
                    MAIL
                  </motion.span>
                </h3>
                <motion.a 
                  href="mailto:thriftytomas@gmail.com"
                  initial="rest"
                  whileHover="hover"
                  className="flex items-center text-lg group"
                >
                  <motion.div variants={iconHoverVariants}>
                    <Mail className="text-accent mr-3 w-5 h-5" />
                  </motion.div>
                  <motion.span 
                    variants={linkHoverVariants}
                    className="hover:underline hover:text-accent transition-colors duration-300"
                  >
                    thriftytomas@gmail.com
                  </motion.span>
                </motion.a>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-mono mb-3 text-accent">
                  <motion.span 
                    initial={{ x: 0 }} 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="inline-block"
                  >
                    SOCIAL MEDIAS
                  </motion.span>
                </h3>
                <div className="space-y-3">
                  <motion.a 
                    href="#linkedin" 
                    initial="rest"
                    whileHover="hover"
                    className="flex items-center text-lg group"
                  >
                    <motion.div variants={iconHoverVariants}>
                      <Linkedin className="text-accent mr-3 w-5 h-5" />
                    </motion.div>
                    <motion.span 
                      variants={linkHoverVariants}
                      className="hover:underline hover:text-accent transition-colors duration-300"
                    >
                      linkedin.com/in/tomasin
                    </motion.span>
                  </motion.a>
                  <motion.a 
                    href="#github" 
                    initial="rest"
                    whileHover="hover"
                    className="flex items-center text-lg group"
                  >
                    <motion.div variants={iconHoverVariants}>
                      <Github className="text-accent mr-3 w-5 h-5" />
                    </motion.div>
                    <motion.span 
                      variants={linkHoverVariants}
                      className="hover:underline hover:text-accent transition-colors duration-300"
                    >
                      github.com/tomasin
                    </motion.span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form - Right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:w-2/3"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                boxShadow: "0 10px 30px -15px rgba(var(--accent), 0.3)",
                y: -5, 
                transition: { duration: 0.3 }
              }}
              className="border border-accent/10 rounded-md p-8 bg-deluge-50/5 dark:bg-deluge-950/30 backdrop-blur-md relative overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 flex flex-wrap content-center justify-center opacity-10 text-2xl font-mono text-accent/30 overflow-hidden p-4 select-none">
                {Array(16).fill("message.tomasin").map((text, idx) => (
                  <span key={idx} className="m-2 whitespace-nowrap">{text}</span>
                ))}
              </div>
              
              <div className="relative z-10">
                {formState.isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: 1, 
                        transition: { 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 10,
                          delay: 0.2
                        } 
                      }}
                    >
                      <Check className="w-12 h-12 text-accent mb-4" />
                    </motion.div>
                    <h4 className="text-xl mb-2">¡Mensaje enviado con éxito!</h4>
                    <p className="text-muted-foreground">Gracias por contactarme. Me pondré en contacto contigo a la brevedad posible.</p>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <motion.div 
                      initial="rest"
                      whileHover="focus"
                      whileFocus="focus"
                      variants={inputFocusVariants}
                      className="border-b border-accent/20 pb-2 transition-colors duration-300"
                    >
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-transparent focus:outline-none"
                      />
                    </motion.div>
                    
                    <motion.div 
                      initial="rest"
                      whileHover="focus"
                      whileFocus="focus"
                      variants={inputFocusVariants}
                      className="border-b border-accent/20 pb-2 transition-colors duration-300"
                    >
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-transparent focus:outline-none"
                      />
                    </motion.div>
                    
                    <motion.div 
                      initial="rest"
                      whileHover="focus"
                      whileFocus="focus"
                      variants={inputFocusVariants}
                      className="border-b border-accent/20 pb-2 transition-colors duration-300"
                    >
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Mensaje"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-2 bg-transparent focus:outline-none resize-none"
                      />
                    </motion.div>
                    
                    {formState.error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {formState.error}
                      </motion.div>
                    )}
                    
                    <motion.button
                      initial="rest"
                      whileHover="hover"
                      variants={buttonHoverVariants}
                      type="submit"
                      disabled={formState.isSubmitting}
                      className="flex items-center px-6 py-3 bg-accent text-white transition-all duration-300 rounded group overflow-hidden relative"
                    >
                      {formState.isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader className="mr-2 h-4 w-4" />
                          </motion.div>
                          Enviando...
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10">Enviar mensaje</span>
                          <motion.div 
                            className="relative z-10 ml-2"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.div>
                          <motion.div 
                            initial={{ width: "0%" }}
                            whileHover={{ width: "110%" }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 left-0 h-full bg-accent/80"
                          />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;