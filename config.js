// Supabase Configuration
// Replace these values with your Supabase project credentials
const SUPABASE_URL = 'https://fbietamqdnxlmatcwpvr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiaWV0YW1xZG54bG1hdGN3cHZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTc2ODEsImV4cCI6MjA3OTQ5MzY4MX0.u4keHUKwL4ThR0oC_6SEWCiVFv97KHPPxKftQUqeKa8';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

