// @ts-ignore
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                primary: "rgba(var(--color-primary))",
                background: "rgba(var(--color-background) / <alpha>)",
                text: "rgba(var(--color-text) / <alpha>)",
                subText: "rgba(var(--color-subText) / <alpha>)",
            },
        },
    },
};

