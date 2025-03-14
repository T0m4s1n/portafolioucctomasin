module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        wine: {
          700: 'var(--accent)',
          800: 'var(--accent-dark)',
          600: 'var(--accent-light)',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'Helvetica', 'sans-serif'],
        geist: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      backgroundColor: {
        'gray-100': 'rgba(0, 0, 0, 0.05)',
        'wine-700': 'var(--accent)',
      },
      textColor: {
        'wine-700': 'var(--accent)',
        'wine-800': 'var(--accent-dark)',
      },
    },
  },
  plugins: [],
  darkMode: 'media',
}