/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        light: {
          bg: 'var(--color-bg-light)',
          bgSecondary: 'var(--color-bg-secondary-light)',
          textPrimary: 'var(--color-text-primary-light)',
          textSecondary: 'var(--color-text-secondary-light)',
          border: 'var(--color-border-light)',
          buttonBgPrimary: 'var(--color-button-bg-primary-light)',
          buttonTextPrimary: 'var(--color-button-text-primary-light)',
          buttonHoverBg: 'var(--color-button-hover-bg-light)',
          primary: 'var(--color-primary-light)',
          accent: 'var(--color-accent-light)',
          success: 'var(--color-success-light)',
          error: 'var(--color-error-light)',
          link: 'var(--color-link-light)',
        },
        // Dark Mode Colors
        dark: {
          bg: 'var(--color-bg-dark)',
          bgSecondary: 'var(--color-bg-secondary-dark)',
          textPrimary: 'var(--color-text-primary-dark)',
          textSecondary: 'var(--color-text-secondary-dark)',
          border: 'var(--color-border-dark)',
          buttonBgPrimary: 'var(--color-button-bg-primary-dark)',
          buttonTextPrimary: 'var(--color-button-text-primary-dark)',
          buttonHoverBg: 'var(--color-button-hover-bg-dark)',
          primary: 'var(--color-primary-dark)',
          accent: 'var(--color-accent-dark)',
          success: 'var(--color-success-dark)',
          error: 'var(--color-error-dark)',
          link: 'var(--color-link-dark)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.5s ease-out',
        slideInRight: 'slideInRight 0.5s ease-out',
        pulse: 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
};