
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
  snowflake.style.animation = `fall ${duration}s linear ${delay}s infinite`;

  // Add wind effect by adjusting the keyframe at 50% and 100%
  snowflake.style.setProperty('--wind-effect', `${Math.random() * 20 - 10}vw`);
  snowflake.style.animation += `, wind ${duration}s linear ${delay}s infinite`;

  document.body.appendChild(snowflake);
}

// Add CSS animation for wind effect
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);