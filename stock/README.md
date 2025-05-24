# Stock Price Aggregation Frontend

This is a React-based frontend web application for aggregating and visualizing stock price data. It allows users to view stock price history, analyze correlations between stocks, and interact with the data using a modern Material UI interface.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Authentication](#api-authentication)
- [Usage](#usage)
- [File Descriptions](#file-descriptions)
- [Screenshots](#screenshots)
- [Notes](#notes)

---

## Features
- View historical price data for multiple stocks
- Select time ranges for price history
- Visualize stock price trends with charts
- Analyze correlation between stocks with a heatmap
- Responsive design for desktop and mobile
- Built with React, Material UI, and Recharts

---

## Project Structure
```
/ (root)
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── stockApi.js         # Handles API requests for stocks
│   │   ├── testApi.js          # Script to test API connectivity
│   │   └── checkToken.js       # Script to analyze JWT token
│   ├── components/
│   │   ├── StockSelector.js    # Dropdown for selecting stocks
│   │   ├── TimeSelector.js     # Dropdown for selecting time range
│   │   ├── StockChart.js       # Chart for stock price history
│   │   └── CorrelationHeatmap.js # Heatmap for stock correlations
│   ├── pages/
│   │   ├── StockPage.js        # Main page for stock details
│   │   └── CorrelationPage.js  # Page for correlation analysis
│   ├── utils/
│   │   └── stats.js            # Statistical functions (mean, correlation, etc.)
│   ├── types.ts                # TypeScript type definitions (if used)
│   ├── App.js                  # Main app component with routing
│   └── index.js                # Entry point
├── package.json
└── README.md
```

---

## Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <repo-folder>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up your API token:**
   - Obtain a valid token from the API provider (see [API Authentication](#api-authentication)).
   - Set it as an environment variable before starting the app:
     ```sh
     # For Windows PowerShell
     $env:REACT_APP_API_TOKEN="your_token_here"
     npm start
     ```
   - Or set it in the browser console for quick testing:
     ```js
     window.API_TOKEN = "your_token_here";
     ```
4. **Start the development server:**
   ```sh
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## API Authentication
- All API requests require a valid Bearer token.
- Register and authenticate as per the instructions provided by the API provider to obtain your token.
- The token is required for all stock data requests.

---

## Usage
- **Stock Details Page:**
  - Select a stock and time range to view its price history and average price.
- **Correlation Analysis Page:**
  - View the correlation heatmap for all available stocks over the selected time range.

---

## File Descriptions
- **public/index.html**: Main HTML file for the React app.
- **src/api/stockApi.js**: Handles all API requests for fetching stocks and their history. Requires a valid token.
- **src/api/testApi.js**: Script to test API connectivity and token validity.
- **src/api/checkToken.js**: Script to decode and analyze JWT tokens.
- **src/components/StockSelector.js**: Dropdown component for selecting stocks.
- **src/components/TimeSelector.js**: Dropdown for selecting the time range (in minutes).
- **src/components/StockChart.js**: Renders a line chart of stock price history using Recharts.
- **src/components/CorrelationHeatmap.js**: Displays a heatmap of stock correlations.
- **src/pages/StockPage.js**: Main page for viewing stock details and price history.
- **src/pages/CorrelationPage.js**: Page for viewing correlation analysis between stocks.
- **src/utils/stats.js**: Utility functions for statistical calculations (mean, stddev, correlation, etc.).
- **src/types.ts**: TypeScript type definitions for stock data (if using TypeScript).
- **src/App.js**: Main app component, sets up routing and navigation.
- **src/index.js**: Entry point, sets up theme and renders the app.
- **package.json**: Project dependencies and scripts.

---

## Screenshots
> Add screenshots of the app in both desktop and mobile views here for submission.

---

## Notes
- The app will not function without a valid API token.
- For demo or development without a token, consider adding mock data fallback.
- Follow best practices for code organization and commit regularly.

---

**For any issues, please refer to the code comments or contact the project maintainer.** 