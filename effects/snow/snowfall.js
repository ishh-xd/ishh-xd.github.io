
    class CustomSnow extends HTMLElement {
        constructor() {
            super();

            // Create a shadow DOM
            const shadow = this.attachShadow({ mode: 'open' });

            // Function to create and animate snowflakes
            const createSnowflakes = () => {
                const numberOfSnowflakes = 100; // Total number of snowflakes

                for (let i = 0; i < numberOfSnowflakes; i++) {
                    const snowflake = document.createElement('div');
                    snowflake.classList.add('snowflake');

                    // Randomize starting position
                    const randomLeft = Math.random() * 100; // 0 to 100vw
                    snowflake.style.left = `${randomLeft}vw`;

                    // Randomize animation duration and delay
                    const duration = 8 + Math.random() * 4; // Between 8s to 12s
                    const delay = Math.random() * 4; // Up to 4 seconds delay
                    snowflake.style.animation = `fall ${duration}s linear ${delay}s infinite, wind ${duration}s linear ${delay}s infinite`;

                    // Set wind effect variable
                    snowflake.style.setProperty('--wind-effect', `${Math.random() * 20 - 10}vw`);

                    document.body.appendChild(snowflake);
                }

                // Add CSS animation for wind effect if it hasn't been added yet
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes fall {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(100vh);
                        }
                    }

                    @keyframes wind {
                        0% {
                            transform: translateY(0) translateX(0);
                        }
                        50% {
                            transform: translateY(50vh) translateX(var(--wind-effect));
                        }
                        100% {
                            transform: translateY(100vh) translateX(var(--wind-effect));
                        }
                    }

                    /* Snowflake styling */
                    .snowflake {
                        position: fixed;
                        width: 0.4vw;
                        height: 0.4vw;
                        background: rgba(255, 255, 255, 0.85); /* Bright white with opacity */
                        border-radius: 50%;
                        top: -1vh; /* Start above the viewport */
                        opacity: 0.9;
                    }

                    /* Keyframes for snowfall animation */
                    @keyframes fall {
                        0% {
                            transform: translateY(0) translateX(0);
                        }
                        50% {
                            transform: translateY(50vh) translateX(0);
                        }
                        100% {
                            transform: translateY(100vh) translateX(0);
                        }
                    }
                `;
                shadow.appendChild(style);
            }

            // Call the function to create snowflakes when the custom element is connected
            this.connectedCallback = () => {
                createSnowflakes();
            };
        }
    }

    // Define the custom element
    customElements.define('custom-snow', CustomSnow);
