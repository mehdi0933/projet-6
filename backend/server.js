const http = require('http');
const app = require('./app');
const Cookie = require('cookie-httponly');
 
http.createServer((req, res) => {
  const cookie = new Cookie(req, res);
  cookie.set('user', '', {
    expires: new Date(1)
}); 
  res.end();
}) 
app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);