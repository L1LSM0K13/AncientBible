/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./dist/pages/*.{html,js}", "index.html", "scripts/*.js"],
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
