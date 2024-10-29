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
  
  // Function to open modal
  function openModal(projectId) {
    document.getElementById(projectId).style.display = "flex";
  }

  // Function to close modal
  function closeModal(projectId) {
    document.getElementById(projectId).style.display = "none";
  }

  // Close modal when clicking outside of modal content
  window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
      if (event.target === modals[i]) {
        modals[i].style.display = "none";
      }
    }
  }