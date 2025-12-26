// Advanced Store Builder with DropForge AI Integration
// In production, this connects to OpenAI API and Shopify API

let storeConfig = {
  type: 'one-product',
  name: '',
  niche: '',
  brandVoice: 'professional',
  colorScheme: 'blue',
  template: 'modern',
  products: [],
  pricing: 19
};

let currentPreview = 'desktop';

// Update pricing info based on store type
function updatePricing() {
  const storeType = document.getElementById('storeType').value;
  const infoDiv = document.getElementById('storeTypeInfo');
  
  storeConfig.type = storeType;
  
  if (storeType === 'one-product') {
    storeConfig.pricing = 19;
    infoDiv.innerHTML = `
      <strong>One Product Store ($19/mo):</strong><br>
      ✓ Perfect for beginners<br>
      ✓ Focus on single winning product<br>
      ✓ Higher conversion rates<br>
      ✓ Faster to launch<br>
      ✓ Easier to manage<br>
      <br>
      <em>Best for: Testing products, first-time sellers, high-ticket items</em>
    `;
  } else {
    storeConfig.pricing = 49;
    infoDiv.innerHTML = `
      <strong>Full Product Store ($49/mo):</strong><br>
      ✓ Multiple products (10-100+)<br>
      ✓ Full catalog with categories<br>
      ✓ More traffic potential<br>
      ✓ Scalable business model<br>
      ✓ Brand building<br>
      <br>
      <em>Best for: Experienced sellers, long-term business, multiple product lines</em>
    `;
  }
}

// Load selected products from product research
function loadSelectedProducts() {
  const products = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
  storeConfig.products = products;
  document.getElementById('productCount').textContent = `${products.length} products selected`;
}

// Select color scheme
function selectColor(color) {
  storeConfig.colorScheme = color;
  document.querySelectorAll('.template-option').forEach(el => el.classList.remove('selected'));
  event.target.closest('.template-option').classList.add('selected');
}

// Switch preview mode
function switchPreview(mode) {
  currentPreview = mode;
  const preview = document.getElementById('devicePreview');
  const tabs = document.querySelectorAll('.preview-tab');
  
  tabs.forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  
  preview.className = `device-preview ${mode}`;
}

// Generate store with AI
async function generateStore() {
  // Get configuration
  storeConfig.type = document.getElementById('storeType').value;
  storeConfig.name = document.getElementById('storeName').value || 'My Store';
  storeConfig.niche = document.getElementById('storeNiche').value || 'General Products';
  storeConfig.brandVoice = document.getElementById('brandVoice').value;
  storeConfig.template = document.getElementById('templateStyle').value;
  
  if (!storeConfig.name || !storeConfig.niche) {
    alert('Please fill in store name and niche');
    return;
  }
  
  // Validate product selection based on store type
  if (storeConfig.type === 'one-product' && storeConfig.products.length === 0) {
    alert('⚠️ One Product Store requires exactly 1 product.\n\nPlease go to Product Research and select a GREEN validated product first!');
    return;
  } else if (storeConfig.type === 'one-product' && storeConfig.products.length > 1) {
    alert('⚠️ One Product Store can only have 1 product.\n\nYou have ' + storeConfig.products.length + ' products selected. Please remove extras.');
    return;
  } else if (storeConfig.type === 'full-store' && storeConfig.products.length < 5) {
    const proceed = confirm('⚠️ Full Product Store works best with 5+ products.\n\nYou currently have ' + storeConfig.products.length + ' products.\n\nProceed anyway?');
    if (!proceed) return;
  }
  
  // Show AI progress
  const progressDiv = document.getElementById('aiProgress');
  progressDiv.style.display = 'block';
  
  const steps = storeConfig.type === 'one-product' ? [
    { id: 1, text: 'Analyzing your product and niche', duration: 1000 },
    { id: 2, text: 'Creating compelling product page', duration: 1500 },
    { id: 3, text: 'Writing persuasive copy with AI', duration: 1200 },
    { id: 4, text: 'Designing conversion-focused layout', duration: 1000 },
    { id: 5, text: 'Optimizing for maximum conversions', duration: 800 },
    { id: 6, text: 'Setting up payment and checkout', duration: 700 },
    { id: 7, text: 'Finalizing your one-product store', duration: 500 }
  ] : [
    { id: 1, text: 'Analyzing your niche and products', duration: 1000 },
    { id: 2, text: 'Generating brand identity and logo', duration: 1200 },
    { id: 3, text: 'Creating product descriptions with AI', duration: 1500 },
    { id: 4, text: 'Designing homepage layout', duration: 1000 },
    { id: 5, text: 'Building category pages', duration: 900 },
    { id: 6, text: 'Optimizing for SEO and conversions', duration: 800 },
    { id: 7, text: 'Setting up payment and checkout', duration: 700 },
    { id: 8, text: 'Finalizing your full store', duration: 500 }
  ];
  
  const progressSteps = document.getElementById('progressSteps');
  progressSteps.innerHTML = steps.map(step => `
    <div class="progress-step" id="step${step.id}">
      <div class="step-icon pending" id="icon${step.id}">
        ${step.id}
      </div>
      <div>${step.text}</div>
    </div>
  `).join('');
  
  // Animate progress
  for (let step of steps) {
    document.getElementById(`step${step.id}`).classList.add('active');
    document.getElementById(`icon${step.id}`).classList.remove('pending');
    document.getElementById(`icon${step.id}`).classList.add('active');
    
    await sleep(step.duration);
    
    document.getElementById(`step${step.id}`).classList.remove('active');
    document.getElementById(`step${step.id}`).classList.add('complete');
    document.getElementById(`icon${step.id}`).classList.remove('active');
    document.getElementById(`icon${step.id}`).classList.add('complete');
    document.getElementById(`icon${step.id}`).textContent = '✓';
  }
  
  // Generate and show preview
  await generatePreview();
  
  const storeTypeText = storeConfig.type === 'one-product' ? 'One Product Store' : 'Full Product Store';
  alert(`✅ Your ${storeTypeText} has been generated!\n\nMonthly Cost: $${storeConfig.pricing}\n\nReview the preview and click "Deploy" when ready.`);
}

