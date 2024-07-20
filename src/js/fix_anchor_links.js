let aWithHref = document.querySelectorAll('a[href*="#"]');
aWithHref.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    if (el.hash) {
      let pos = document.querySelector(el.hash).offsetTop;
      window.scrollTo({
        top: pos,
        behavior: "smooth",
      });
    }
  });
});
