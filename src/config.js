// Optional configuration for central query storage.
// If you want to enable central storage (Google Sheets / serverless endpoint),
// set API_URL to your deployed endpoint URL (no trailing slash).
// Example: export const API_URL = 'https://script.google.com/macros/s/AKfy.../exec'

export const API_URL = '';

// If PUBLIC_READ is true, RecentQueriesDialog will attempt to fetch recent queries
// from the API for everyone to see. Keep false if you only want the owner to view
// queries via an admin dashboard.
export const PUBLIC_READ = true;
