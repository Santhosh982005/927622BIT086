const BASE_URL = "http://20.244.56.144/evaluation-service/stocks";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY1ODEyLCJpYXQiOjE3NDgwNjU1MTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNkNjU4MDZiLTE1MjUtNDMxNC1iYTkwLTk2MGYwNjRmMzk4ZiIsInN1YiI6InNhbnRob3NoOTgyMDA1QGdtYWlsLmNvbSJ9LCJlbWFpbCI6InNhbnRob3NoOTgyMDA1QGdtYWlsLmNvbSIsIm5hbWUiOiJzYW50aG9zaCBjIiwicm9sbE5vIjoiOTI3NjIyYml0MDg2IiwiYWNjZXNzQ29kZSI6IndoZVFVeSIsImNsaWVudElEIjoiM2Q2NTgwNmItMTUyNS00MzE0LWJhOTAtOTYwZjA2NGYzOThmIiwiY2xpZW50U2VjcmV0IjoiVUdlVWdnZ3BWV01QdHNkVCJ9.jPyVPboxE3ySvM7aa-OFGVNJRdA196lPRjlW8BkpyUE";

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function fetchStocks() {
  try {
    const response = await fetch(BASE_URL, { 
      headers,
      mode: 'cors'
    });
    const data = await handleResponse(response);
    return data.stocks;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
}

export async function fetchStockHistory(ticker, minutes) {
  try {
    let url = `${BASE_URL}/${ticker}`;
    if (minutes) url += `?minutes=${minutes}`;
    const response = await fetch(url, { 
      headers,
      mode: 'cors'
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching stock history:', error);
    throw error;
  }
} 