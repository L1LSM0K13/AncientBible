/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./dist/*.{html,js}"],
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
