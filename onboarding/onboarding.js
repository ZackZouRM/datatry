// ============================================
// Knowledge Universe - Onboarding Flow Logic
// Shared utilities and data management
// ============================================

// Demo mode: Use sessionStorage instead of localStorage
// Data will be cleared when browser/tab is closed or page is refreshed from step1

// Initialize data structure
function initData() {
  if (!sessionStorage.getItem('onboarding_data')) {
    const defaultData = {
      universe_name: '',
      data_sources: [],
      cleaning_complete: false,
      business_context: {
        phase1: null,
        phase2: null,
        phase3: null
      },
      saturation: 0,
      timestamp: new Date().toISOString()
    };
    sessionStorage.setItem('onboarding_data', JSON.stringify(defaultData));
  }
}

// Get onboarding data
function getData() {
  initData();
  return JSON.parse(sessionStorage.getItem('onboarding_data'));
}

// Save onboarding data
function saveData(updates) {
  const data = getData();
  const newData = { ...data, ...updates };
  sessionStorage.setItem('onboarding_data', JSON.stringify(newData));
  return newData;
}

// Clear all onboarding data (for demo reset)
function clearData() {
  sessionStorage.removeItem('onboarding_data');
}

// Navigate to next step
function goToStep(step) {
  // Map step numbers to actual file names
  const stepFiles = {
    1: 'step1-welcome.html',
    2: 'step2-upload.html',
    3: 'step3-cleaning.html',
    4: 'step4-qa.html',
    5: 'step5-saturation.html'
  };
  
  // Prevent back navigation
  window.location.replace(stepFiles[step]);
}

// Navigate to main app
function goToMainApp() {
  window.location.replace('../index.html');
}

// Format file size
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Update progress bar
function updateProgress(percentage) {
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = percentage + '%';
  }
}

// Show loading state
function showLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.id = 'loadingSpinner';
    element.appendChild(spinner);
  }
}

// Hide loading state
function hideLoading() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.remove();
  }
}

// Add fade-in animation to elements
function fadeIn(element) {
  if (element) {
    element.classList.add('fade-in');
  }
}

// Simulate async operation with delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initData();
  
  // Add fade-in to main container
  const container = document.querySelector('.onboarding-container');
  if (container) {
    fadeIn(container);
  }
});