// Generate store preview
async function generatePreview() {
  const colors = {
    blue: { primary: '#667eea', secondary: '#764ba2' },
    green: { primary: '#10b981', secondary: '#059669' },
    red: { primary: '#ef4444', secondary: '#dc2626' },
    purple: { primary: '#8b5cf6', secondary: '#7c3aed' }
  };
  
  const color = colors[storeConfig.colorScheme];
  
  const storeContent = document.getElementById('storeContent');
  storeContent.innerHTML = `
    <div class="preview-nav">
      <div style="font-weight:bold; font-size:20px;">${storeConfig.name}</div>
      <div style="display:flex; gap:20px;">
        <a href="#" style="color:#333; text-decoration:none;">Shop</a>
        <a href="#" style="color:#333; text-decoration:none;">About</a>
        <a href="#" style="color:#333; text-decoration:none;">Contact</a>
        <a href="#" style="color:#333; text-decoration:none;">🛒 Cart (0)</a>
      </div>
    </div>
    <div class="preview-content" style="background: linear-gradient(135deg, ${color.primary} 0%, ${color.secondary} 100%);">
      <div class="preview-hero">
        <h1>${generateHeadline(storeConfig.niche)}</h1>
        <p style="font-size:20px; margin-bottom:30px;">${generateSubheadline(storeConfig.niche, storeConfig.brandVoice)}</p>
        <button style="padding:15px 40px; background:white; color:${color.primary}; border:none; border-radius:8px; font-weight:bold; font-size:16px; cursor:pointer;">
          Shop Now →
        </button>
      </div>
      
      ${storeConfig.products.length > 0 ? `
        <div style="background:white; padding:40px; border-radius:16px; margin-top:40px;">
          <h2 style="color:#333; text-align:center; margin-bottom:30px;">Featured Products</h2>
          <div class="preview-products">
            ${storeConfig.products.slice(0, 4).map(product => `
              <div class="preview-product">
                <div style="font-size:48px; text-align:center; margin-bottom:10px;">🥋</div>
                <h3 style="font-size:16px; margin-bottom:10px;">${product.name}</h3>
                <div style="font-size:24px; font-weight:bold; color:${color.primary};">$${product.price}</div>
                <button style="width:100%; padding:10px; background:${color.primary}; color:white; border:none; border-radius:6px; margin-top:10px; cursor:pointer;">
                  Add to Cart
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <div style="background:rgba(255,255,255,0.1); padding:40px; border-radius:16px; margin-top:40px; text-align:center;">
        <h2 style="margin-bottom:20px;">Why Choose ${storeConfig.name}?</h2>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:20px; margin-top:30px;">
          <div>
            <div style="font-size:48px;">🚚</div>
            <h3>Fast Shipping</h3>
            <p>Quick delivery worldwide</p>
          </div>
          <div>
            <div style="font-size:48px;">✅</div>
            <h3>Quality Guaranteed</h3>
            <p>Premium products only</p>
          </div>
          <div>
            <div style="font-size:48px;">💯</div>
            <h3>100% Satisfaction</h3>
            <p>Money-back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Generate AI-powered headline
function generateHeadline(niche) {
  const templates = [
    `Premium ${niche} for Champions`,
    `Elevate Your ${niche} Game`,
    `Professional ${niche} Equipment`,
    `The Ultimate ${niche} Collection`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Generate AI-powered subheadline
function generateSubheadline(niche, voice) {
  const templates = {
    professional: `High-quality ${niche.toLowerCase()} trusted by professionals worldwide`,
    friendly: `Get the best ${niche.toLowerCase()} gear and start your journey today!`,
    luxury: `Experience premium ${niche.toLowerCase()} crafted for excellence`,
    energetic: `Unleash your potential with top-tier ${niche.toLowerCase()} equipment!`
  };
  return templates[voice];
}

// Deploy store
async function deployStore() {
  if (!storeConfig.name || !storeConfig.niche) {
    alert('Please generate your store first');
    return;
  }
  
  const confirmed = confirm(`Deploy "${storeConfig.name}" to a live URL?\n\nThis will create a real Shopify store and make it publicly accessible.`);
  
  if (confirmed) {
    alert('🚀 Deployment initiated!\n\nYour store will be live at:\nhttps://' + storeConfig.name.toLowerCase().replace(/\s+/g, '-') + '.myshopify.com\n\n(In production, this connects to Shopify API)');
    
    // Save store data
    localStorage.setItem('deployedStore', JSON.stringify(storeConfig));
  }
}

// Helper function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadSelectedProducts();
});
