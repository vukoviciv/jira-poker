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

const io = new Server(http.createServer(), { 
  cors: corsOptions,
  transports: ['websocket', 'polling']
});

const gameContext = new GameContext(io);
const app = createApp(gameContext);
const server = http.createServer(app);
io.attach(server);

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, () => onListening());

function onListening() {
  console.log(`App listening to port: ${port}`);
}

export { server, io };
