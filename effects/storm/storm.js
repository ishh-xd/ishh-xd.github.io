class ThunderEffect {
  constructor() {
    this.init();
  }

  init() {
    this.createStyles();
  }

  createStyles() {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes screen-shake {
        0% { transform: translate(0, 0); }
        25% { transform: translate(8px, -8px); }
        50% { transform: translate(-8px, 8px); }
        75% { transform: translate(8px, 8px); }
        100% { transform: translate(0, 0); }
      }

      html, body {
        margin: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
      }

      .thunder-shake {
        animation: screen-shake 0.2s ease-in-out 5;
      }

      .thunder-flash {
        background: white !important;
        color: black !important;
      }
    `;
    document.head.appendChild(style);
  }

  start() {
    const htmlBody = document.documentElement;

    // Add full-screen shake effect
    htmlBody.classList.add("thunder-shake");

    // Flash effect to simulate lightning
    setTimeout(() => document.body.classList.add("thunder-flash"), 200);
    setTimeout(() => document.body.classList.remove("thunder-flash"), 400);
    setTimeout(() => document.body.classList.add("thunder-flash"), 600);
    setTimeout(() => document.body.classList.remove("thunder-flash"), 800);

    // Remove shake effect after animation completes
    setTimeout(() => htmlBody.classList.remove("thunder-shake"), 1000);
  }
}

// Automatically initialize when script loads
window.Storm = new ThunderEffect();
