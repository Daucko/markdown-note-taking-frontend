/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // blue-600
        'primary-foreground': '#FFFFFF', // white
        
        // Secondary Colors
        'secondary': '#64748B', // slate-500
        'secondary-foreground': '#FFFFFF', // white
        
        // Accent Colors
        'accent': '#F59E0B', // amber-500
        'accent-foreground': '#FFFFFF', // white
        
        // Background Colors
        'background': '#FAFAFA', // gray-50
        'surface': '#FFFFFF', // white
        
        // Text Colors
        'text-primary': '#1E293B', // slate-800
        'text-secondary': '#64748B', // slate-500
        
        // Status Colors
        'success': '#059669', // emerald-600
        'success-foreground': '#FFFFFF', // white
        'warning': '#D97706', // amber-600
        'warning-foreground': '#FFFFFF', // white
        'error': '#DC2626', // red-600
        'error-foreground': '#FFFFFF', // white
        
        // Border Colors
        'border': '#E2E8F0', // slate-200
        'border-light': '#F1F5F9', // slate-100
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'data': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontWeight: {
        'heading-normal': '400',
        'heading-medium': '500',
        'heading-semibold': '600',
        'body-normal': '400',
        'body-medium': '500',
        'caption-normal': '400',
        'data-normal': '400',
      },
      borderRadius: {
        'DEFAULT': '6px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hover': '0 4px 8px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
      },
      transitionTimingFunction: {
        'ease-out': 'ease-out',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        'navigation': '1000',
        'header': '1001',
        'fab': '999',
        'modal': '2000',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 150ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}