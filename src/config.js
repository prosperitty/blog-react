const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://event-horizon.onrender.com' // Production API URL
  : '';  // Development API URL set as proxy

export default API_URL;