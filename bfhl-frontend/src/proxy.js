const corsAnywhere = require('cors-anywhere');

const host = 'https://bfhl-backend-wswe.onrender.com';
const port = 8080;

corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
  console.log(`CORS Anywhere proxy is running on http://${host}:${port}`);
});
