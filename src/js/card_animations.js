function animateCards() {
	const pageTop = document.documentElement.scrollTop || document.body.scrollTop;
	const pageBottom = pageTop + window.innerHeight;
	const tags = document.querySelectorAll(".card");

	tags.forEach((tag) => {
		const tagTop = tag.getBoundingClientRect().top + pageTop;

		if (tagTop < pageBottom) {
			tag.style.setProperty(
				"--card-delay",
				`${(Math.random() * 0.3).toFixed(2)}s`,
			);
			tag.classList.add("visible");
		} else {
			tag.style.removeProperty("--card-delay");
			tag.classList.remove("visible");
		}
	});
}

document.addEventListener("scroll", animateCards);
window.addEventListener("resize", animateCards);
animateCards();
