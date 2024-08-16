const fadeElementSets = [];

let i = 1;
while (true) {
  const elements = [...document.getElementsByClassName(`sequential-fade-${i}`)];
  if (elements.length === 0) break;
  fadeElementSets.push(elements);
  i++;
}

fadeElementSets.forEach((fadeElementSet) => {
  fadeElementSet.forEach((el) => {
    el.style.opacity = 0;
  });
});

for (let i = 0; i < fadeElementSets.length - 1; i++) {
  const currentElementSet = fadeElementSets[i];
  const nextElementSet = fadeElementSets[i + 1];

  currentElementSet[0].addEventListener("animationend", (e) => {
    if (e.animationName !== "fadeIn") return;
    nextElementSet.forEach((el) => {
      el.style.animation = "fadeIn 3s forwards";
    });
  });
}

const typewriter = document.getElementsByClassName("initial-typewriter")[0];
if (typewriter) {
  typewriter.addEventListener("typingFinish", (e) => {
    fadeElementSets[0].forEach((el) => {
      el.style.animation = "fadeIn 3s forwards";
    });
  });
} else {
  fadeElementSets[0].forEach((el) => {
    el.style.animation = "fadeIn 3s forwards";
  });
}

function finalFadeEnd() {
  const finalFadeEndEvent = new CustomEvent("finalFadeEnd", {
    detail: fadeElementSets,
  });
  document.dispatchEvent(finalFadeEndEvent);
}

if (fadeElementSets.length > 0) {
  fadeElementSets[fadeElementSets.length - 1][0].addEventListener("animationend", (e) => {
    if (e.animationName !== "fadeIn") return;
    finalFadeEnd();
  });
} else if (typewriter) {
  typewriter.addEventListener("typingFinish", (e) => {
    finalFadeEnd();
  });
} else {
  finalFadeEnd();
}
