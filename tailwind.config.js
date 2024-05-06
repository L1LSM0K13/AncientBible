/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./public/**/*.{ejs,js,html}"],
	darkMode: "class",
	theme: {
		fontFamily: {
			sans: ["arial"],
		},
		container: {
			center: true,
		},
		extend: {},
	},
	plugins: [],
};
