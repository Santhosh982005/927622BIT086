module.exports = function(proxy, allowedHost) {
  return {
    allowedHosts: [allowedHost],
    host: 'localhost',
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
}; 