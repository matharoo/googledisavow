// Configuration file for URL to Disavow Converter
const CONFIG = {
    // Google Analytics Configuration
    GA_MEASUREMENT_ID: 'G-QRWB18F67F', // Replace with your actual GA4 Measurement ID
    
    // App Settings
    MAX_URLS_TO_TRACK: 1000, // Maximum URLs before showing warning
    TRACKING_INTERVAL: 10, // Track URL input progress every N URLs
    
    // Feature Flags
    ENABLE_ANALYTICS: true,
    ENABLE_DEBUG_LOGGING: false,
    
    // UI Settings
    SHOW_NOTIFICATIONS: true,
    NOTIFICATION_DURATION: 3000, // milliseconds
    ANIMATION_DURATION: 300 // milliseconds
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 