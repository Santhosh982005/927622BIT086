module.exports = function override(config, env) {
  // Add custom configuration here
  config.devServer = {
    ...config.devServer,
    allowedHosts: 'all',
    host: '127.0.0.1',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:9876',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  };
  return config;
}; 