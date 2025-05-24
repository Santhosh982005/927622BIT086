import React from "react";
import { Autocomplete, TextField } from "@mui/material";

export default function StockSelector({ stocks, value, onChange }) {
  const options = Object.entries(stocks).map(([name, ticker]) => ({ label: `${name} (${ticker})`, ticker }));
  return (
    <Autocomplete
      options={options}
      value={options.find(o => o.ticker === value) || null}
      onChange={(_, newValue) => onChange(newValue ? newValue.ticker : null)}
      renderInput={params => <TextField {...params} label="Select Stock" />}
      sx={{ minWidth: 250 }}
    />
  );
} 