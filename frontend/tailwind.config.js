// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                blob1: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '50%': { transform: 'translate(50px, -20px) scale(1.05)' },
                },
                blob2: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '50%': { transform: 'translate(-30px, 40px) scale(1.1)' },
                },
                blob3: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '50%': { transform: 'translate(20px, 30px) scale(1.08)' },
                },
            },
            animation: {
                blob1: 'blob1 5s ease-in-out infinite',
                blob2: 'blob2 8s ease-in-out infinite',
                blob3: 'blob3 10s ease-in-out infinite',
            },
        },
    },
    plugins: [],
};
