// Frontend API Configuration
const API_CONFIG = {
  // Determine if we're in development or production
  isDevelopment:
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1",

  // Base URL for API calls
  get baseURL() {
    // The API is served from the same origin as the page, so use it directly.
    // This works in development on any port and in production.
    return window.location.origin;
  },

  // API endpoints
  endpoints: {
    weather: "/api/weather",
    news: "/api/news",
    contact: "/api/contact",
    health: "/health",
  },

  // Get full URL for an endpoint
  getURL(endpoint, params = "") {
    return `${this.baseURL}${this.endpoints[endpoint]}${params}`;
  },
};

// Make it globally available
window.API_CONFIG = API_CONFIG;
