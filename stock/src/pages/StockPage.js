import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Alert } from '@mui/material';
import StockSelector from '../components/StockSelector';
import TimeSelector from '../components/TimeSelector';
import StockChart from '../components/StockChart';
import { fetchStocks, fetchStockHistory } from '../api/stockApi';
import { mean } from '../utils/stats';

export default function StockPage() {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);
  const [timeRange, setTimeRange] = useState(30);
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStocks()
      .then(data => {
        const stockMap = {};
        data.forEach(stock => {
          stockMap[stock.name] = stock.ticker;
        });
        setStocks(stockMap);
      })
      .catch(err => setError('Failed to load stocks'));
  }, []);

  useEffect(() => {
    if (!selectedStock) return;
    
    const fetchData = async () => {
      try {
        const data = await fetchStockHistory(selectedStock, timeRange);
        setStockData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load stock data');
        setStockData([]);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [selectedStock, timeRange]);

  const average = stockData.length ? mean(stockData.map(d => d.price)) : 0;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <StockSelector
              stocks={stocks}
              value={selectedStock}
              onChange={setSelectedStock}
            />
            <TimeSelector
              value={timeRange}
              onChange={setTimeRange}
            />
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {selectedStock && stockData.length > 0 ? (
            <StockChart data={stockData} avg={average} />
          ) : (
            <Typography color="text.secondary" align="center">
              Select a stock to view its price history
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
} 