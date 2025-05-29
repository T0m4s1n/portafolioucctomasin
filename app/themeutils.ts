import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export class ThemeManager {
  private static STORAGE_KEY = 'portfolio-theme-preference';

  static getTheme(): Theme {
    if (typeof window === 'undefined') return 'dark';

    const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    
    if (savedTheme) {
      return savedTheme;
    }
    
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  }

  static setTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, theme);

    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }));
  }

  static toggleTheme(): Theme {
    const currentTheme = this.getTheme();
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }

  static initTheme(): (() => void) | void {
    if (typeof window === 'undefined') return;
    
    const theme = this.getTheme();
    this.setTheme(theme);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const cleanup = ThemeManager.initTheme();
    return cleanup instanceof Function ? cleanup : undefined;

    const initialTheme = ThemeManager.getTheme();
    setTheme(initialTheme);
 
    const handleThemeChange = (e: CustomEvent<{ theme: Theme }>) => {
      setTheme(e.detail.theme);
    };
    
    window.addEventListener('theme-change', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = ThemeManager.toggleTheme();
    setTheme(newTheme);
  }, []);

  return { theme, toggleTheme };
}