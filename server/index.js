import { createApp } from './app.js';
import { GameContext } from './src/container.js';
import { Server } from "socket.io";
import http from 'http';

// TODO: Import from env
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true 
};

const gameContext = new GameContext();
const app = createApp(gameContext);
const server = http.createServer(app);
// Move out to config/socket.io.js later
const io = new Server(server, { 
  cors: corsOptions,
  transports: ['websocket', 'polling']
});

server.listen(port, () => onListening());

function onListening() {
  console.log(`App listening to port: ${port}`);
}

export { server, io };
