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
        25% { transform: translate(3px, -3px); }
        50% { transform: translate(-3px, 3px); }
        75% { transform: translate(2px, -2px); }
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
        animation: screen-shake 0.3s ease-in-out 3;
      }

      .thunder-darken {
        background: rgba(0, 0, 0, 0.6) !important;
      }

      .lightning-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(255, 255, 255, 0.7);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease-in-out;
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
    const body = document.body;

    // Add subtle shake effect
    document.documentElement.classList.add("thunder-shake");

    // Darken screen before lightning
    body.classList.add("thunder-darken");

    setTimeout(() => {
      body.classList.remove("thunder-darken");
      this.showLightning();
    }, 150);

    setTimeout(() => this.hideLightning(), 350);
    setTimeout(() => this.showLightning(), 500);
    setTimeout(() => this.hideLightning(), 700);

    // Remove shake effect after animation completes
    setTimeout(() => document.documentElement.classList.remove("thunder-shake"), 900);
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
