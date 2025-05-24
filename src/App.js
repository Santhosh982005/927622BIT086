import React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Link, Box } from '@mui/material';
import StockPage from './pages/StockPage';
import CorrelationPage from './pages/CorrelationPage';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stock Price Aggregator
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link component={RouterLink} to="/" color="inherit" underline="hover">
              Stock Details
            </Link>
            <Link component={RouterLink} to="/correlation" color="inherit" underline="hover">
              Correlation Analysis
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/correlation" element={<CorrelationPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App; 