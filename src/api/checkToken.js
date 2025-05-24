const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY1ODEyLCJpYXQiOjE3NDgwNjU1MTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNkNjU4MDZiLTE1MjUtNDMxNC1iYTkwLTk2MGYwNjRmMzk4ZiIsInN1YiI6InNhbnRob3NoOTgyMDA1QGdtYWlsLmNvbSJ9LCJlbWFpbCI6InNhbnRob3NoOTgyMDA1QGdtYWlsLmNvbSIsIm5hbWUiOiJzYW50aG9zaCBjIiwicm9sbE5vIjoiOTI3NjIyYml0MDg2IiwiYWNjZXNzQ29kZSI6IndoZVFVeSIsImNsaWVudElEIjoiM2Q2NTgwNmItMTUyNS00MzE0LWJhOTAtOTYwZjA2NGYzOThmIiwiY2xpZW50U2VjcmV0IjoiVUdlVWdnZ3BWV01QdHNkVCJ9.jPyVPboxE3ySvM7aa-OFGVNJRdA196lPRjlW8BkpyUE";

// Decode the JWT token
const base64Url = token.split('.')[1];
const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
}).join(''));

const payload = JSON.parse(jsonPayload);
console.log('Token Analysis:');
console.log('----------------');
console.log('Token Payload:', JSON.stringify(payload, null, 2));
console.log('\nToken Details:');
console.log('----------------');
console.log('Email:', payload.email);
console.log('Name:', payload.name);
console.log('Roll No:', payload.rollNo);
console.log('Access Code:', payload.accessCode);
console.log('Client ID:', payload.clientID);
console.log('Expiry:', new Date(payload.MapClaims.exp * 1000).toLocaleString());
console.log('Issued At:', new Date(payload.MapClaims.iat * 1000).toLocaleString());

// Check if token is expired
const currentTime = Math.floor(Date.now() / 1000);
const expiryTime = payload.MapClaims.exp;
console.log('\nToken Status:');
console.log('----------------');
console.log('Current time:', new Date(currentTime * 1000).toLocaleString());
console.log('Expiry time:', new Date(expiryTime * 1000).toLocaleString());
console.log('Is token expired?', currentTime > expiryTime ? 'Yes' : 'No');
console.log('Time until expiry:', Math.floor((expiryTime - currentTime) / 3600), 'hours'); 