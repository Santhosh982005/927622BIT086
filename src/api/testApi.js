const BASE_URL = "http://20.244.56.144/evaluation-service/stocks";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY1ODEyLCJpYXQiOjE3NDgwNjU1MTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNkNjU4MDZiLTE1MjUtNDMxNC1iYTkwLTk2MGYwNjRmMzk4ZiIsInN1YiI6InNhbnRob3NoOTgyMDA1QGdtYWlsLmNvbSJ9LCJlbWFpbCI6InNhbnRob3NoOTgyMDA1QGdtYWlsLmNvbSIsIm5hbWUiOiJzYW50aG9zaCBjIiwicm9sbE5vIjoiOTI3NjIyYml0MDg2IiwiYWNjZXNzQ29kZSI6IndoZVFVeSIsImNsaWVudElEIjoiM2Q2NTgwNmItMTUyNS00MzE0LWJhOTAtOTYwZjA2NGYzOThmIiwiY2xpZW50U2VjcmV0IjoiVUdlVWdnZ3BWV01QdHNkVCJ9.jPyVPboxE3ySvM7aa-OFGVNJRdA196lPRjlW8BkpyUE";

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json'
};

async function testApi() {
  try {
    console.log('Testing API connection...');
    const response = await fetch(BASE_URL, { 
      headers,
      mode: 'cors'
    });
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('API test failed:', error);
  }
}

testApi(); 