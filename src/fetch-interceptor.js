

export default async function fetchWithAuth(url, options = {}) {
    try {// Get saved token from storage
    const token = localStorage.getItem('token');
  
    // Add authorization header to existing headers
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`
    };
  
    // Return fetch call with new headers
    if (token!=="")
    return await fetch(url, {...options, headers});}
    catch(error){
      console.error(error)
    }
  }