// In-Memory Caching System
// Production-ready alternative to Redis for testing
// Can be replaced with Redis in production

class MemoryCache {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
  }

  async get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    // Check if expired
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  async set(key, value, ttl = 86400) {
    const expiresAt = Date.now() + (ttl * 1000);
    
    this.cache.set(key, {
      value,
      expiresAt
    });

    // Clear existing timer
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Set expiration timer
    const timer = setTimeout(() => {
      this.cache.delete(key);
      this.timers.delete(key);
    }, ttl * 1000);

    this.timers.set(key, timer);
    
    return true;
  }

  async del(key) {
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
    this.cache.delete(key);
    return true;
  }

  async exists(key) {
    return this.cache.has(key);
  }

  async mget(keys) {
    return Promise.all(keys.map(key => this.get(key)));
  }

  async mset(keyValuePairs, ttl = 86400) {
    for (const [key, value] of Object.entries(keyValuePairs)) {
      await this.set(key, value, ttl);
    }
    return true;
  }

  async flush() {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.cache.clear();
    this.timers.clear();
    return true;
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

const cache = new MemoryCache();

console.log('✅ In-memory cache initialized');

module.exports = { cache };
