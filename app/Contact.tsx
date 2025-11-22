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
    setFormState({ ...formState, isSubmitting: true, error: null });
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'Ha ocurrido un error. Por favor, intenta nuevamente.'
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
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      scale: 1
    },
    hover: { 
      boxShadow: "0 8px 20px rgba(147, 51, 234, 0.4), 0 0 0 1px rgba(147, 51, 234, 0.1)",
      scale: 1.02,
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      } 
    }
  };

  const inputFocusVariants = {
    rest: { borderColor: "rgba(var(--deluge), 0.2)" },
    focus: { 
      borderColor: "rgba(var(--deluge), 0.8)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-24 bg-deluge-100 dark:bg-deluge-975 relative"
    >
      <section className="absolute inset-0 opacity-5 dark:opacity-10 bg-grid-pattern pointer-events-none" />
      <section className="absolute top-0 right-0 w-1/2 h-1/2 bg-deluge-300 dark:bg-deluge-700 opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <section className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-deluge-300 dark:bg-deluge-700 opacity-10 blur-3xl rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      
      <section className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16"
        >
          <motion.section variants={itemVariants} className="flex items-center mb-6">
            <span className="text-sm text-accent opacity-80 mr-2">05</span>
            <span className="text-sm text-accent mr-2">{'//'}</span>
            <span className="text-sm text-accent font-light">Contacto</span>
          </motion.section>
          
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
        </motion.section>
        
        <section className="flex flex-col md:flex-row gap-8">
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:w-1/3"
          >
            <motion.section
              variants={itemVariants}
              className="border border-deluge-300 dark:border-deluge-700 rounded-lg p-8 bg-deluge-50/50 dark:bg-deluge-900/50 backdrop-blur-md relative overflow-hidden h-full shadow-lg"
            >
              
              <section className="mb-10 relative z-10">
                <h3 className="text-xl font-mono mb-4 text-deluge-600 dark:text-deluge-400">
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
                  <motion.section 
                    variants={iconHoverVariants}
                    className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full"
                  >
                    <Mail className="text-deluge-600 dark:text-deluge-400 mr-0 w-5 h-5" />
                  </motion.section>
                  <motion.span 
                    variants={linkHoverVariants}
                    className="ml-4 hover:underline hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300"
                  >
                    thriftytomas@gmail.com
                  </motion.span>
                </motion.a>
              </section>
              
              <section className="relative z-10">
                <h3 className="text-xl font-mono mb-4 text-deluge-600 dark:text-deluge-400">
                  <motion.span 
                    initial={{ x: 0 }} 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="inline-block"
                  >
                    SOCIAL MEDIAS
                  </motion.span>
                </h3>
                <section className="space-y-4">
                  <motion.a 
                    href="#linkedin" 
                    initial="rest"
                    whileHover="hover"
                    className="flex items-center text-lg group"
                  >
                    <motion.section 
                      variants={iconHoverVariants}
                      className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full"
                    >
                      <Linkedin className="text-deluge-600 dark:text-deluge-400 mr-0 w-5 h-5" />
                    </motion.section>
                    <motion.span 
                      variants={linkHoverVariants}
                      className="ml-4 hover:underline hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300"
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
                    <motion.section 
                      variants={iconHoverVariants}
                      className="bg-deluge-200 dark:bg-deluge-800 p-2 rounded-full"
                    >
                      <Github className="text-deluge-600 dark:text-deluge-400 mr-0 w-5 h-5" />
                    </motion.section>
                    <motion.span 
                      variants={linkHoverVariants}
                      className="ml-4 hover:underline hover:text-deluge-600 dark:hover:text-deluge-400 transition-colors duration-300"
                    >
                      github.com/tomasin
                    </motion.span>
                  </motion.a>
                </section>
              </section>
              
              <motion.section
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-deluge-300 dark:bg-deluge-700 opacity-20 blur-xl rounded-full pointer-events-none"
              />
            </motion.section>
          </motion.section>
          
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="md:w-2/3"
          >
            <motion.section
              variants={itemVariants}
              className="border border-deluge-300 dark:border-deluge-700 rounded-lg p-8 md:p-10 bg-deluge-50/50 dark:bg-deluge-900/50 backdrop-blur-md relative overflow-hidden shadow-lg"
            >
              
              <section className="relative z-10">
                {formState.isSubmitted ? (
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 text-center"
                  >
                    <motion.section
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
                      className="flex justify-center"
                    >
                      <section className="bg-deluge-200 dark:bg-deluge-800 p-4 rounded-full">
                        <Check className="w-12 h-12 text-deluge-600 dark:text-deluge-400" />
                      </section>
                    </motion.section>
                    <h4 className="text-2xl mt-6 mb-3">¡Mensaje enviado con éxito!</h4>
                    <p className="text-muted-foreground">Gracias por contactarme. Me pondré en contacto contigo a la brevedad posible.</p>
                  </motion.section>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <motion.section 
                      initial="rest"
                      whileHover="focus"
                      whileFocus="focus"
                      variants={inputFocusVariants}
                      className="border-b-2 border-deluge-300 dark:border-deluge-700 pb-2 transition-colors duration-300 group"
                    >
                      <label htmlFor="name" className="text-xs font-medium text-deluge-600 dark:text-deluge-400 block mb-1">Nombre</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-transparent focus:outline-none text-lg placeholder:text-muted-foreground/50"
                      />
                    </motion.section>
                    
                    <motion.section 
                      initial="rest"
                      whileHover="focus"
                      whileFocus="focus"
                      variants={inputFocusVariants}
                      className="border-b-2 border-deluge-300 dark:border-deluge-700 pb-2 transition-colors duration-300"
                    >
                      <label htmlFor="email" className="text-xs font-medium text-deluge-600 dark:text-deluge-400 block mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-transparent focus:outline-none text-lg placeholder:text-muted-foreground/50"
                      />
                    </motion.section>
                    
                    <motion.section 
                      initial="rest"
                      whileHover="focus"
                      whileFocus="focus"
                      variants={inputFocusVariants}
                      className="border-b-2 border-deluge-300 dark:border-deluge-700 pb-2 transition-colors duration-300"
                    >
                      <label htmlFor="message" className="text-xs font-medium text-deluge-600 dark:text-deluge-400 block mb-1">Mensaje</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Cuéntame sobre tu proyecto..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full p-2 bg-transparent focus:outline-none text-lg placeholder:text-muted-foreground/50 resize-none"
                      />
                    </motion.section>
                    
                    {formState.error && (
                      <motion.section 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {formState.error}
                      </motion.section>
                    )}
                    
                    <motion.button
                      initial="rest"
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                      variants={buttonHoverVariants}
                      type="submit"
                      disabled={formState.isSubmitting}
                      className="flex items-center justify-center gap-2 px-8 py-4 text-white transition-all duration-300 rounded-lg group overflow-hidden relative shadow-lg border-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'var(--purple-600)',
                        borderColor: 'var(--purple-500)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--purple-700)';
                        e.currentTarget.style.borderColor = 'var(--purple-400)';
                      }}
                      onMouseLeave={(e) => {
                        if (!formState.isSubmitting) {
                          e.currentTarget.style.backgroundColor = 'var(--purple-600)';
                          e.currentTarget.style.borderColor = 'var(--purple-500)';
                        }
                      }}
                    >
                      {formState.isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.section
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader className="h-4 w-4" />
                          </motion.section>
                          Enviando...
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10">Enviar mensaje</span>
                          <motion.section 
                            className="relative z-10"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.section>
                          <motion.section 
                            initial={{ width: "0%" }}
                            whileHover={{ width: "110%" }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-0 left-0 h-full opacity-90"
                            style={{ backgroundColor: 'var(--purple-700)' }}
                          />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </section>
              <motion.section
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-16 -right-16 w-48 h-48 bg-deluge-300 dark:bg-deluge-700 opacity-20 blur-xl rounded-full pointer-events-none"
              />
            </motion.section>
          </motion.section>
        </section>
      </section>
    </section>
  );
};

export default ContactSection;