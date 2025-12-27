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
    orders: 12000,
    description: "Transform your yoga practice with our premium non-slip yoga mat featuring innovative alignment lines. Perfect for beginners and advanced practitioners alike, this eco-friendly mat provides superior grip and cushioning for all your poses.",
    features: ["Non-slip textured surface", "6mm thick cushioning", "Alignment guide lines", "Eco-friendly TPE material", "Lightweight & portable", "Easy to clean"],
    sizes: ["Standard (68\" x 24\")", "Extra Long (72\" x 26\")", "Extra Wide (72\" x 30\")"],
    colors: ["Purple", "Blue", "Green", "Pink", "Black"],
    targetAudience: "Yoga enthusiasts, fitness lovers, home workout practitioners"
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
    orders: 15000,
    description: "Experience professional-grade skincare at home with our advanced LED light therapy face mask. Featuring 7 different light wavelengths, this FDA-cleared device reduces wrinkles, fights acne, and promotes collagen production for radiant, youthful skin.",
    features: ["7 LED light colors", "FDA cleared technology", "Reduces fine lines & wrinkles", "Fights acne & inflammation", "Promotes collagen production", "Wireless & rechargeable"],
    sizes: ["One Size (Adjustable)"],
    colors: ["White"],
    targetAudience: "Skincare enthusiasts, anti-aging seekers, beauty conscious individuals"
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
    orders: 18000,
    description: "Blend your favorite smoothies anywhere with our powerful USB rechargeable portable blender. Perfect for busy professionals, gym-goers, and travelers who want fresh, healthy drinks on the go. Powerful 6-blade system blends ice, frozen fruit, and more in seconds.",
    features: ["USB rechargeable battery", "6 stainless steel blades", "BPA-free Tritan material", "One-touch blending", "20oz capacity", "Easy to clean"],
    sizes: ["14oz", "20oz", "24oz"],
    colors: ["Pink", "Blue", "Black", "White", "Green"],
    targetAudience: "Fitness enthusiasts, busy professionals, travelers, health-conscious individuals"
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
    orders: 11000,
    description: "Never worry about your pet's meals again with our WiFi-enabled smart pet feeder. Built-in HD camera lets you see, talk to, and feed your pet from anywhere using your smartphone. Customizable portion control and feeding schedules keep your pet healthy and happy.",
    features: ["HD camera with night vision", "Two-way audio communication", "Customizable feeding schedule", "Portion control (1-12 portions)", "WiFi app control", "6L large capacity"],
    sizes: ["4L Capacity", "6L Capacity", "8L Capacity"],
    colors: ["White", "Black"],
    targetAudience: "Pet owners, busy professionals, travelers, tech-savvy pet parents"
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
    orders: 16000,
    description: "Build strength and tone your body anywhere with our premium 5-level resistance bands set. Made from natural latex, these durable bands are perfect for home workouts, physical therapy, and strength training. Includes door anchor, handles, and ankle straps for unlimited exercise options.",
    features: ["5 resistance levels (10-50 lbs)", "Natural latex material", "Door anchor included", "Comfortable foam handles", "Ankle straps included", "Portable carry bag"],
    sizes: ["Standard Set (5 bands)", "Pro Set (5 bands + accessories)", "Ultimate Set (7 bands + accessories)"],
    colors: ["Multi-color (color-coded by resistance)"],
    targetAudience: "Fitness enthusiasts, home workout practitioners, physical therapy patients"
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
    orders: 14000,
    description: "Charge your phone effortlessly with our sleek wireless charging stand. Fast 15W charging for compatible devices, with adjustable viewing angles perfect for video calls, watching content, or monitoring notifications. Case-friendly design works through most phone cases up to 5mm thick.",
    features: ["15W fast wireless charging", "Adjustable viewing angle", "Case-friendly (up to 5mm)", "LED charging indicator", "Over-charge protection", "Non-slip base"],
    sizes: ["Standard", "Dual Device"],
    colors: ["Black", "White", "Silver"],
    targetAudience: "Smartphone users, office workers, tech enthusiasts, minimalists"
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
    orders: 13000,
    description: "Say goodbye to single-use plastic with our eco-friendly reusable silicone food storage bags. Made from food-grade platinum silicone, these leak-proof bags are perfect for storing snacks, fruits, sandwiches, and more. Microwave, freezer, and dishwasher safe for ultimate convenience.",
    features: ["100% food-grade silicone", "Leak-proof seal", "Microwave & freezer safe", "Dishwasher safe", "BPA & PVC free", "Eco-friendly & reusable"],
    sizes: ["Small (2 cups)", "Medium (4 cups)", "Large (6 cups)", "Mixed Set (6 bags)"],
    colors: ["Clear", "Blue", "Green", "Multi-color Set"],
    targetAudience: "Eco-conscious consumers, parents, meal preppers, zero-waste advocates"
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
    orders: 14500,
    description: "Improve your posture and reduce back pain with our comfortable, adjustable posture corrector. Designed by chiropractors, this lightweight brace gently pulls your shoulders back to train your muscles for proper alignment. Wear under or over clothing for all-day comfort and support.",
    features: ["Adjustable shoulder straps", "Breathable mesh material", "Lightweight & comfortable", "Suitable for men & women", "Improves posture naturally", "Reduces back & neck pain"],
    sizes: ["Small (28-34\")", "Medium (35-41\")", "Large (42-48\")", "X-Large (49-55\")"],
    colors: ["Black", "Beige", "Gray"],
    targetAudience: "Office workers, gamers, people with back pain, posture-conscious individuals"
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
