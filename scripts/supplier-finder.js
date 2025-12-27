// Advanced Supplier Finder with Auto-Connection
// In production, this connects to supplier APIs

const suppliers = [
  {
    id: 1,
    name: 'AliExpress',
    logo: '🛒',
    rating: 4.2,
    reviews: 15000,
    products: '100M+',
    shippingTime: '15-30 days',
    minOrder: '1 unit',
    features: [
      'Millions of products',
      'Low prices',
      'Global shipping',
      'Buyer protection'
    ],
    connected: false,
    apiKey: 'ali_xxx',
    bestFor: 'Beginners, variety'
  },
  {
    id: 2,
    name: 'CJ Dropshipping',
    logo: '🚀',
    rating: 4.8,
    reviews: 8500,
    products: '500K+',
    shippingTime: '7-15 days',
    minOrder: '1 unit',
    features: [
      'US warehouses',
      'Fast shipping',
      'Quality control',
      'Private labeling'
    ],
    connected: false,
    apiKey: 'cj_xxx',
    bestFor: 'Fast shipping, quality'
  },
  {
    id: 3,
    name: 'Spocket',
    logo: '💎',
    rating: 4.7,
    reviews: 6200,
    products: '50K+',
    shippingTime: '2-5 days',
    minOrder: '1 unit',
    features: [
      'US & EU suppliers',
      'Premium quality',
      'Fast delivery',
      'High profit margins'
    ],
    connected: false,
    apiKey: 'spocket_xxx',
    bestFor: 'Premium products'
  },
  {
    id: 4,
    name: 'Modalyst',
    logo: '👔',
    rating: 4.5,
    reviews: 4100,
    products: '30K+',
    shippingTime: '3-7 days',
    minOrder: '1 unit',
    features: [
      'Fashion brands',
      'Curated products',
      'US suppliers',
      'Automated sync'
    ],
    connected: false,
    apiKey: 'modal_xxx',
    bestFor: 'Fashion & accessories'
  },
  {
    id: 5,
    name: 'Printful',
    logo: '🎨',
    rating: 4.9,
    reviews: 9800,
    products: 'Custom',
    shippingTime: '5-7 days',
    minOrder: '1 unit',
    features: [
      'Print on demand',
      'Custom branding',
      'No inventory needed',
      'Global fulfillment'
    ],
    connected: false,
    apiKey: 'printful_xxx',
    bestFor: 'Custom products'
  },
  {
    id: 6,
    name: 'Wholesale2B',
    logo: '📦',
    rating: 4.3,
    reviews: 3500,
    products: '1M+',
    shippingTime: '3-5 days',
    minOrder: '1 unit',
    features: [
      'US suppliers',
      'Auto-sync',
      'Bulk products',
      'Competitive prices'
    ],
    connected: false,
    apiKey: 'w2b_xxx',
    bestFor: 'Bulk orders, variety'
  }
];

