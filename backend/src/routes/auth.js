const express = require("express");
const router = express.Router();
const { getAuthorizationUrl, getAccessToken } = require("../services/authService");

// Redirect user to AliExpress for authorization
router.get("/aliexpress", (req, res) => {
  try {
    const authUrl = getAuthorizationUrl();
    res.redirect(authUrl);
  } catch (error) {
    res.status(500).send(`<h1>Error</h1><p>${error.message}</p>`);
  }
});

// Handle the callback from AliExpress
router.get("/aliexpress/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Authorization code is missing.");
  }

  try {
    const tokenData = await getAccessToken(code);
    // In a real app, you would securely encrypt and store this token data
    // For now, we will just confirm success.
    res.send("<h1>✅ Authentication Successful!</h1><p>You can now close this window. Your application is connected to AliExpress.</p>");
  } catch (error) {
    res.status(500).send(`<h1>❌ Authentication Failed</h1><p>${error.message}</p>`);
  }
});

module.exports = router;
