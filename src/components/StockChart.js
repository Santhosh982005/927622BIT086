import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";

export default function StockChart({ data, avg }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Stock Price Chart</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="lastUpdatedAt" tickFormatter={t => new Date(t).toLocaleTimeString()} />
            <YAxis />
            <Tooltip formatter={(value, name) => [value.toFixed(2), name === "price" ? "Price" : name]} labelFormatter={label => new Date(label).toLocaleString()} />
            <Line type="monotone" dataKey="price" stroke="#1976d2" dot />
            <ReferenceLine y={avg} label="Avg" stroke="red" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
        <Typography variant="body2" color="text.secondary">Average: <b>{avg.toFixed(2)}</b></Typography>
      </CardContent>
    </Card>
  );
} 