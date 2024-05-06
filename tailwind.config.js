/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./dist/views/*.{ejs,js}", "scripts/*.js"],
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
