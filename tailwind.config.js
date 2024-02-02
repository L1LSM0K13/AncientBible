/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./dist/*.{html,js}"],
	theme: {
		container: {
			center: true,
		},
		extend: {},
	},
	plugins: [],
};
