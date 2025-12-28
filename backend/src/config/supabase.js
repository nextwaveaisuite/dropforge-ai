// ===================================================
// Supabase Configuration & Initialization
// ===================================================

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in environment variables');
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Create admin client for privileged operations
const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_KEY || supabaseKey
);

module.exports = {
  supabase,
  supabaseAdmin,
  supabaseUrl,
  supabaseKey
};
