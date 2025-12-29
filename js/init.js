// init.js - Game Initialization
// Boxing Manager v0.90 Modular

// Initialize game when page loads
(async function() {
    try {
        await loadGameData();
    } catch (error) {
        console.error('Failed to load game:', error);
        startIntroSequence();
    }
})();

// Global click sound handler
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || 
        e.target.closest('button') ||
        e.target.classList.contains('primary-btn') ||
        e.target.classList.contains('secondary-btn')) {
        if (typeof playClickSound === 'function') {
            playClickSound();
        }
    }
});
