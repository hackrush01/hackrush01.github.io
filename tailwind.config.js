/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html", "./*.js", "./components/*.html"],
    theme: {
        extend: {
            colors: {
                'primary-green': '#2d5a27',
                'accent-gold': '#c5a021',
                'active-gold': '#b08d1a',
                'text-dark': '#333333',
                'bg-light': '#f9f9f9',
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
