// Display main content once page is fully loaded
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
  
    // Add 'hidden' class for fade-out transition
    loadingScreen.classList.add('hidden');
  
    // Wait for transition to finish before displaying main content
    setTimeout(() => {
      loadingScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
    }, 500); // Match the transition duration in CSS
  });
  