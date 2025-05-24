import React from "react";
import { TextField } from "@mui/material";

export default function TimeSelector({ value, onChange }) {
  return (
    <TextField
      label="Minutes"
      type="number"
      value={value}
      onChange={e => onChange(Number(e.target.value))}
      inputProps={{ min: 1, max: 120 }}
      sx={{ width: 120 }}
    />
  );
} 