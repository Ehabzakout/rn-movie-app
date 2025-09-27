/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App/**/*.{ts,tsx,js,jsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#030014",
				secondary: "#151312",
				accent: "#AB8BFF",
				placeholder: "#a8b5db",
				light: {
					100: "#D6C6FF",
					200: "#ABB5DB",
					300: "#9CA4AB",
				},
				dark: {
					100: "#221f3d",
					200: "#0f0d23",
				},
			},
		},
	},
	plugins: [],
};
