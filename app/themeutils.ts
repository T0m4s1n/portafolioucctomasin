// themeutils.ts
import React from 'react';

type Theme = 'light' | 'dark';

// Clase para manejar el tema de la aplicación
export class ThemeManager {
  // Clave para almacenar la preferencia de tema en localStorage
  private static STORAGE_KEY = 'portfolio-theme-preference';

  // Obtener el tema actual
  static getTheme(): Theme {
    // Verificar localStorage primero
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
      if (savedTheme) {
        return savedTheme;
      }
      
      // Si no hay preferencia guardada, usar la preferencia del sistema
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    // Por defecto, usar tema oscuro
    return 'dark';
  }

  // Establecer el tema
  static setTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;
    
    // Guardar en localStorage
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    // Aplicar al DOM
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    // Disparar evento personalizado para que otros componentes puedan reaccionar
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
  }

  // Alternar entre temas
  static toggleTheme(): Theme {
    const currentTheme = this.getTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }

  // Inicializar el tema en la carga de la aplicación
  static initTheme(): void {
    if (typeof window === 'undefined') return;
    
    const theme = this.getTheme();
    this.setTheme(theme);
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}

// Hook personalizado para usar el tema en componentes React
export function useTheme() {
  const [theme, setThemeState] = React.useState<Theme>(() => 
    typeof window !== 'undefined' ? ThemeManager.getTheme() : 'dark'
  );

  React.useEffect(() => {
    // Inicializar tema
    ThemeManager.initTheme();
    setThemeState(ThemeManager.getTheme());
    
    // Escuchar cambios de tema
    const handleThemeChange = (e: CustomEvent<{ theme: Theme }>) => {
      setThemeState(e.detail.theme);
    };
    
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);

  const toggleTheme = React.useCallback(() => {
    ThemeManager.toggleTheme();
  }, []);

  return { theme, toggleTheme };
}