const https = require("https" );
const { URLSearchParams } = require("url");

const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET;
const REDIRECT_URI = process.env.ALIEXPRESS_REDIRECT_URI;

const AUTH_URL = "https://oauth.aliexpress.com/authorize";
const TOKEN_URL = "https://oauth.aliexpress.com/token";

function getAuthorizationUrl( ) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: APP_KEY,
    redirect_uri: REDIRECT_URI,
    state: "dropforge_xyz", // In a real app, this should be a random, secure string
    view: "web",
    sp: "ae", // AliExpress specific parameter
  });
  return `${AUTH_URL}?${params.toString()}`;
}

function getAccessToken(code) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: APP_KEY,
      client_secret: APP_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI,
    }).toString();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(TOKEN_URL, options, (res ) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const tokenData = JSON.parse(data);
          if (tokenData.error) {
            return reject(new Error(tokenData.error_description || tokenData.error));
          }
          resolve(tokenData);
        } catch (e) {
          reject(new Error(`Failed to parse token response: ${data}`));
        }
      });
    });

    req.on("error", (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

module.exports = { getAuthorizationUrl, getAccessToken };
