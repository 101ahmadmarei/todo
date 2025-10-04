// @ts-ignore
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,tsx,ts}'],
    theme: {
        extend: {
            fontFamily: {
                janna: ['"Janna LT"'],
            },
            colors: {
                primary: "hsl(var(--primary))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                subtext: "var(--subtext)",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
            },
        },
    },
    plugins: [],
};
