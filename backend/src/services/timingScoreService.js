// ===================================================
// Viral Product Timing Score Service
// Calculates if product is rising, flat, or declining
// ===================================================

const NodeCache = require('node-cache');

class TimingScoreService {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 86400 }); // 24 hour cache
  }

  // ===================================================
  // Calculate Timing Score
  // ===================================================
  async calculateTimingScore(productKeyword, socialProofData) {
    try {
      console.log(`⏱️ Calculating timing score for: ${productKeyword}`);

      const cacheKey = `timing_${productKeyword}`;
      const cached = this.cache.get(cacheKey);
      if (cached) return cached;

      // Analyze trend direction
      const googleTrend = socialProofData?.googleTrends?.trend || 'flat';
      const tiktokTrend = socialProofData?.tiktok?.growthTrend || 'flat';
      const facebookActive = socialProofData?.facebook?.isBeingAdvertised || false;

      // Calculate trend score
      let trendScore = 0;
      let trend = 'flat';

      if (googleTrend === 'rising' && tiktokTrend === 'rising') {
        trendScore = 90;
        trend = 'rising';
      } else if (googleTrend === 'rising' || tiktokTrend === 'rising') {
        trendScore = 70;
        trend = 'rising';
      } else if (googleTrend === 'declining' || tiktokTrend === 'declining') {
        trendScore = 20;
        trend = 'declining';
      } else {
        trendScore = 50;
        trend = 'flat';
      }

      // Boost score if actively advertised
      if (facebookActive) {
        trendScore = Math.min(100, trendScore + 10);
      }

      const result = {
        trend,
        score: trendScore,
        confidence: 0.85,
        recommendation: this.getTrendRecommendation(trend, trendScore),
        details: {
          googleTrend,
          tiktokTrend,
          facebookActive,
          timing: this.getOptimalTiming(trend)
        }
      };

      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('❌ Timing score error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get Trend Recommendation
  // ===================================================
  getTrendRecommendation(trend, score) {
    if (trend === 'rising' && score >= 80) {
      return '🚀 Perfect timing! Product is rising - LAUNCH NOW';
    } else if (trend === 'rising' && score >= 60) {
      return '📈 Good timing - Product is gaining momentum';
    } else if (trend === 'flat' && score >= 60) {
      return '➡️ Stable - Product has consistent demand';
    } else if (trend === 'flat' && score < 60) {
      return '⚠️ Caution - Limited demand signals';
    } else if (trend === 'declining') {
      return '📉 Avoid - Product is losing momentum';
    }
  }

  // ===================================================
  // Get Optimal Timing
  // ===================================================
  getOptimalTiming(trend) {
    const timings = {
      rising: {
        action: 'Launch immediately',
        urgency: 'High',
        window: '1-2 weeks',
        reason: 'Catch the wave before saturation'
      },
      flat: {
        action: 'Can launch anytime',
        urgency: 'Medium',
        window: '2-4 weeks',
        reason: 'Stable demand allows flexible timing'
      },
      declining: {
        action: 'Do not launch',
        urgency: 'Low',
        window: 'N/A',
        reason: 'Product is losing popularity'
      }
    };

    return timings[trend] || timings.flat;
  }

  // ===================================================
  // Predict Future Trend
  // ===================================================
  async predictFutureTrend(productKeyword, currentTrend) {
    try {
      console.log(`🔮 Predicting future trend for: ${productKeyword}`);

      // Simulated prediction based on current trend
      let prediction = 'stable';
      let confidence = 0.75;

      if (currentTrend === 'rising') {
        // Rising products have 60% chance to continue rising, 30% to plateau, 10% to decline
        const rand = Math.random();
        if (rand < 0.6) {
          prediction = 'continue_rising';
        } else if (rand < 0.9) {
          prediction = 'plateau';
        } else {
          prediction = 'decline';
        }
      } else if (currentTrend === 'flat') {
        // Flat products have 40% chance to rise, 40% to stay flat, 20% to decline
        const rand = Math.random();
        if (rand < 0.4) {
          prediction = 'rise';
        } else if (rand < 0.8) {
          prediction = 'stay_flat';
        } else {
          prediction = 'decline';
        }
      } else {
        // Declining products rarely recover
        prediction = 'continue_declining';
        confidence = 0.90;
      }

      return {
        currentTrend,
        predictedTrend: prediction,
        confidence,
        timeframe: '2-4 weeks',
        recommendation: this.getPredictionRecommendation(prediction)
      };
    } catch (error) {
      console.error('❌ Prediction error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get Prediction Recommendation
  // ===================================================
  getPredictionRecommendation(prediction) {
    const recommendations = {
      continue_rising: '✅ Likely to keep rising - Good investment',
      plateau: '⚠️ May plateau soon - Launch quickly',
      decline: '❌ May decline - Consider alternative',
      rise: '📈 May start rising - Worth monitoring',
      stay_flat: '➡️ Will likely stay flat - Stable option',
      continue_declining: '🚫 Will likely continue declining - Avoid'
    };

    return recommendations[prediction] || 'Monitor closely';
  }

  // ===================================================
  // Compare Multiple Products by Timing
  // ===================================================
  compareProductTiming(products) {
    try {
      console.log(`🔄 Comparing timing for ${products.length} products`);

      const scored = products.map(p => ({
        ...p,
        timingScore: p.timingScore || 50,
        rank: 0
      }));

      // Sort by timing score
      scored.sort((a, b) => b.timingScore - a.timingScore);

      // Add ranking
      scored.forEach((p, i) => {
        p.rank = i + 1;
      });

      return {
        products: scored,
        bestTiming: scored[0],
        recommendation: `Product "${scored[0].title}" has the best timing (Score: ${scored[0].timingScore})`
      };
    } catch (error) {
      console.error('❌ Comparison error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get Seasonal Trends
  // ===================================================
  getSeasonalTrends() {
    const month = new Date().getMonth();
    const seasonalProducts = {
      0: { season: 'Winter', trending: ['heating pads', 'thermal clothing', 'hot drinks'] },
      1: { season: 'Winter', trending: ['fitness equipment', 'supplements', 'yoga mats'] },
      2: { season: 'Spring', trending: ['gardening tools', 'outdoor furniture', 'sports gear'] },
      3: { season: 'Spring', trending: ['camping equipment', 'bicycles', 'hiking gear'] },
      4: { season: 'Summer', trending: ['beach items', 'sunscreen', 'outdoor games'] },
      5: { season: 'Summer', trending: ['pool equipment', 'coolers', 'outdoor speakers'] },
      6: { season: 'Summer', trending: ['travel accessories', 'camping gear', 'outdoor lighting'] },
      7: { season: 'Summer', trending: ['back to school', 'office supplies', 'desk organizers'] },
      8: { season: 'Fall', trending: ['Halloween costumes', 'decorations', 'fall fashion'] },
      9: { season: 'Fall', trending: ['Thanksgiving decor', 'kitchen gadgets', 'home organization'] },
      10: { season: 'Winter', trending: ['Christmas gifts', 'holiday decorations', 'gift wrapping'] },
      11: { season: 'Winter', trending: ['holiday gifts', 'party supplies', 'New Year items'] }
    };

    return seasonalProducts[month];
  }
}

module.exports = new TimingScoreService();
