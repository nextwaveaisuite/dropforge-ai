store-builder-UPDATED.js
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
let selectedProduct = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check if product was selected from Product Research
  const productData = localStorage.getItem('selectedProduct');
  if (productData) {
    selectedProduct = JSON.parse(productData);
    autoPopulateFromProduct(selectedProduct);
  }
});

// Auto-populate store builder with selected product
function autoPopulateFromProduct(product) {
  // Set store type to one-product
  document.getElementById('storeType').value = 'one-product';
  updatePricing();
  
  // Generate store name from product
  const storeName = generateStoreName(product.name);
  document.getElementById('storeName').value = storeName;
  storeConfig.name = storeName;
  
  // Set niche from product category
  const niche = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  document.getElementById('storeNiche').value = niche;
  storeConfig.niche = niche;
  
  // Add product to config
  storeConfig.products = [product];
  
  // Show success message with full product details
  const profitMargin = Math.round((product.price - product.cost) / product.price * 100);
  const messageDiv = document.createElement('div');
  messageDiv.style.cssText = 'background:#10b981; color:white; padding:20px; border-radius:12px; margin-bottom:20px;';
  messageDiv.innerHTML = `
    <div style="text-align:center; margin-bottom:15px;">
      <strong style="font-size:18px;">✅ Product Loaded Successfully!</strong>
    </div>
    <div style="background:rgba(255,255,255,0.2); padding:15px; border-radius:8px;">
      <div style="font-size:16px; margin-bottom:10px;"><strong>${product.name}</strong></div>
      <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; font-size:14px;">
        <div>💰 Price: $${product.price}</div>
        <div>📊 Profit: ${profitMargin}%</div>
        <div>⭐ Rating: ${product.rating}</div>
      </div>
    </div>
    <div style="margin-top:15px; font-size:14px; text-align:center;">
      All product details have been auto-filled below. Review and edit if needed, then click "Generate Store"!
    </div>
  `;
  
  const container = document.querySelector('.builder-container');
  container.insertBefore(messageDiv, container.firstChild);
  
  // Create product details section
  createProductDetailsSection(product);
  
  // Update preview
  updatePreview();
}

// Create editable product details section
function createProductDetailsSection(product) {
  const existingSection = document.getElementById('productDetailsSection');
  if (existingSection) {
    existingSection.remove();
  }
  
  const profitMargin = Math.round((product.price - product.cost) / product.price * 100);
  
  const detailsSection = document.createElement('div');
  detailsSection.id = 'productDetailsSection';
  detailsSection.style.cssText = 'background:white; padding:30px; border-radius:16px; margin:20px 0; box-shadow:0 5px 20px rgba(0,0,0,0.1);';
  detailsSection.innerHTML = `
    <h3 style="margin-bottom:20px; color:#2D3142; font-size:22px;">📦 Product Details (Editable)</h3>
    
    <div style="margin-bottom:20px;">
      <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Product Name</label>
      <input type="text" id="productName" value="${product.name}" 
             style="width:100%; padding:12px; border:2px solid #e0e0e0; border-radius:8px; font-size:16px;">
    </div>
    
    <div style="margin-bottom:20px;">
      <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Product Description</label>
      <textarea id="productDescription" rows="4" 
                style="width:100%; padding:12px; border:2px solid #e0e0e0; border-radius:8px; font-size:14px; line-height:1.6;">${product.description}</textarea>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:15px; margin-bottom:20px;">
      <div>
        <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Retail Price</label>
        <input type="number" id="productPrice" value="${product.price}" 
               style="width:100%; padding:12px; border:2px solid #e0e0e0; border-radius:8px; font-size:16px;">
      </div>
      <div>
        <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Cost</label>
        <input type="number" id="productCost" value="${product.cost}" 
               style="width:100%; padding:12px; border:2px solid #e0e0e0; border-radius:8px; font-size:16px;" readonly>
      </div>
      <div>
        <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Profit Margin</label>
        <input type="text" value="${profitMargin}%" 
               style="width:100%; padding:12px; border:2px solid #10b981; border-radius:8px; font-size:16px; background:#f0fdf4; font-weight:600; color:#10b981;" readonly>
      </div>
    </div>
    
    <div style="margin-bottom:20px;">
      <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Key Features</label>
      <div id="featuresList" style="background:#f8f9fa; padding:15px; border-radius:8px;">
        ${product.features.map((feature, index) => `
          <div style="display:flex; align-items:center; margin-bottom:8px;">
            <span style="color:#10b981; margin-right:8px;">✓</span>
            <input type="text" value="${feature}" 
                   style="flex:1; padding:8px; border:1px solid #e0e0e0; border-radius:6px; font-size:14px;">
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:20px;">
      <div>
        <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Available Sizes</label>
        <div style="background:#f8f9fa; padding:12px; border-radius:8px; min-height:80px;">
          ${product.sizes.map(size => `
            <span style="display:inline-block; padding:6px 12px; background:white; border:1px solid #e0e0e0; border-radius:6px; margin:4px; font-size:13px;">${size}</span>
          `).join('')}
        </div>
      </div>
      <div>
        <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Available Colors</label>
        <div style="background:#f8f9fa; padding:12px; border-radius:8px; min-height:80px;">
          ${product.colors.map(color => `
            <span style="display:inline-block; padding:6px 12px; background:white; border:1px solid #e0e0e0; border-radius:6px; margin:4px; font-size:13px;">${color}</span>
          `).join('')}
        </div>
      </div>
    </div>
    
    <div style="margin-bottom:20px;">
      <label style="display:block; margin-bottom:8px; font-weight:600; color:#666;">Target Audience</label>
      <input type="text" id="productAudience" value="${product.targetAudience}" 
             style="width:100%; padding:12px; border:2px solid #e0e0e0; border-radius:8px; font-size:14px;">
    </div>
    
    <div style="background:#eff6ff; padding:15px; border-radius:8px; border-left:4px solid #3b82f6;">
      <div style="font-weight:600; color:#1e40af; margin-bottom:5px;">💡 Pro Tip</div>
      <div style="font-size:14px; color:#1e40af;">All fields above are editable. Make any changes you want, then click "Generate Store" to build your dropshipping store with these details!</div>
    </div>
  `;
  
  // Insert after store configuration section
  const configSection = document.querySelector('.config-section');
  if (configSection && configSection.parentNode) {
    configSection.parentNode.insertBefore(detailsSection, configSection.nextSibling);
  }
}

// Generate store name from product name
function generateStoreName(productName) {
  // Extract key words and create a brand name
  const words = productName.split(' ');
  const keyWord = words.find(w => w.length > 4) || words[0];
  const suffixes = ['Hub', 'Store', 'Shop', 'Market', 'Pro', 'Zone'];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return keyWord + randomSuffix;
}

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
