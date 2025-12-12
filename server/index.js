import { createApp } from './app.js';
import { GameContext } from './src/container.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

// TODO: Import from env
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true 
};

const gameContext = new GameContext();

const app = createApp(gameContext);
const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('voted', data => {
    console.log('User voted data:', data);
  });
});

server.listen(port, () => onListening());

function onListening() {
  console.log(`App listening to port: ${port}`);
}

export { server, io };
