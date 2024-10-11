function fadeInPage() {
  if (!window.AnimationEvent) {
    return;
  }

  var fader = document.getElementById("fader");
  fader.classList.add("fade-out");
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.AnimationEvent) {
    return;
  }

  var anchors = document.getElementsByTagName("a");

  for (var idx = 0; idx < anchors.length; idx += 1) {
    if (
      anchors[idx].hostname !== window.location.hostname ||
      anchors[idx].pathname === window.location.pathname
    ) {
      continue;
    }

    anchors[idx].addEventListener("click", (e) => {
      var fader = document.getElementById("fader"),
        anchor = e.currentTarget;

      var listener = function () {
        window.location = anchor.href;
        fader.removeEventListener("animationend", listener);
      };
      fader.addEventListener("animationend", listener);

      e.preventDefault();
      fader.classList.add("fade-in");
    });
  }
});

window.addEventListener("pageshow", (e) => {
  if (!e.persisted) {
    return;
  }

  var fader = document.getElementById("fader");
  fader.classList.remove("fade-in");
});

fadeInPage();
