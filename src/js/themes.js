const darkThemes = ["dark", "sunset", "mocha"];

const defaultLightTheme = "nord";
const defaultDarkTheme = "sunset";
const defaultTheme = defaultDarkTheme;

function getOppositeDefault(theme) {
	if (darkThemes.includes(theme)) {
		return defaultLightTheme;
	}
	return defaultDarkTheme;
}

function updateTWDarkMode() {
	const theme = document.documentElement.dataset.theme;
	if (darkThemes.includes(theme)) {
		if (!document.documentElement.classList.contains("dark")) {
			document.documentElement.classList.add("dark");
		}
	} else {
		if (document.documentElement.classList.contains("dark")) {
			document.documentElement.classList.remove("dark");
		}
	}
}

function switchTheme(e) {
	if (e.target.type === "checkbox" && e.target.checked) {
		const theme = getOppositeDefault(document.documentElement.dataset.theme);
		document.documentElement.dataset.theme = theme;
		localStorage.setItem("theme", theme);
	} else if (e.target.type === "checkbox" && !e.target.checked) {
		document.documentElement.dataset.theme = defaultTheme;
		localStorage.setItem("theme", defaultTheme);
	} else if (e.target.type === "radio") {
		document.documentElement.dataset.theme = e.target.value;
		localStorage.setItem("theme", e.target.value);
	}
	updateTWDarkMode();
}

if ("theme" in localStorage) {
	document.documentElement.dataset.theme = localStorage.getItem("theme");
} else {
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		document.documentElement.dataset.theme = defaultDarkTheme;
	} else {
		document.documentElement.dataset.theme = defaultLightTheme;
	}
}
updateTWDarkMode();

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".theme-controller").forEach((input) => {
		input.addEventListener("change", switchTheme);

		const currentTheme = document.documentElement.dataset.theme;

		if (input.type === "radio" && input.value === currentTheme) {
			input.checked = true;
		} else if (input.type === "checkbox" && input.value === currentTheme) {
			if (currentTheme !== defaultTheme) {
				input.checked = true;
			} else {
				throw new Error("Missing either a light or dark theme");
			}
		}
	});
});
