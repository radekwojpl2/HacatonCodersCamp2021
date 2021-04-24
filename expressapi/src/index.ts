import http from 'http';
import app from './app';

const port = 4000|| 4000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`connected to the port ${port}`);
});
