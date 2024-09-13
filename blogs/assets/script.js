// Get the toggle button and the body
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const toggleIcon = toggleButton.querySelector('img');

// Check localStorage for the preferred theme and apply it
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'light-mode') {
        toggleIcon.src = 'https://img.icons8.com/ios-glyphs/30/000000/moon-symbol.png';
    }
}

// Toggle between light and dark mode
toggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        toggleIcon.src = 'https://img.icons8.com/ios-glyphs/30/000000/moon-symbol.png';
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        toggleIcon.src = 'https://img.icons8.com/ios-glyphs/30/ffffff/sun--v1.png';
        localStorage.setItem('theme', 'dark-mode');
    }
});
