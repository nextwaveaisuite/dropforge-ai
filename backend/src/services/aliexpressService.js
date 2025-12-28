// ===================================================
// AliExpress API Service
// Handles all AliExpress API interactions
// ===================================================

const crypto = require("crypto");
const https = require("https" );
const NodeCache = require("node-cache");

class AliExpressService {
  constructor() {
    this.appKey = process.env.ALIEXPRESS_APP_KEY;
    this.appSecret = process.env.ALIEXPRESS_APP_SECRET;
    this.baseUrl = process.env.ALIEXPRESS_API_URL;
    this.cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache
  }

  // ===================================================
  // Generate Signature for AliExpress API (CORRECTED)
  // ===================================================
  generateSignature(params) {
    const sortedKeys = Object.keys(params).sort();
    let stringToSign = "";
    for (const key of sortedKeys) {
      stringToSign += key + params[key];
    }

    // The signature is a hash of the App Secret + the concatenated parameters
    const hmac = crypto.createHmac("sha256", this.appSecret);
    hmac.update(stringToSign);
    const signature = hmac.digest("hex").toUpperCase();
    return signature;
  }

  // ===================================================
  // Make API Request
  // ===================================================
  makeRequest(method, params) {
    return new Promise((resolve, reject) => {
      try {
        const requestParams = {
          app_key: this.appKey,
          sign_method: "sha256",
          timestamp: new Date().getTime(),
          method: method,
          ...params,
        };

        const signature = this.generateSignature(requestParams);
        requestParams.sign = signature;

        const queryString = Object.keys(requestParams)
          .map(
            (key) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(requestParams[key])}`
          )
          .join("&");

        const url = `${this.baseUrl}?${queryString}`;

        console.log(`📡 AliExpress API Request: ${method}`);

        https.get(url, (res ) => {
            let data = "";
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => {
              try {
                const response = JSON.parse(data);
                // Check for the correct response structure
                const resultKey = Object.keys(response)[0];
                const result = response[resultKey].result;

                if (result && result.resp_code === 200) {
                  resolve(result);
                } else {
                  reject(
                    new Error(result?.resp_msg || "AliExpress API Error")
                  );
                }
              } catch (e) {
                reject(new Error("Failed to parse AliExpress API response: " + data));
              }
            });
          }).on("error", (err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  // ===================================================
  // Search Products
  // ===================================================
  async searchProducts(keyword, page = 1, pageSize = 20) {
    try {
      const cacheKey = `search_${keyword}_${page}`;
      const cached = this.cache.get(cacheKey);
      if (cached) {
        console.log(`✅ Cache hit for: ${keyword}`);
        return cached;
      }

      const params = {
        traffic_source_type: "ECOMMERCE",
        query: keyword,
        page_size: pageSize,
        page_no: page,
      };

      const result = await this.makeRequest(
        "aliexpress.affiliate.product.query",
        params
      );

      const products = result.products || [];
      const formatted = {
        total: result.total_record_count || 0,
        page,
        pageSize,
        products: products.map((p) => ({
          id: p.product_id,
          title: p.product_title,
          image: p.product_main_image_url,
          price: parseFloat(p.target_sale_price.amount),
          sales: parseInt(p.target_sale_volume) || 0,
          rating: parseFloat(p.evaluate_rate) || 0,
          reviews: 0, // API does not provide review count in this endpoint
        })),
      };

      this.cache.set(cacheKey, formatted);
      return formatted;
    } catch (error) {
      console.error("❌ Search Error:", error.message);
      throw error;
    }
  }
}

module.exports = new AliExpressService();

