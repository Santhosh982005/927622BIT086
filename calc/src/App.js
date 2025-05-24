import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = '/api';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MDY1ODEyLCJpYXQiOjE3NDgwNjU1MTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNkNjU4MDZiLTE1MjUtNDMxNC1iYTkwLTk2MGYwNjRmMzk4ZiIsInN1YiI6InNhbnRob3NoOTgyMDA1QGdtYWlsLmNvbSJ9LCJlbWFpbCI6InNhbnRob3NoOTgyMDA1QGdtYWlsLmNvbSIsIm5hbWUiOiJzYW50aG9zaCBjIiwicm9sbE5vIjoiOTI3NjIyYml0MDg2IiwiYWNjZXNzQ29kZSI6IndoZVFVeSIsImNsaWVudElEIjoiM2Q2NTgwNmItMTUyNS00MzE0LWJhOTAtOTYwZjA2NGYzOThmIiwiY2xpZW50U2VjcmV0IjoiVUdlVWdnZ3BWV01QdHNkVCJ9.jPyVPboxE3ySvM7aa-OFGVNJRdA196lPRjlW8BkpyUE';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const numberTypes = [
    { id: 'p', label: 'Prime Numbers' },
    { id: 'f', label: 'Fibonacci Numbers' },
    { id: 'e', label: 'Even Numbers' },
    { id: 'r', label: 'Random Numbers' },
  ];

  const fetchNumbers = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/numbers/${type}`, {
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`
        }
      });
      setResult(response.data);
    } catch (err) {
      let errorMessage = 'An error occurred while fetching numbers';
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (err.response) {
        errorMessage = `Server error: ${err.response.status} - ${err.response.data?.detail || 'Unknown error'}`;
      } else if (err.request) {
        errorMessage = 'No response from server. Please check if the backend server is running.';
      }
      
      setError(errorMessage);
      console.error('Error details:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Average Calculator
        </Typography>

        <Alert severity="info" sx={{ mb: 2 }}>
          Make sure the backend server is running on http://localhost:9876
        </Alert>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {numberTypes.map((type) => (
            <Grid item xs={6} sm={3} key={type.id}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => fetchNumbers(type.id)}
                disabled={loading}
              >
                {type.label}
              </Button>
            </Grid>
          ))}
        </Grid>

        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {result && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Results
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Previous Window State:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.windowPrevState.join(', ') || 'Empty'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1">Current Window State:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.windowCurrState.join(', ')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Numbers Received:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.numbers.join(', ')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Average:</Typography>
                  <Typography variant="h5" color="primary">
                    {result.avg.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default App; 