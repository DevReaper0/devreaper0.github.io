function adjustContentHeight() {
  let headerHeight = document.querySelector("nav").offsetHeight;
  document.querySelector("header").style.paddingBottom = `${headerHeight}px`;
  {
    let contentElements = document.querySelectorAll(".h-content");
    contentElements.forEach(function (el) {
      if (el.classList.contains("h-screen")) {
        el.classList.remove("h-screen");
      }
      el.style.height = `calc(100vh - ${headerHeight}px)`;
    });
  }
  {
    let contentElements = document.querySelectorAll(".min-h-content");
    contentElements.forEach(function (el) {
      if (el.classList.contains("min-h-screen")) {
        el.classList.remove("min-h-screen");
      }
      el.style.minHeight = `calc(100vh - ${headerHeight}px)`;
    });
  }
  {
    let contentElements = document.querySelectorAll(".max-h-content");
    contentElements.forEach(function (el) {
      if (el.classList.contains("max-h-screen")) {
        el.classList.remove("max-h-screen");
      }
      el.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
    });
  }
}
window.addEventListener("resize", adjustContentHeight);
adjustContentHeight();