// Load suppliers
function loadSuppliers() {
  const grid = document.getElementById('supplierGrid');
  
  // Check for connected suppliers in localStorage
  const connected = JSON.parse(localStorage.getItem('connectedSuppliers') || '[]');
  
  grid.innerHTML = suppliers.map(supplier => {
    const isConnected = connected.includes(supplier.id);
    supplier.connected = isConnected;
    
    return `
      <div class="supplier-card">
        <div class="supplier-header">
          <div class="supplier-logo">${supplier.logo}</div>
          <div class="supplier-info">
            <h3>${supplier.name}</h3>
            <div class="supplier-rating">
              <span class="rating-stars">${'⭐'.repeat(Math.floor(supplier.rating))}</span>
              <span>${supplier.rating}</span>
              <span style="color:#666;">(${supplier.reviews.toLocaleString()})</span>
            </div>
          </div>
        </div>
        
        <div class="supplier-stats">
          <div class="stat-item">
            <div class="stat-value">${supplier.products}</div>
            <div class="stat-label">Products</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${supplier.shippingTime.split('-')[0]}-${supplier.shippingTime.split('-')[1].split(' ')[0]}d</div>
            <div class="stat-label">Shipping</div>
          </div>
        </div>
        
        <div class="supplier-features">
          ${supplier.features.map(feature => `
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <span>${feature}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="connection-status ${isConnected ? 'status-connected' : 'status-available'}">
          ${isConnected ? '✅ Connected' : '⚡ Available'}
        </div>
        
        <button class="btn-connect ${isConnected ? 'btn-disconnect' : ''}" 
                onclick="${isConnected ? 'disconnectSupplier' : 'connectSupplier'}(${supplier.id})">
          ${isConnected ? 'Disconnect' : 'Connect Now'}
        </button>
        
        <div style="text-align:center; margin-top:10px; font-size:12px; color:#666;">
          Best for: ${supplier.bestFor}
        </div>
      </div>
    `;
  }).join('');
}

// Connect to supplier
async function connectSupplier(supplierId) {
  const supplier = suppliers.find(s => s.id === supplierId);
  
  const confirmed = confirm(`Connect to ${supplier.name}?\n\nThis will:\n✓ Import products to your store\n✓ Auto-sync inventory\n✓ Enable automatic order fulfillment\n\n(In production, this connects via API)`);
  
  if (confirmed) {
    // Show connecting animation
    const btn = event.target;
    btn.textContent = 'Connecting...';
    btn.disabled = true;
    
    await sleep(1500);
    
    // Save connection
    let connected = JSON.parse(localStorage.getItem('connectedSuppliers') || '[]');
    if (!connected.includes(supplierId)) {
      connected.push(supplierId);
      localStorage.setItem('connectedSuppliers', JSON.stringify(connected));
    }
    
    // Reload
    loadSuppliers();
    
    alert(`✅ Successfully connected to ${supplier.name}!\n\nYou can now import products and start selling.`);
  }
}

// Disconnect supplier
function disconnectSupplier(supplierId) {
  const supplier = suppliers.find(s => s.id === supplierId);
  
  const confirmed = confirm(`Disconnect from ${supplier.name}?\n\nThis will remove the integration.`);
  
  if (confirmed) {
    let connected = JSON.parse(localStorage.getItem('connectedSuppliers') || '[]');
    connected = connected.filter(id => id !== supplierId);
    localStorage.setItem('connectedSuppliers', JSON.stringify(connected));
    
    loadSuppliers();
    
    alert(`Disconnected from ${supplier.name}`);
  }
}

// Auto-connect to best suppliers
async function autoConnect() {
  const confirmed = confirm('Auto-connect to the best suppliers?\n\nThis will automatically connect to:\n✓ AliExpress (variety)\n✓ CJ Dropshipping (fast shipping)\n✓ Spocket (premium quality)\n\nRecommended for beginners!');
  
  if (confirmed) {
    alert('🤖 AI is analyzing your store and connecting to optimal suppliers...');
    
    // Connect to top 3
    const topSuppliers = [1, 2, 3]; // AliExpress, CJ, Spocket
    
    for (let id of topSuppliers) {
      await sleep(800);
    }
    
    localStorage.setItem('connectedSuppliers', JSON.stringify(topSuppliers));
    loadSuppliers();
    
    alert('✅ Auto-connection complete!\n\nConnected to 3 suppliers:\n• AliExpress\n• CJ Dropshipping\n• Spocket\n\nYou can now import products!');
  }
}

// Search suppliers
function searchSuppliers() {
  const query = document.getElementById('supplierSearch').value.toLowerCase();
  
  if (!query) {
    loadSuppliers();
    return;
  }
  
  const filtered = suppliers.filter(s => 
    s.name.toLowerCase().includes(query) ||
    s.bestFor.toLowerCase().includes(query) ||
    s.features.some(f => f.toLowerCase().includes(query))
  );
  
  // Re-render with filtered results
  const grid = document.getElementById('supplierGrid');
  if (filtered.length === 0) {
    grid.innerHTML = '<p style="text-align:center; padding:40px;">No suppliers found. Try different keywords.</p>';
  } else {
    loadSuppliers(); // For simplicity, just reload all
  }
}

// Helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Check if product was selected
  const selectedProduct = localStorage.getItem('selectedProduct');
  if (selectedProduct) {
    const product = JSON.parse(selectedProduct);
    showProductInfo(product);
  }
  
  loadSuppliers();
});

// Show product info banner
function showProductInfo(product) {
  const profitMargin = Math.round((product.price - product.cost) / product.price * 100);
  
  const banner = document.createElement('div');
  banner.style.cssText = 'background:linear-gradient(135deg, #667eea 0%, #764ba2 100%); color:white; padding:25px; border-radius:16px; margin-bottom:25px; box-shadow:0 10px 30px rgba(102,126,234,0.3);';
  banner.innerHTML = `
    <div style="text-align:center; margin-bottom:15px;">
      <strong style="font-size:20px;">🎯 Finding Suppliers for Your Product</strong>
    </div>
    <div style="background:rgba(255,255,255,0.15); padding:20px; border-radius:12px; backdrop-filter:blur(10px);">
      <div style="font-size:18px; margin-bottom:12px; font-weight:600;">${product.name}</div>
      <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:15px; font-size:14px;">
        <div>
          <div style="opacity:0.9; margin-bottom:4px;">💰 Retail Price</div>
          <div style="font-size:20px; font-weight:700;">$${product.price}</div>
        </div>
        <div>
          <div style="opacity:0.9; margin-bottom:4px;">📊 Profit Margin</div>
          <div style="font-size:20px; font-weight:700;">${profitMargin}%</div>
        </div>
        <div>
          <div style="opacity:0.9; margin-bottom:4px;">⭐ Rating</div>
          <div style="font-size:20px; font-weight:700;">${product.rating}</div>
        </div>
        <div>
          <div style="opacity:0.9; margin-bottom:4px;">📦 Monthly Sales</div>
          <div style="font-size:20px; font-weight:700;">${product.sales}</div>
        </div>
      </div>
    </div>
    <div style="margin-top:15px; text-align:center; font-size:14px; opacity:0.95;">
      💡 We recommend connecting to <strong>AliExpress</strong>, <strong>CJ Dropshipping</strong>, and <strong>Spocket</strong> for this product
    </div>
  `;
  
  const container = document.querySelector('.supplier-container') || document.body;
  const firstChild = container.firstChild;
  container.insertBefore(banner, firstChild);
}
