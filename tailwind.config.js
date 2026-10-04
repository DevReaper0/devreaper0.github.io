import catppuccin from "@catppuccin/daisyui";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		themes: [
			"light",
			"dark",
			"sunset",
			"nord",
			catppuccin("latte"),
			catppuccin("mocha"),
		],
	},
	darkMode: "selector",
};
