import { PlayerEventHandler } from '../event-handlers/player.event-handler.js';

export function registerPlayerEvents(io, playerService) {
  const handler = new PlayerEventHandler(playerService);

  // Socket -> Service: handle incoming socket events and call service
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('playerJoin', (data) => {
      handler.handlePlayerJoin(socket, data);
    });

    socket.on('voted', (data) => {
      handler.handlePlayerVote(socket, data);
    });

    socket.on('disconnect', () => {
      handler.handlePlayerDisconnect(socket);
    });
  });

  // Service -> Socket: forward domain events to all connected clients
  if (typeof playerService.on === 'function') {
    playerService.on('player.created', (player) => {
      io.emit('playerJoined', player);
    });

    playerService.on('player.voted', (payload) => {
      io.emit('playerVoted', payload);
    });

    playerService.on('player.removed', (player) => {
      io.emit('playersUpdated', { players: playerService.getAllPlayers(), message: `${player?.name || 'A player'} left` });
    });

    playerService.on('players.updated', (players) => {
      io.emit('playersUpdated', { players });
    });
  }
}
