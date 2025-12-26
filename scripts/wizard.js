// Store user data
let userData = {
  niche: '',
  audience: '',
  priceRange: '',
  storeName: '',
  storeUrl: ''
};

// Navigate between steps
function goToStep(stepNumber) {
  // Save data from current step
  if (stepNumber === 2) {
    userData.niche = document.getElementById('niche').value;
    userData.audience = document.getElementById('audience').value;
    userData.priceRange = document.getElementById('priceRange').value;
    
    if (!userData.niche || !userData.audience) {
      alert('Please fill in all fields');
      return;
    }
  }

  // Hide all steps
  document.querySelectorAll('.wizard-step').forEach(step => {
    step.style.display = 'none';
    step.classList.remove('active');
  });

  // Show target step
  const targetStep = document.getElementById('step' + stepNumber);
  targetStep.style.display = 'block';
  targetStep.classList.add('active');

  // Update progress bar
  document.querySelectorAll('.step').forEach((step, index) => {
    if (index < stepNumber - 1) {
      step.classList.add('completed');
      step.classList.remove('active');
    } else if (index === stepNumber - 1) {
      step.classList.add('active');
      step.classList.remove('completed');
    } else {
      step.classList.remove('active', 'completed');
    }
  });

  // Trigger store building if moving to step 2
  if (stepNumber === 2) {
    buildStore();
  }
}

// Build store with DropForge AI
async function buildStore() {
  const buildingAnimation = document.getElementById('buildingAnimation');
  const storeReady = document.getElementById('storeReady');
  const buildStatus = document.getElementById('buildStatus');
  const continueBtn = document.getElementById('continueToSuppliers');

  // Show building animation
  buildingAnimation.style.display = 'block';
  storeReady.style.display = 'none';
  continueBtn.style.display = 'none';

  // Simulate AI building process with status updates
  const statuses = [
    'Analyzing your niche and products...',
    'Generating store name and branding...',
    'Creating product pages with AI...',
    'Designing homepage layout...',
    'Optimizing for SEO and conversions...',
    'Setting up payment integration...',
    'Finalizing your store...'
  ];

  for (let i = 0; i < statuses.length; i++) {
    await sleep(800);
    buildStatus.textContent = statuses[i];
  }

  // Generate store name
  userData.storeName = generateStoreName(userData.niche);
  userData.storeUrl = `https://${userData.storeName.toLowerCase().replace(/\s+/g, '')}.myshopify.com`;

  // Show store ready
  await sleep(1000);
  buildingAnimation.style.display = 'none';
  storeReady.style.display = 'block';
  
  document.getElementById('storeName').textContent = userData.storeName;
  
  // In a real implementation, this would show actual store preview
  // For now, we'll use a placeholder
  document.getElementById('storePreviewImage').src = 'https://via.placeholder.com/600x400/667eea/ffffff?text=Your+Store+Preview';
  
  continueBtn.style.display = 'block';
}

// Generate store name based on niche
function generateStoreName(niche) {
  const prefixes = ['Pro', 'Elite', 'Prime', 'Ultimate', 'Premium'];
  const suffixes = ['Hub', 'Store', 'Shop', 'Market', 'Outlet'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return `${prefix} ${niche} ${suffix}`;
}

// Complete setup
function completeSetup() {
  const finalMessage = document.getElementById('finalMessage');
  finalMessage.style.display = 'block';
  
  document.getElementById('finalStoreUrl').textContent = userData.storeUrl;
  document.getElementById('finalStoreUrl').href = userData.storeUrl;
  
  // Hide suppliers list and button
  document.getElementById('suppliersList').style.display = 'none';
  document.querySelector('#step3 > button').style.display = 'none';
  
  // Save to localStorage
  localStorage.setItem('dropstackerStore', JSON.stringify(userData));
  
  // Confetti effect (optional)
  celebrate();
}

// Helper function for delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Celebration effect
function celebrate() {
  // Simple celebration - in production you could use a library like canvas-confetti
  console.log('🎉 Store created successfully!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check if user has existing store data
  const savedData = localStorage.getItem('dropstackerStore');
  if (savedData) {
    userData = JSON.parse(savedData);
  }
});
