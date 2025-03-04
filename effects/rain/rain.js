function createRainEffect() {
    const rainContainer = document.createElement('div');
    rainContainer.classList.add('rain');
    document.body.appendChild(rainContainer);

    const style = document.createElement('style');
    style.textContent = `
        .rain {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
        }

        .drop {
            position: absolute;
            width: 2px;
            height: 15px;
            background: rgba(255, 255, 255, 0.2);
            opacity: 0.6;
            animation: fall linear infinite;
        }

        @keyframes fall {
            from {
                transform: translateY(-100vh);
            }
            to {
                transform: translateY(100vh);
            }
        }
    `;
    document.head.appendChild(style);

    for (let i = 0; i < 100; i++) {
        let drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDuration = (Math.random() * 2 + 2) + 's';
        rainContainer.appendChild(drop);
    }
}

document.addEventListener("DOMContentLoaded", createRainEffect);
