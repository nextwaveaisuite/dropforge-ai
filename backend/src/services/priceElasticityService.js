// ===================================================
// Price Elasticity Service\n// Calculates optimal sell price based on market data\n// ===================================================

const NodeCache = require('node-cache');

class PriceElasticityService {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 86400 }); // 24 hour cache
  }

  // ===================================================
  // Calculate Optimal Sell Price\n  // ===================================================
  async calculateOptimalPrice(product, marketData = {}) {
    try {
      console.log(`💰 Calculating optimal price for: ${product.title}`);

      const cacheKey = `price_${product.id}`;
      const cached = this.cache.get(cacheKey);
      if (cached) return cached;

      const buyPrice = product.price;
      const category = product.category || 'general';

      // Get base multiplier for category
      const baseMultiplier = this.getCategoryMultiplier(category);

      // Calculate price points
      const conservativePrice = Math.round(buyPrice * baseMultiplier * 0.8);
      const optimalPrice = Math.round(buyPrice * baseMultiplier);
      const aggressivePrice = Math.round(buyPrice * baseMultiplier * 1.2);

      // Calculate margins
      const margins = {
        conservative: this.calculateMargin(buyPrice, conservativePrice),
        optimal: this.calculateMargin(buyPrice, optimalPrice),
        aggressive: this.calculateMargin(buyPrice, aggressivePrice)
      };

      // Adjust based on market data
      const adjustedPrice = this.adjustPriceByMarket(optimalPrice, marketData);

      // Get competitor pricing if available
      const competitorAnalysis = this.analyzeCompetitorPricing(
        buyPrice,
        marketData.competitorPrices || []
      );

      const result = {
        buyPrice,
        pricePoints: {
          conservative: conservativePrice,
          optimal: optimalPrice,
          aggressive: aggressivePrice
        },
        margins,
        recommendedPrice: adjustedPrice,
        priceRange: {
          min: conservativePrice,
          max: aggressivePrice,
          sweet_spot: optimalPrice
        },
        competitorAnalysis,
        confidence: 0.85,
        recommendation: this.getPriceRecommendation(optimalPrice, margins.optimal)
      };

      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('❌ Price calculation error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get Category Multiplier\n  // ===================================================
  getCategoryMultiplier(category) {
    const multipliers = {
      'electronics': 3.5,
      'fashion': 4.0,
      'home': 3.5,
      'beauty': 4.5,
      'sports': 3.5,
      'toys': 4.0,
      'accessories': 4.5,
      'health': 4.0,
      'general': 3.5
    };

    return multipliers[category.toLowerCase()] || 3.5;
  }

  // ===================================================
  // Calculate Profit Margin\n  // ===================================================
  calculateMargin(buyPrice, sellPrice, adCost = 10) {
    const profit = sellPrice - buyPrice - adCost;
    const margin = (profit / sellPrice) * 100;

    return {
      profit: Math.round(profit * 100) / 100,
      margin: Math.round(margin * 100) / 100,
      isViable: margin >= 30
    };
  }

  // ===================================================
  // Adjust Price by Market Data\n  // ===================================================
  adjustPriceByMarket(basePrice, marketData) {
    let adjustedPrice = basePrice;

    // Adjust based on demand
    if (marketData.demandScore) {
      if (marketData.demandScore > 80) {
        adjustedPrice = Math.round(basePrice * 1.1); // 10% increase for high demand
      } else if (marketData.demandScore < 40) {
        adjustedPrice = Math.round(basePrice * 0.9); // 10% decrease for low demand
      }
    }

    // Adjust based on competition
    if (marketData.competitionLevel) {
      if (marketData.competitionLevel === 'high') {
        adjustedPrice = Math.round(basePrice * 0.95); // Slight decrease
      } else if (marketData.competitionLevel === 'low') {
        adjustedPrice = Math.round(basePrice * 1.05); // Slight increase
      }
    }

    // Adjust based on seasonality
    if (marketData.seasonalMultiplier) {
      adjustedPrice = Math.round(basePrice * marketData.seasonalMultiplier);
    }

    return adjustedPrice;
  }

  // ===================================================
  // Analyze Competitor Pricing\n  // ===================================================
  analyzeCompetitorPricing(buyPrice, competitorPrices) {
    if (!competitorPrices || competitorPrices.length === 0) {
      return {
        averageCompetitorPrice: null,
        pricePosition: 'no_data',
        recommendation: 'Use standard markup'
      };
    }

    const avgPrice = competitorPrices.reduce((a, b) => a + b, 0) / competitorPrices.length;
    const minPrice = Math.min(...competitorPrices);
    const maxPrice = Math.max(...competitorPrices);

    return {
      averageCompetitorPrice: Math.round(avgPrice),
      minCompetitorPrice: minPrice,
      maxCompetitorPrice: maxPrice,
      priceRange: maxPrice - minPrice,
      recommendation: this.getPricingRecommendation(avgPrice, buyPrice),
      positioningStrategy: this.getPositioningStrategy(avgPrice, buyPrice)
    };
  }

  // ===================================================
  // Get Pricing Recommendation\n  // ===================================================
  getPricingRecommendation(optimalPrice, margin) {
    if (margin.margin >= 50) {
      return '✅ Excellent margin - Price is competitive and profitable';
    } else if (margin.margin >= 40) {
      return '✅ Good margin - Strong profitability';
    } else if (margin.margin >= 30) {
      return '⚠️ Acceptable margin - Minimum viable profit';
    } else {
      return '❌ Poor margin - Increase price or reduce costs';
    }
  }

  // ===================================================
  // Get Positioning Strategy\n  // ===================================================
  getPositioningStrategy(avgCompetitorPrice, buyPrice) {
    const strategies = {
      premium: {
        name: 'Premium Positioning',
        description: 'Price 10-20% above competitors',
        reason: 'Position as high-quality alternative',
        target: Math.round(avgCompetitorPrice * 1.15)
      },
      competitive: {
        name: 'Competitive Positioning',
        description: 'Price at or slightly below competitors',
        reason: 'Attract price-sensitive customers',
        target: Math.round(avgCompetitorPrice * 0.95)
      },
      value: {
        name: 'Value Positioning',
        description: 'Price 5-10% below competitors',
        reason: 'Offer best value proposition',
        target: Math.round(avgCompetitorPrice * 0.90)
      }
    };

    // Determine which strategy based on margin
    const margin = ((avgCompetitorPrice - buyPrice) / avgCompetitorPrice) * 100;

    if (margin >= 50) {
      return strategies.premium;
    } else if (margin >= 35) {
      return strategies.competitive;
    } else {
      return strategies.value;
    }
  }

  // ===================================================
  // Price Sensitivity Analysis\n  // ===================================================
  analyzePriceSensitivity(basePrice, productType = 'general') {
    // Elasticity estimates by product type
    const elasticity = {
      'electronics': -1.5,      // Highly elastic
      'fashion': -1.2,          // Elastic
      'luxury': -0.8,           // Inelastic
      'essentials': -0.5,       // Very inelastic
      'general': -1.0           // Neutral
    };

    const e = elasticity[productType] || -1.0;

    // Calculate demand at different price points
    const pricePoints = [
      basePrice * 0.8,
      basePrice * 0.9,
      basePrice,
      basePrice * 1.1,
      basePrice * 1.2
    ];

    const demandCurve = pricePoints.map(price => ({
      price: Math.round(price),
      estimatedDemand: Math.round(100 * Math.pow(price / basePrice, e)),
      revenue: Math.round(price * 100 * Math.pow(price / basePrice, e))
    }));

    // Find optimal price (max revenue)
    const optimalPoint = demandCurve.reduce((max, current) =>
      current.revenue > max.revenue ? current : max
    );

    return {
      elasticity: e,
      demandCurve,
      optimalPrice: optimalPoint.price,
      maxRevenue: optimalPoint.revenue,
      priceRange: {
        min: Math.round(basePrice * 0.7),
        max: Math.round(basePrice * 1.3)
      }
    };
  }

  // ===================================================
  // A/B Test Price Recommendations\n  // ===================================================
  generateABTestPrices(basePrice, margin = 0.4) {
    const controlPrice = basePrice / (1 - margin);
    const testPrices = [
      {
        name: 'Price A (Control)',
        price: Math.round(controlPrice),
        margin: margin,
        expectedConversion: 100
      },
      {
        name: 'Price B (10% Higher)',
        price: Math.round(controlPrice * 1.1),
        margin: margin * 1.1,
        expectedConversion: 85
      },
      {
        name: 'Price C (10% Lower)',
        price: Math.round(controlPrice * 0.9),
        margin: margin * 0.9,
        expectedConversion: 115
      },
      {
        name: 'Price D (20% Higher)',
        price: Math.round(controlPrice * 1.2),
        margin: margin * 1.2,
        expectedConversion: 70
      }
    ];

    return {
      testPrices,
      recommendation: 'Run A/B test for 1-2 weeks to find optimal price',
      expectedOutcome: 'Identify price point that maximizes revenue'
    };
  }
}

module.exports = new PriceElasticityService();
