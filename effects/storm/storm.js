
class ThunderEffect {
  constructor() {
    this.init();
  }

  init() {
    this.createStyles();
    this.createLightningOverlay();
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
        background: rgba(245, 245, 245, 0.9) !important; /* Slightly grayish white */
        color: black !important;
        transition: background 0.1s, opacity 0.1s;
      }

      .thunder-darken {
        background: black !important;
      }

      .lightning-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(circle, rgba(255,255,255,0.9) 10%, rgba(0,0,0,0.7) 100%);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.1s;
      }
    `;
    document.head.appendChild(style);
  }

  createLightningOverlay() {
    this.lightningOverlay = document.createElement("div");
    this.lightningOverlay.className = "lightning-overlay";
    document.body.appendChild(this.lightningOverlay);
  }

  start() {
    const htmlBody = document.documentElement;
    const body = document.body;

    // Add full-screen shake effect
    htmlBody.classList.add("thunder-shake");

    // Darken the screen before the flash
    body.classList.add("thunder-darken");

    setTimeout(() => {
      body.classList.remove("thunder-darken");
      body.classList.add("thunder-flash");
      this.showLightning();
    }, 200);

    setTimeout(() => {
      body.classList.remove("thunder-flash");
      this.hideLightning();
    }, 400);

    setTimeout(() => {
      body.classList.add("thunder-flash");
      this.showLightning();
    }, 600);

    setTimeout(() => {
      body.classList.remove("thunder-flash");
      this.hideLightning();
    }, 800);

    // Remove shake effect after animation completes
    setTimeout(() => htmlBody.classList.remove("thunder-shake"), 1000);
  }

  showLightning() {
    this.lightningOverlay.style.opacity = "1";
  }

  hideLightning() {
    this.lightningOverlay.style.opacity = "0";
  }
}

// Automatically initialize when script loads
window.Storm = new ThunderEffect();
