import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { correlationColor } from '../utils/colorUtils';

export default function CorrelationHeatmap({ correlations, stockNames }) {
  const names = Object.keys(correlations);
  
  return (
    <Paper sx={{ p: 2, overflow: 'auto' }}>
      <Typography variant="h6" gutterBottom>Stock Correlations</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: `auto repeat(${names.length}, 100px)`, gap: 1 }}>
        {/* Header row */}
        <Box sx={{ width: 150 }} /> {/* Empty corner cell */}
        {names.map(name => (
          <Typography key={name} variant="body2" sx={{ textAlign: 'center', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            {stockNames[name]}
          </Typography>
        ))}
        
        {/* Correlation matrix */}
        {names.map(name1 => (
          <React.Fragment key={name1}>
            <Typography variant="body2" sx={{ width: 150, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {stockNames[name1]}
            </Typography>
            {names.map(name2 => {
              const corr = correlations[name1][name2];
              return (
                <Box
                  key={`${name1}-${name2}`}
                  sx={{
                    width: 100,
                    height: 30,
                    bgcolor: correlationColor(corr),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: Math.abs(corr) > 0.5 ? 'white' : 'black',
                    fontSize: '0.875rem',
                    cursor: 'default',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  title={`${stockNames[name1]} vs ${stockNames[name2]}: ${corr.toFixed(2)}`}
                >
                  {corr.toFixed(2)}
                </Box>
              );
            })}
          </React.Fragment>
        ))}
      </Box>
    </Paper>
  );
} 