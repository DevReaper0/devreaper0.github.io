document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".card").forEach((card) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
      },
      {
        scrollTrigger: {
          trigger: card,
          toggleActions: "play reverse play reverse",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power1.out",
      }
    );
  });
});
