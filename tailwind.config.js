/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sunny: { 50: '#FFFBEA', 100: '#FFF3C4', 200: '#FFE89A', 300: '#FFE17A', 400: '#FFD23F', 500: '#FFC21A', 600: '#E5A800', 700: '#B88400' },
        skyblue: { 50: '#EEF9FF', 100: '#D9F1FF', 200: '#B8E6FF', 300: '#8FD8FF', 400: '#5EC4FF', 500: '#34AFFF', 600: '#1C8FE0', 700: '#126BB0' },
        mint: { 50: '#EDFCF6', 100: '#D3F8EA', 200: '#B5F4DD', 300: '#9EF0D0', 400: '#6BE3B9', 500: '#3DD6A0', 600: '#22B583', 700: '#178A63' },
        coral: { 50: '#FFF1F1', 100: '#FFE0E0', 200: '#FFC9C9', 300: '#FFB3B3', 400: '#FF8A8A', 500: '#FF6B6B', 600: '#E84E5A', 700: '#C23A47' },
        grape: { 50: '#F5F0FF', 100: '#EBE1FF', 200: '#DACAFF', 300: '#CDB4FF', 400: '#B18CFF', 500: '#9B6BFF', 600: '#7C4DE8', 700: '#5E35BF', 900: '#2B1B5A' },
        night: { 600: '#3A3390', 700: '#2A2470', 800: '#1C1856', 900: '#120F3D', 950: '#0A0826' },
        cream: '#FFF8E7',
      },
      fontFamily: {
        display: ['"Rubik Bubbles"', 'Nunito', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        toy: '0 8px 0 0 rgba(45, 34, 80, 0.10), 0 20px 40px -12px rgba(45, 34, 80, 0.28)',
        'toy-lg': '0 12px 0 0 rgba(45, 34, 80, 0.12), 0 30px 60px -15px rgba(45, 34, 80, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%': { transform: 'translateY(-16px) rotate(3deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        jelly: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '30%': { transform: 'scale(1.12, 0.88)' },
          '50%': { transform: 'scale(0.92, 1.08)' },
          '70%': { transform: 'scale(1.04, 0.96)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.25', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        drift: {
          '0%': { transform: 'translateX(-30vw)' },
          '100%': { transform: 'translateX(130vw)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'translateY(16px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'shooting-star': {
          '0%': { transform: 'translate(0, 0) rotate(-35deg)', opacity: '0' },
          '5%': { opacity: '1' },
          '20%, 100%': { transform: 'translate(-60vw, 40vh) rotate(-35deg)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        wiggle: 'wiggle 0.6s ease-in-out infinite',
        jelly: 'jelly 0.7s ease-in-out',
        blob: 'blob 12s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.2, 0.6, 0.4, 1) infinite',
        drift: 'drift 80s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        'pop-in': 'pop-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'shooting-star': 'shooting-star 9s ease-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
