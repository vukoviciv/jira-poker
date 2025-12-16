import { createApp } from './app.js';
import { GameContext } from './src/container.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import playerModule from './src/player/index.js';

const port = process.env.SERVER_PORT || 3000;
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:8080',
  credentials: true 
};

const gameContext = new GameContext();
gameContext.loadModule('player', playerModule);

const app = createApp(gameContext);
const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

await gameContext.initializeModulesWithIo(io);

server.listen(port, () => onListening());

function onListening() {
  console.log(`App listening to port: ${port}`);
}

export { server, io };
