// Advanced Product Research Engine
// This simulates real API calls - in production, connect to actual APIs

const sampleProducts = [
  {
    id: 1,
    name: "Premium Yoga Mat with Alignment Lines",
    category: "sports",
    price: 35,
    cost: 12,
    demand: 88,
    competition: "medium",
    trend: "rising",
    sales: 5200,
    rating: 4.7,
    reviews: 4500,
    orders: 12000
  },
  {
    id: 2,
    name: "LED Light Therapy Face Mask",
    category: "beauty",
    price: 89,
    cost: 32,
    demand: 92,
    competition: "low",
    trend: "rising",
    sales: 6800,
    rating: 4.8,
    reviews: 5200,
    orders: 15000
  },
  {
    id: 3,
    name: "Portable Blender for Smoothies",
    category: "home",
    price: 28,
    cost: 10,
    demand: 95,
    competition: "medium",
    trend: "rising",
    sales: 8500,
    rating: 4.6,
    reviews: 6100,
    orders: 18000
  },
  {
    id: 4,
    name: "Smart Pet Feeder with Camera",
    category: "pets",
    price: 75,
    cost: 28,
    demand: 85,
    competition: "low",
    trend: "stable",
    sales: 4200,
    rating: 4.7,
    reviews: 4800,
    orders: 11000
  },
  {
    id: 5,
    name: "Resistance Bands Set (5 Levels)",
    category: "sports",
    price: 22,
    cost: 7,
    demand: 90,
    competition: "medium",
    trend: "rising",
    sales: 7200,
    rating: 4.8,
    reviews: 5800,
    orders: 16000
  },
  {
    id: 6,
    name: "Wireless Phone Charger Stand",
    category: "electronics",
    price: 19,
    cost: 6,
    demand: 87,
    competition: "medium",
    trend: "stable",
    sales: 6500,
    rating: 4.5,
    reviews: 5500,
    orders: 14000
  },
  {
    id: 7,
    name: "Reusable Silicone Food Storage Bags",
    category: "home",
    price: 16,
    cost: 5,
    demand: 82,
    competition: "low",
    trend: "rising",
    sales: 5800,
    rating: 4.6,
    reviews: 4200,
    orders: 13000
  },
  {
    id: 8,
    name: "Posture Corrector Back Brace",
    category: "health",
    price: 24,
    cost: 8,
    demand: 89,
    competition: "medium",
    trend: "rising",
    sales: 6200,
    rating: 4.7,
    reviews: 5100,
    orders: 14500
  }
];

