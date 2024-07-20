class Typewriter {
  constructor(el, options) {
    this.el = el;
    this.words = [...this.el.textContent.split(";;")];
    this.speed = options?.speed || 200;
    this.delay = options?.delay || 1500;
    this.repeat = options?.repeat;
    this.el.textContent = "\xa0";
    this.initTyping();
  }

  wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  toggleTyping = () => this.el.classList.toggle("typing");

  async typewrite(word) {
    await this.wait(this.delay);
    this.toggleTyping();

    if (this.el.textContent === "\xa0") {
      this.el.textContent = "";
    }

    for (const letter of word.split("")) {
      this.el.textContent += letter;
      await this.wait(this.speed);
    }
    this.toggleTyping();
    if (this.repeat) {
      await this.wait(this.delay);
      this.toggleTyping();
      while (this.el.textContent.length !== 0) {
        this.el.textContent = this.el.textContent.slice(0, -1);
        await this.wait(this.speed);
      }
      this.toggleTyping();
    }
  }

  async initTyping() {
    for (const word of this.words) {
      await this.typewrite(word.trim());
    }
    if (this.repeat) {
      await this.initTyping();
    } else {
      this.el.style.animation = "none";

      const event = new Event("typingFinish");
      this.el.dispatchEvent(event);
    }
  }
}

document.querySelectorAll("[data-typewriter]").forEach((el) => {
  let speed = parseInt(el.dataset.typewriter) || 200;
  new Typewriter(el, {
    speed: speed,
    delay: speed,
    repeat: false,
  });
});