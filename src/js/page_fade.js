function fadeInPage() {
	if (!window.AnimationEvent) {
		return;
	}

	const fader = document.getElementById("fader");
	fader.classList.add("fade-out");
}

document.addEventListener("DOMContentLoaded", () => {
	if (!window.AnimationEvent) {
		return;
	}

	document.querySelectorAll("a").forEach((anchor) => {
		if (
			anchor.hostname !== window.location.hostname ||
			(anchor.pathname === window.location.pathname && anchor.hash !== "")
		) {
			return;
		}

		anchor.addEventListener("click", (e) => {
			if (
				e.getModifierState("Alt") ||
				e.getModifierState("Control") ||
				e.getModifierState("Meta") ||
				e.getModifierState("OS") ||
				e.getModifierState("Shift")
			) {
				return;
			}

			const fader = document.getElementById("fader");

			const listener = function () {
				window.location = anchor.href;
				fader.removeEventListener("animationend", listener);
			};
			fader.addEventListener("animationend", listener);

			e.preventDefault();
			fader.classList.remove("fade-out");
			fader.classList.add("fade-in");
		});
	});
});

window.addEventListener("pageshow", (e) => {
	if (!e.persisted) {
		return;
	}

	const fader = document.getElementById("fader");
	fader.classList.remove("fade-in");
});

fadeInPage();
