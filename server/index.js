import { createApp } from './app.js';
import { GameContext } from './src/container.js';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import playerModule from './src/player/index.js';

// TODO: Import from env
const port = 3000;
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true 
};

const gameContext = new GameContext();
console.log({playerModule})
gameContext.loadModule('player', playerModule);
console.log(gameContext.modules['player']);

const app = createApp(gameContext);
const server = createServer(app);
const io = new Server(server, { cors: corsOptions });

await gameContext.initializeModulesWithIo(io);

server.listen(port, () => onListening());

function onListening() {
  console.log(`App listening to port: ${port}`);
}

export { server, io };
