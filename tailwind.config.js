/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["*.{html,js,ejs}"],
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
