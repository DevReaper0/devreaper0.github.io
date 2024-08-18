const fadeTime = 3000;

const fadeElementSets = [];

let counter = 1;
while (true) {
  const elements = [
    ...document.getElementsByClassName(`sequential-fade-${counter}`),
  ];
  if (elements.length === 0) break;
  fadeElementSets.push(elements);
  counter++;
}

fadeElementSets.forEach((fadeElementSet) => {
  fadeElementSet.forEach((el) => {
    el.style.opacity = 0;
  });
});

const typewriter = document.getElementsByClassName("initial-typewriter")[0];
if (typewriter) {
  typewriter.addEventListener("typingFinish", (e) => {
    for (let i = 0; i < fadeElementSets.length; i++) {
      setTimeout(
        () => {
          fadeElementSets[i].forEach((el) => {
            el.style.animation = `fadeIn ${fadeTime}ms forwards`;
          });
        },
        fadeTime * 0.5 * i
      );
    }
  });
} else {
  for (let i = 0; i < fadeElementSets.length; i++) {
    setTimeout(
      () => {
        fadeElementSets[i].forEach((el) => {
          el.style.animation = `fadeIn ${fadeTime}ms forwards`;
        });
      },
      fadeTime * 0.5 * i
    );
  }
}

function finalFadeEnd() {
  const finalFadeEndEvent = new CustomEvent("finalFadeEnd", {
    detail: fadeElementSets,
  });
  document.dispatchEvent(finalFadeEndEvent);
}

if (fadeElementSets.length > 0) {
  fadeElementSets[fadeElementSets.length - 1][0].addEventListener(
    "animationend",
    (e) => {
      if (e.animationName !== "fadeIn") return;
      finalFadeEnd();
    }
  );
} else if (typewriter) {
  typewriter.addEventListener("typingFinish", (e) => {
    finalFadeEnd();
  });
} else {
  finalFadeEnd();
}
