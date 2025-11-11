const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic proxy middleware to forward all requests to a target URL specified by query parameter
app.use('/proxy', (req, res, next) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing url query parameter');
  }
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '',
    },
  })(req, res, next);
});

// Simple route to confirm server is running
app.get('/', (req, res) => {
  res.send('Shadow Proxy Server is running. Use /proxy?url= to proxy requests.');
});

app.listen(PORT, () => {
  console.log(`Shadow Proxy running on http://localhost:${PORT}`);
});
