import { PlayerEventHandler } from '../player.event-handler.js';

export function registerPlayerEvents(io, playerService) {
  const handler = new PlayerEventHandler(playerService);

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    socket.on('playerJoin', (data) => {
      handler.handlePlayerJoin(socket, io, data);
    });

    socket.on('disconnect', () => {
      handler.handlePlayerDisconnect(socket, io);
    });

    socket.on('playerVoted', (data) => {
      console.log('recieved voted event', data);
      handler.handlePlayerVote(socket, io, data);
    });
  });
}
