// ===================================================
// Creative Swipe File Service\n// Pulls Facebook & TikTok ad examples for inspiration\n// ===================================================

const NodeCache = require('node-cache');

class CreativeSwipeService {
  constructor() {
    this.cache = new NodeCache({ stdTTL: 604800 }); // 7 day cache
  }

  // ===================================================
  // Get Facebook Ad Swipes\n  // ===================================================\n  async getFacebookAdSwipes(productKeyword, category = 'general') {
    try {
      console.log(`📱 Fetching Facebook ad swipes for: ${productKeyword}`);

      const cacheKey = `facebook_swipes_${productKeyword}`;
      const cached = this.cache.get(cacheKey);
      if (cached) return cached;

      const swipes = [
        {
          id: 1,
          platform: 'facebook',
          adType: 'carousel',
          headline: `Finally! The ${productKeyword} That Actually Works`,
          body: `✅ Trusted by 50,000+ customers\n✅ 30-day money-back guarantee\n✅ Free shipping on orders over $50`,
          cta: 'Shop Now',
          angle: 'Problem-Solution',
          engagementScore: 8.5,
          estimatedCTR: '3.2%'
        },
        {
          id: 2,
          platform: 'facebook',
          adType: 'single_image',
          headline: `Don't Miss Out: Limited Stock Available`,
          body: `Get your ${productKeyword} before they're gone!\n⏰ Only 47 left in stock\n🚚 Ships within 24 hours`,
          cta: 'Grab Yours',
          angle: 'Scarcity',
          engagementScore: 7.8,
          estimatedCTR: '2.8%'
        },
        {
          id: 3,
          platform: 'facebook',
          adType: 'video',
          headline: `Watch How This ${productKeyword} Changed Everything`,
          body: `See real results from real customers (30 sec video)`,
          cta: 'Watch Now',
          angle: 'Social Proof',
          engagementScore: 9.2,
          estimatedCTR: '4.1%'
        },
        {
          id: 4,
          platform: 'facebook',
          adType: 'collection',
          headline: `Save 40% on Premium ${productKeyword}`,
          body: `Use code: SAVE40\nValid for 48 hours only`,
          cta: 'Claim Discount',
          angle: 'Discount/Urgency',
          engagementScore: 8.9,
          estimatedCTR: '3.9%'
        }
      ];

      this.cache.set(cacheKey, swipes);
      return swipes;
    } catch (error) {
      console.error('❌ Facebook swipes error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get TikTok Video Swipes\n  // ===================================================\n  async getTikTokVideoSwipes(productKeyword) {
    try {
      console.log(`🎵 Fetching TikTok video swipes for: ${productKeyword}`);

      const cacheKey = `tiktok_swipes_${productKeyword}`;
      const cached = this.cache.get(cacheKey);
      if (cached) return cached;

      const swipes = [
        {
          id: 1,
          platform: 'tiktok',
          videoType: 'before_after',
          hook: 'POV: You finally found the perfect ${productKeyword}',
          script: `[0-3s] Show problem\n[3-6s] Show product\n[6-9s] Show results\n[9-15s] Call to action`,
          musicSuggestion: 'Trending upbeat track',
          duration: '15-30 seconds',
          engagementScore: 9.1,
          viewsEstimate: '500K-2M',
          angle: 'Transformation'
        },
        {
          id: 2,
          platform: 'tiktok',
          videoType: 'unboxing',
          hook: 'Unboxing the ${productKeyword} everyone is talking about',
          script: `[0-2s] Grab attention\n[2-8s] Unbox product\n[8-12s] Show features\n[12-15s] Final thoughts`,
          musicSuggestion: 'Upbeat, trendy',
          duration: '15 seconds',
          engagementScore: 8.7,
          viewsEstimate: '300K-1M',
          angle: 'Curiosity'
        },
        {
          id: 3,
          platform: 'tiktok',
          videoType: 'tutorial',
          hook: 'How to use ${productKeyword} like a pro',
          script: `[0-2s] Hook\n[2-8s] Step-by-step tutorial\n[8-12s] Pro tips\n[12-15s] CTA`,
          musicSuggestion: 'Educational, calm',
          duration: '15-30 seconds',
          engagementScore: 8.3,
          viewsEstimate: '200K-800K',
          angle: 'Educational'
        },
        {
          id: 4,
          platform: 'tiktok',
          videoType: 'trend_jacking',
          hook: 'POV: Using ${productKeyword} with [trending sound]',
          script: `Leverage trending audio + product demo`,
          musicSuggestion: 'Current trending sound',
          duration: '15 seconds',
          engagementScore: 9.4,
          viewsEstimate: '1M-5M',
          angle: 'Trend Jacking'
        }
      ];

      this.cache.set(cacheKey, swipes);
      return swipes;
    } catch (error) {
      console.error('❌ TikTok swipes error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get Instagram Ad Swipes\n  // ===================================================\n  async getInstagramAdSwipes(productKeyword) {
    try {
      console.log(`📸 Fetching Instagram ad swipes for: ${productKeyword}`);

      const cacheKey = `instagram_swipes_${productKeyword}`;
      const cached = this.cache.get(cacheKey);
      if (cached) return cached;

      const swipes = [
        {
          id: 1,
          platform: 'instagram',
          format: 'reel',
          hook: 'This ${productKeyword} is a game changer',
          caption: `✨ Finally found the perfect ${productKeyword}\n\n👇 Link in bio to shop\n\n#${productKeyword.replace(/\\s/g, '')} #musthave #shopnow`,
          engagementScore: 8.8,
          angle: 'Lifestyle'
        },
        {
          id: 2,
          platform: 'instagram',
          format: 'carousel',
          hook: 'Swipe to see the transformation',
          caption: `Before ➡️ After\n\nGet your ${productKeyword} today!\nLink in bio 🔗`,
          engagementScore: 8.5,
          angle: 'Results'
        }
      ];

      this.cache.set(cacheKey, swipes);
      return swipes;
    } catch (error) {
      console.error('❌ Instagram swipes error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get Email Swipes\n  // ===================================================\n  async getEmailSwipes(productKeyword) {
    try {
      console.log(`📧 Fetching email swipes for: ${productKeyword}`);

      const swipes = [
        {
          id: 1,
          type: 'subject_line',
          examples: [
            `This ${productKeyword} changed my life (and it can change yours)`,
            `Only 24 hours left: ${productKeyword} sale ends tonight`,
            `[Urgent] Your ${productKeyword} is waiting`,
            `See what 50,000 customers already know about ${productKeyword}`
          ]
        },
        {
          id: 2,
          type: 'body_copy',
          examples: [
            `Hi [Name],\n\nI wanted to personally tell you about the ${productKeyword} that's changing lives.\n\nFor years, I struggled with [problem]. Then I discovered [product].\n\nThe results? Incredible.\n\nNow I'm offering it to you at 40% off.\n\nBut only for the next 24 hours.\n\n[CTA Button]\n\nBest,\n[Your Name]`,
            `[Name], here's what you're missing...\n\n✅ Benefit 1\n✅ Benefit 2\n✅ Benefit 3\n\nGet your ${productKeyword} today →`
          ]
        }
      ];

      return swipes;
    } catch (error) {
      console.error('❌ Email swipes error:', error.message);
      throw error;
    }
  }

  // ===================================================
  // Get Copy Angles\n  // ===================================================\n  getCopyAngles() {
    return [
      {
        angle: 'Problem-Solution',
        description: 'Identify problem, present solution',
        example: 'Tired of [problem]? Try [product].'
      },
      {
        angle: 'Curiosity',
        description: 'Create intrigue and desire to learn more',
        example: 'You won\\'t believe what happened when I tried this...'
      },
      {
        angle: 'Social Proof',
        description: 'Leverage testimonials and reviews',
        example: '50,000+ customers can\\'t be wrong'
      },
      {
        angle: 'Scarcity',
        description: 'Create urgency with limited availability',
        example: 'Only 10 left in stock!'
      },
      {
        angle: 'Discount/Urgency',
        description: 'Time-limited offer',
        example: '40% off for 24 hours only'
      },
      {
        angle: 'Transformation',
        description: 'Before/after results',
        example: 'See the amazing transformation'
      },
      {
        angle: 'Trend Jacking',
        description: 'Leverage current trends',
        example: 'Everyone is talking about this'
      },
      {
        angle: 'Educational',
        description: 'Teach and provide value',
        example: 'Learn the secret that pros use'
      }
    ];
  }

  // ===================================================
  // Get Hook Examples\n  // ===================================================\n  getHookExamples(productKeyword) {
    return [
      `POV: You finally found the perfect ${productKeyword}`,
      `This ${productKeyword} is a game changer`,
      `Wait till you see what this ${productKeyword} does`,
      `If you use ${productKeyword}, you need to see this`,
      `The ${productKeyword} everyone is obsessed with`,
      `This ${productKeyword} just changed everything`,
      `POV: Using the best ${productKeyword} ever`,
      `Nobody talks about this ${productKeyword} hack`,
      `The ${productKeyword} hack that changed my life`,
      `This ${productKeyword} is insane (in a good way)`
    ];
  }

  // ===================================================
  // Generate Complete Ad Campaign\n  // ===================================================\n  async generateCompleteCampaign(productKeyword, category = 'general') {
    try {
      console.log(`🎬 Generating complete campaign for: ${productKeyword}`);

      const [facebook, tiktok, instagram, email] = await Promise.all([
        this.getFacebookAdSwipes(productKeyword, category),
        this.getTikTokVideoSwipes(productKeyword),
        this.getInstagramAdSwipes(productKeyword),
        this.getEmailSwipes(productKeyword)
      ]);

      return {
        productKeyword,
        campaign: {
          facebook,
          tiktok,
          instagram,
          email,
          copyAngles: this.getCopyAngles(),
          hooks: this.getHookExamples(productKeyword)
        },
        recommendation: 'Start with the highest engagement score swipes and A/B test',
        timeline: {
          week1: 'Test top 3 Facebook ads',
          week2: 'Test TikTok videos',
          week3: 'Optimize based on performance',
          week4: 'Scale winning ads'
        }
      };
    } catch (error) {
      console.error('❌ Campaign generation error:', error.message);
      throw error;
    }
  }
}

module.exports = new CreativeSwipeService();
