import axios from 'axios'

// Get CSRF token
const csrfToken = await axios.get(import.meta.env.VITE_API_ENDPOINT + 'auth/csrf', {
  withCredentials: true,
})

// Create an axios instance
export const apiInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: {
    'csrf-token': csrfToken.data.csrfToken,
  },
})
