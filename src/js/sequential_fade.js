const fadeEvents = [];

let i = 1;
while (true) {
  const elements = [...document.getElementsByClassName(`sequential-fade-${i}`)];
  if (elements.length === 0) break;
  fadeEvents.push(elements);
  i++;
}

fadeEvents.forEach((fadeEvent) => {
  fadeEvent.forEach((el) => {
    el.style.opacity = 0;
  });
});

for (let i = 0; i < fadeEvents.length - 1; i++) {
  const currentEvent = fadeEvents[i];
  const nextEvent = fadeEvents[i + 1];

  currentEvent[0].addEventListener("animationend", (ev) => {
    if (ev.animationName !== "fadeIn") return;
    nextEvent.forEach((el) => {
      el.style.animation = "fadeIn 3s forwards";
    });
  });
}

const typewriter = document.getElementsByClassName("initial-typewriter")[0];
if (typewriter) {
  typewriter.addEventListener("typingFinish", (ev) => {
    fadeEvents[0].forEach((el) => {
      el.style.animation = "fadeIn 3s forwards";
    });
  });
} else {
  fadeEvents[0].forEach((el) => {
    el.style.animation = "fadeIn 3s forwards";
  });
}

function finalFadeEnd() {
  const finalFadeEndEvent = new CustomEvent("finalFadeEnd", {
    detail: fadeEvents,
  });
  document.dispatchEvent(finalFadeEndEvent);
}

if (fadeEvents.length > 0) {
  fadeEvents[fadeEvents.length - 1][0].addEventListener("animationend", (ev) => {
    if (ev.animationName !== "fadeIn") return;
    finalFadeEnd();
  });
} else if (typewriter) {
  typewriter.addEventListener("typingFinish", (ev) => {
    finalFadeEnd();
  });
} else {
  finalFadeEnd();
}
