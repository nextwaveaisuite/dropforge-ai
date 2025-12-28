const express = require("express");
const router = express.Router();

// HARDCODED DEBUG: This removes all variables and tests the key directly.
router.get("/aliexpress", (req, res) => {
  const appKey = "524060";
  const redirectUri = "https://dropforge-ai-backend.vercel.app/api/auth/aliexpress/callback";
  const authUrl = `https://oauth.aliexpress.com/authorize?response_type=code&client_id=${appKey}&redirect_uri=${redirectUri}&state=debug&view=web&sp=ae`;
  res.redirect(authUrl );
});

// This part will not be used in this test.
router.get("/aliexpress/callback", async (req, res) => {
  res.send("Callback received.");
});

module.exports = router;
