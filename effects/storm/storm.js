
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
        25% { transform: translate(4px, -4px); }
        50% { transform: translate(-4px, 4px); }
        75% { transform: translate(3px, -3px); }
        100% { transform: translate(0, 0); }
      }

      html, body {
        margin: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        transition: background 0.3s ease-in-out;
      }

      .thunder-shake {
        animation: screen-shake 0.4s ease-in-out 3;
      }

      .thunder-flash {
        background: rgba(255, 255, 255, 0.8) !important;
        transition: background 0.15s ease-in-out;
      }

      .thunder-darken {
        background: rgba(0, 0, 0, 0.6) !important;
      }
    `;
    document.head.appendChild(style);
  }

  start() {
    const body = document.body;

    // Add a subtle screen shake effect
    document.documentElement.classList.add("thunder-shake");

    // Darken the screen briefly before the flash
    body.classList.add("thunder-darken");

    setTimeout(() => {
      body.classList.remove("thunder-darken");
      body.classList.add("thunder-flash");
    }, 150);

    setTimeout(() => body.classList.remove("thunder-flash"), 350);
    setTimeout(() => {
      body.classList.add("thunder-flash");
    }, 500);
    setTimeout(() => body.classList.remove("thunder-flash"), 700);

    // Remove shake effect after animation completes
    setTimeout(() => document.documentElement.classList.remove("thunder-shake"), 900);
  }
}

// Automatically initialize when script loads
window.Storm = new ThunderEffect();