// Search products with AI analysis
async function searchProducts() {
  const searchTerm = document.getElementById('searchInput').value;
  const category = document.getElementById('categoryFilter').value;
  const priceRange = document.getElementById('priceFilter').value;
  const profitMargin = document.getElementById('profitFilter').value;
  const demand = document.getElementById('demandFilter').value;

  // Show loading
  document.getElementById('loadingState').style.display = 'block';
  document.getElementById('resultsContainer').innerHTML = '';
  document.getElementById('aiInsights').style.display = 'none';

  // Simulate API call delay
  await sleep(1500);

  // Filter products based on criteria
  let filteredProducts = sampleProducts.filter(product => {
    if (category && product.category !== category) return false;
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Hide loading
  document.getElementById('loadingState').style.display = 'none';

  // Display results
  displayProducts(filteredProducts);
}

// Get AI-powered product suggestions
async function getAISuggestions() {
  document.getElementById('aiInsights').style.display = 'block';
  document.getElementById('loadingState').style.display = 'block';
  
  await sleep(2000);
  
  document.getElementById('loadingState').style.display = 'none';
  
  const insights = [
    { icon: '🔥', text: 'Martial arts equipment is trending up 45% this month' },
    { icon: '💰', text: 'Average profit margin in this niche: 58%' },
    { icon: '📈', text: 'Best selling items: Training shoes, gloves, and protective gear' },
    { icon: '🎯', text: 'Target audience: Ages 18-35, fitness enthusiasts' },
    { icon: '⚡', text: 'Low competition opportunity: Specialized training equipment' }
  ];
  
  const insightsList = document.getElementById('insightsList');
  insightsList.innerHTML = insights.map(insight => `
    <div class="insight-item">
      <span class="insight-icon">${insight.icon}</span>
      <span>${insight.text}</span>
    </div>
  `).join('');
  
  // Also show products
  searchProducts();
}

// Display products in grid with validation
async function displayProducts(products) {
  const container = document.getElementById('resultsContainer');
  
  if (products.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding:40px;">No products found. Try different search criteria.</p>';
    return;
  }
  
  // Validate each product and display
  const productCards = await Promise.all(products.map(async product => {
    const profitMargin = ((product.price - product.cost) / product.price * 100).toFixed(0);
    const profitClass = profitMargin >= 50 ? 'profit-high' : 'profit-medium';
    
    // Run validation
    const validation = await validateProduct(product.name, product.id);
    const statusClass = `validation-${validation.status}`;
    const statusIcon = validation.status === 'green' ? '✓' : validation.status === 'amber' ? '!' : '✗';
    
    return `
      <div class="product-card">
        <div class="validation-badge ${statusClass}">
          ${statusIcon}
        </div>
        
        <div class="product-image">
          ${getProductEmoji(product.category)}
        </div>
        <div class="product-info">
          <div class="product-title">${product.name}</div>
          
          <div class="validation-score">
            Validation Score: ${validation.score}/100
          </div>
          
          <div class="product-stats">
            <div class="stat">
              <div class="stat-label">Price</div>
              <div class="stat-value">$${product.price}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Cost</div>
              <div class="stat-value">$${product.cost}</div>
            </div>
            <div class="stat">
              <div class="stat-label">Profit</div>
              <div class="stat-value">${profitMargin}%</div>
            </div>
          </div>
          
          <span class="profit-badge ${profitClass}">
            ${profitMargin >= 50 ? 'High Profit' : 'Good Profit'}
          </span>
          
          <div class="validation-details">
            <strong>${validation.recommendation.action}</strong>
            <div style="font-size:12px; margin-top:5px; color:#666;">
              ${validation.recommendation.message}
            </div>
            ${validation.signals.slice(0, 3).map(signal => `
              <div class="validation-signal">
                <span class="signal-icon">${signal.type === 'green' ? '✓' : signal.type === 'amber' ? '⚠' : '✗'}</span>
                <span>${signal.text}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="demand-indicator">
            <span style="font-size:12px; color:#666;">Demand:</span>
            <div class="demand-bar">
              <div class="demand-fill" style="width:${product.demand}%"></div>
            </div>
            <span style="font-size:12px; font-weight:600;">${product.demand}%</span>
          </div>
          
          <div style="font-size:12px; color:#666; margin:5px 0;">
            📦 ${product.sales} monthly sales | ⭐ ${product.rating}
          </div>
          
          <div class="action-buttons">
            <button class="btn-add" onclick="addToStore(${product.id})" 
                    ${validation.status === 'red' ? 'style="background:#ef4444;" title="Not recommended"' : ''}>
              ${validation.status === 'green' ? '✓ ' : validation.status === 'red' ? '⚠ ' : ''}Add to Store
            </button>
            <button class="btn-details" onclick="viewValidation(${product.id})">
              Details
            </button>
          </div>
        </div>
      </div>
    `;
  }));
  
  container.innerHTML = productCards.join('');
}

// Get emoji for product category
function getProductEmoji(category) {
  const emojis = {
    sports: '🥋',
    fashion: '👕',
    home: '🏠',
    electronics: '📱',
    pets: '🐾',
    beauty: '💄'
  };
  return emojis[category] || '📦';
}

// Add product to store
function addToStore(productId) {
  const product = sampleProducts.find(p => p.id === productId);
  
  // Save to localStorage
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  
  // Show success message
  alert(`✅ "${product.name}" selected!\n\nRedirecting to Store Builder to create your store...`);
  
  // Redirect to Store Builder
  window.location.href = './store-builder-advanced.html';
}

// View product details
function viewDetails(productId) {
  viewValidation(productId);
}

// View full validation report
async function viewValidation(productId) {
  const product = sampleProducts.find(p => p.id === productId);
  const validation = await validateProduct(product.name, product.id);
  
  const alertsText = validation.alerts.length > 0 ? '\n\nALERTS:\n' + validation.alerts.join('\n') : '';
  const signalsText = '\n\nVALIDATION SIGNALS:\n' + validation.signals.map(s => 
    `${s.type === 'green' ? '✓' : s.type === 'amber' ? '⚠' : '✗'} ${s.text}`
  ).join('\n');
  
  const nextStepsText = '\n\nNEXT STEPS:\n' + validation.recommendation.nextSteps.map((step, i) => 
    `${i + 1}. ${step}`
  ).join('\n');
  
  alert(`
🔍 VALIDATION REPORT: ${product.name}

${validation.recommendation.action}
${validation.recommendation.message}

Confidence: ${validation.recommendation.confidence}
Overall Score: ${validation.score}/100
${signalsText}${alertsText}${nextStepsText}
  `);
}

// Helper function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Auto-load some products
  displayProducts(sampleProducts);
});
