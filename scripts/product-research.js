// ===================================================
// DropForge AI - Product Research Module
// Real AliExpress Integration with Traffic Light System
// ===================================================

// ⚠️ UPDATE THIS FOR YOUR DEPLOYMENT
// Local testing: http://localhost:3000
// Production: https://your-backend-url.vercel.app
const API_BASE_URL = 'http://localhost:3000';

class ProductResearch {
  constructor( ) {
    this.currentPage = 1;
    this.pageSize = 20;
    this.currentKeyword = '';
    this.selectedProducts = [];
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.checkAPIHealth();
  }

  attachEventListeners() {
    // Search form
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => this.handleSearch(e));
    }

    // Search button
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.handleSearch());
    }

    // Pagination
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    if (prevBtn) prevBtn.addEventListener('click', () => this.previousPage());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());
  }

  // ===================================================
  // CHECK API HEALTH
  // ===================================================
  async checkAPIHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        console.log('✅ API Server Connected');
        this.showNotification('API Connected', 'success');
      }
    } catch (error) {
      console.error('❌ API Connection Failed:', error);
      this.showNotification('API Server Not Connected - Using Demo Mode', 'warning');
    }
  }

  // ===================================================
  // SEARCH PRODUCTS
  // ===================================================
  async handleSearch(e) {
    if (e) e.preventDefault();

    const keyword = document.getElementById('searchKeyword')?.value || '';
    
    if (!keyword.trim()) {
      this.showNotification('Please enter a search keyword', 'error');
      return;
    }

    this.currentKeyword = keyword;
    this.currentPage = 1;
    await this.searchProducts(keyword, 1);
  }

  async searchProducts(keyword, page) {
    try {
      const resultsDiv = document.getElementById('searchResults');
      resultsDiv.innerHTML = '<p class="loading">🔍 Searching for products...</p>';

      const response = await fetch(
        `${API_BASE_URL}/api/products/search?keyword=${encodeURIComponent(keyword)}&page=${page}&pageSize=${this.pageSize}`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data.products.length > 0) {
        this.displayProducts(data.data.products);
        this.updatePagination(page, data.data.total);
      } else {
        resultsDiv.innerHTML = '<p class="no-results">No products found. Try a different search term.</p>';
      }
    } catch (error) {
      console.error('❌ Search Error:', error);
      this.showNotification(`Error: ${error.message}`, 'error');
      document.getElementById('searchResults').innerHTML = 
        `<p class="error">Error searching products: ${error.message}</p>`;
    }
  }

  // ===================================================
  // DISPLAY PRODUCTS
  // ===================================================
  displayProducts(products) {
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv.innerHTML = '';

    products.forEach((product, index) => {
      const trafficLight = product.trafficLight || { status: 'AMBER', score: 50 };
      const statusColor = {
        'GREEN': '#10b981',
        'AMBER': '#f59e0b',
        'RED': '#ef4444'
      }[trafficLight.status] || '#6b7280';

      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
          <div class="traffic-light" style="background-color: ${statusColor};">
            <span class="status-text">${trafficLight.status}</span>
            <span class="score">${trafficLight.score}%</span>
          </div>
        </div>
        <div class="product-info">
          <h3>${product.title}</h3>
          <div class="product-stats">
            <div class="stat">
              <span class="label">Price:</span>
              <span class="value">$${product.price.toFixed(2 )}</span>
            </div>
            <div class="stat">
              <span class="label">Reviews:</span>
              <span class="value">${product.reviews.toLocaleString()}</span>
            </div>
            <div class="stat">
              <span class="label">Rating:</span>
              <span class="value">⭐ ${product.rating.toFixed(1)}</span>
            </div>
            <div class="stat">
              <span class="label">Sales:</span>
              <span class="value">${product.sales.toLocaleString()}</span>
            </div>
          </div>
          <div class="recommendation">
            <p>${trafficLight.recommendation}</p>
          </div>
          <div class="product-actions">
            <button class="btn-details" onclick="productResearch.viewDetails('${product.id}')">
              📋 View Details
            </button>
            <button class="btn-add" onclick="productResearch.addToStore('${product.id}', '${product.title}')">
              ➕ Add to Store
            </button>
          </div>
        </div>
      `;

      resultsDiv.appendChild(productCard);
    });
  }

  // ===================================================
  // VIEW PRODUCT DETAILS
  // ===================================================
  async viewDetails(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
      const data = await response.json();

      if (data.success) {
        this.showProductModal(data.data);
      }
    } catch (error) {
      this.showNotification(`Error loading details: ${error.message}`, 'error');
    }
  }

  showProductModal(product) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-btn" onclick="this.parentElement.parentElement.remove()">✕</button>
        <div class="modal-body">
          <div class="modal-image">
            <img src="${product.mainImage}" alt="${product.title}">
          </div>
          <div class="modal-details">
            <h2>${product.title}</h2>
            <p class="description">${product.description || 'No description available'}</p>
            <div class="details-grid">
              <div class="detail-item">
                <span class="label">Price:</span>
                <span class="value">$${product.price.toFixed(2)}</span>
              </div>
              <div class="detail-item">
                <span class="label">Reviews:</span>
                <span class="value">${product.reviews.toLocaleString()}</span>
              </div>
              <div class="detail-item">
                <span class="label">Rating:</span>
                <span class="value">⭐ ${product.rating.toFixed(1)}</span>
              </div>
              <div class="detail-item">
                <span class="label">Sales:</span>
                <span class="value">${product.sales.toLocaleString()}</span>
              </div>
            </div>
            <button class="btn-primary" onclick="productResearch.addToStore('${product.id}', '${product.title}')">
              ➕ Add to Store
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // ===================================================
  // ADD PRODUCT TO STORE
  // ===================================================
  addToStore(productId, productTitle) {
    this.selectedProducts.push({ id: productId, title: productTitle });
    this.showNotification(`✅ "${productTitle}" added to store!`, 'success');
    
    // Store in localStorage for store builder
    localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts));
  }

  // ===================================================
  // PAGINATION
  // ===================================================
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchProducts(this.currentKeyword, this.currentPage);
    }
  }

  nextPage() {
    this.currentPage++;
    this.searchProducts(this.currentKeyword, this.currentPage);
  }

  updatePagination(page, total) {
    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) {
      pageInfo.textContent = `Page ${page} of ${Math.ceil(total / this.pageSize)}`;
    }
  }

  // ===================================================
  // NOTIFICATIONS
  // ===================================================
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.productResearch = new ProductResearch();
});
