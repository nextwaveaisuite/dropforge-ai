const https = require("https" );
const { URLSearchParams } = require("url");

// This function checks for missing keys and will not crash the server.
function getEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`FATAL ERROR: Environment variable ${key} is missing. Please check your Vercel project settings.`);
  }
  return value;
}

let APP_KEY, APP_SECRET, REDIRECT_URI;
try {
  APP_KEY = getEnv("ALIEXPRESS_APP_KEY");
  APP_SECRET = getEnv("ALIEXPRESS_APP_SECRET");
  REDIRECT_URI = getEnv("ALIEXPRESS_REDIRECT_URI");
} catch (error) {
  console.error(error.message);
  // We will let the server start, but the auth routes will fail with a clear error.
}

const AUTH_URL = "https://oauth.aliexpress.com/authorize";
const TOKEN_URL = "https://oauth.aliexpress.com/token";

function getAuthorizationUrl( ) {
  if (!APP_KEY) throw new Error("AliExpress App Key is not configured.");
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
    if (!APP_KEY) return reject(new Error("AliExpress App Key is not configured."));

    const postData = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: APP_KEY,
      client_secret: APP_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI,
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
          if (tokenData.error) {
            return reject(new Error(tokenData.error_description || tokenData.error));
          }
          resolve(tokenData);
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
