const crypto = require("crypto");
const https = require("https" );

class AliExpressService {
  constructor() {
    this.appKey = process.env.ALIEXPRESS_APP_KEY;
    this.appSecret = process.env.ALIEXPRESS_APP_SECRET;
    this.baseUrl = process.env.ALIEXPRESS_API_URL;
  }

  // Generate the correct signature using the official method
  generateSignature(params) {
    const sortedKeys = Object.keys(params).sort();
    let stringToSign = "";
    for (const key of sortedKeys) {
      stringToSign += key + params[key];
    }
    stringToSign = this.appSecret + stringToSign + this.appSecret;
    return crypto.createHash('md5').update(stringToSign).digest('hex').toUpperCase();
  }

  makeRequest(method, apiParams) {
    return new Promise((resolve, reject) => {
      const systemParams = {
        app_key: this.appKey,
        method: method,
        sign_method: "md5",
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        format: 'json',
        v: '2.0',
        ...apiParams
      };

      systemParams.sign = this.generateSignature(systemParams);

      const queryString = Object.keys(systemParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(systemParams[key])}`)
        .join('&');

      const url = `${this.baseUrl}?${queryString}`;

      https.get(url, (res ) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            const errorResponse = response.error_response;
            if (errorResponse) {
              return reject(new Error(`AliExpress Error: ${errorResponse.msg} (Code: ${errorResponse.code})`));
            }
            const resultKey = Object.keys(response).find(k => k.includes('_response'));
            const result = response[resultKey].result;
            resolve(result);
          } catch (e) {
            reject(new Error(`Failed to parse API response: ${data}`));
          }
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  async searchProducts(keyword, page = 1, pageSize = 20) {
    try {
      const params = {
        keywords: keyword,
        page_no: page,
        page_size: pageSize,
        sort: 'SALE_PRICE_ASC',
        product_info_fields: 'product_id,product_title,product_main_image_url,target_sale_price,evaluate_rate,target_sale_volume'
      };

      const result = await this.makeRequest('aliexpress.ds.product.get', params);

      const products = result.products?.product || [];
      return {
        total: result.total_count || 0,
        products: products.map((p) => ({
          id: p.product_id,
          title: p.product_title,
          image: p.product_main_image_url,
          price: parseFloat(p.target_sale_price.value),
          sales: parseInt(p.target_sale_volume) || 0,
          rating: parseFloat(p.evaluate_rate) || 0,
        })),
      };
    } catch (error) {
      console.error("❌ Search Error:", error.message);
      throw error;
    }
  }
}

module.exports = new AliExpressService();
