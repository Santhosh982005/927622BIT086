import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Alert } from '@mui/material';
import TimeSelector from '../components/TimeSelector';
import CorrelationHeatmap from '../components/CorrelationHeatmap';
import { fetchStocks, fetchStockHistory } from '../api/stockApi';
import { pearson, alignSeries } from '../utils/stats';

export default function CorrelationPage() {
  const [stocks, setStocks] = useState({});
  const [timeRange, setTimeRange] = useState(30);
  const [stockData, setStockData] = useState({});
  const [correlations, setCorrelations] = useState({});
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
    const fetchAllData = async () => {
      try {
        const data = {};
        for (const [name, ticker] of Object.entries(stocks)) {
          data[ticker] = await fetchStockHistory(ticker, timeRange);
        }
        setStockData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load stock data');
        setStockData({});
      }
    };

    if (Object.keys(stocks).length > 0) {
      fetchAllData();
      const interval = setInterval(fetchAllData, 10000); // Refresh every 10 seconds
      return () => clearInterval(interval);
    }
  }, [stocks, timeRange]);

  useEffect(() => {
    const calculateCorrelations = () => {
      const tickers = Object.keys(stockData);
      const corrMatrix = {};

      for (const ticker1 of tickers) {
        corrMatrix[ticker1] = {};
        for (const ticker2 of tickers) {
          if (ticker1 === ticker2) {
            corrMatrix[ticker1][ticker2] = 1;
          } else if (ticker1 < ticker2) {
            const [series1, series2] = alignSeries(stockData[ticker1], stockData[ticker2]);
            corrMatrix[ticker1][ticker2] = pearson(series1, series2);
            corrMatrix[ticker2][ticker1] = corrMatrix[ticker1][ticker2];
          }
        }
      }
      setCorrelations(corrMatrix);
    };

    if (Object.keys(stockData).length > 0) {
      calculateCorrelations();
    }
  }, [stockData]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TimeSelector
              value={timeRange}
              onChange={setTimeRange}
            />
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {Object.keys(correlations).length > 0 ? (
            <CorrelationHeatmap
              correlations={correlations}
              stockNames={stocks}
            />
          ) : (
            <Typography color="text.secondary" align="center">
              Loading correlation data...
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
} 