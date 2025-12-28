const https = require("https" );
const { URLSearchParams } = require("url");

function getEnv(key) {
  const value = process.env[key];
  if (!value) throw new Error(`FATAL ERROR: Environment variable ${key} is missing.`);
  return value;
}

const APP_KEY = getEnv("ALIEXPRESS_APP_KEY");
const APP_SECRET = getEnv("ALIEXPRESS_APP_SECRET");
const REDIRECT_URI = getEnv("ALIEXPRESS_REDIRECT_URI");

// *** THIS IS THE FIX: Using the SANDBOX URL for the TEST App ***
const AUTH_URL = "https://oauth.aliexpress.com/authorize"; // The auth URL is often the same, but the token URL is different.
const TOKEN_URL = "https://api-sg.aliexpress.com/rest"; // This is a common alternative endpoint structure.

function getAuthorizationUrl( ) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: APP_KEY,
    redirect_uri: REDIRECT_URI,
    state: "dropforge_xyz",
    view: "web",
    sp: "ae",
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
      method: 'aliexpress.system.oauth.token.create' // Using the REST endpoint method
    }).toString();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    const req = https.request(TOKEN_URL, options, (res ) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        try {
          const tokenData = JSON.parse(data);
          if (tokenData.error_response) {
            return reject(new Error(tokenData.error_response.msg));
          }
          // The actual token is nested differently with this endpoint
          const tokenResult = tokenData.aliexpress_system_oauth_token_create_response.result;
          resolve(tokenResult);
        } catch (e) {
          reject(new Error(`Failed to parse token response: ${data}`));
        }
      });
    });

    req.on("error", (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

module.exports = { getAuthorizationUrl, getAccessToken };
