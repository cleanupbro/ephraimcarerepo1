import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - Teal/Cyan Green (client request)
        primary: {
          50: '#E0F7F4',
          100: '#B3ECE4',
          200: '#80E0D0',
          300: '#4DD4BC',
          400: '#26CAAC',
          500: '#00BFA5',
          600: '#00A68E',
          700: '#008C78',
          800: '#007362',
          900: '#004D45',
          DEFAULT: '#00BFA5',
        },
        // Secondary - Green (from Ephraim Care logo)
        secondary: {
          50: '#F0F9F0',
          100: '#E1F3E1',
          200: '#C3E7C3',
          300: '#A5DBA5',
          400: '#87CF87',
          500: '#66BB6A',
          600: '#52A655',
          700: '#3D9140',
          800: '#297C2B',
          900: '#146716',
          DEFAULT: '#66BB6A',
        },
        // Accent - Orange (for decorative elements)
        accent: {
          50: '#FFF8F0',
          100: '#FFEED9',
          200: '#FFDDB3',
          300: '#FFCC8D',
          400: '#FFBB67',
          500: '#ED861E',
          600: '#D4741A',
          700: '#BB6216',
          800: '#A25012',
          900: '#893E0E',
          DEFAULT: '#ED861E',
        },
        // Cream background (In4Care style)
        cream: {
          50: '#FFFDFB',
          100: '#FDF8F2',
          200: '#FDF2E6',
          300: '#FAEBD7',
          400: '#F5DFC5',
          500: '#F0D3B3',
          DEFAULT: '#FDF2E6',
        },
        // Neutral grays
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        // Semantic colors
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        // Background
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        body: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        comfort: ['var(--font-atkinson)', 'Arial', 'Verdana', 'sans-serif'],
      },
      fontSize: {
        // In4Care typography scale
        'display': ['70px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['56px', { lineHeight: '1.15', fontWeight: '700' }],
        'h2': ['48px', { lineHeight: '1.2', fontWeight: '800' }],
        'h3': ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        'h4': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'h5': ['20px', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '48px',
        'pill': '9999px',
        'wave': '350px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 14px 0 rgba(0, 191, 165, 0.39)',
      },
    },
  },
  plugins: [],
};
export default config;
