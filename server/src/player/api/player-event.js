import { PlayerEventHandler } from '../event-handlers/player.event-handler.js';

export function registerPlayerEvents(io, playerService) {
  const handler = new PlayerEventHandler(playerService);

  // Socket -> Service: handle incoming socket events and call service
  io.on('connection', (socket) => {
    socket.on('player:join', (data) => {
      handler.handlePlayerJoin(socket, data);
    });

    socket.on('player:vote', (data) => {
      handler.handlePlayerVote(socket, data);
    });

    socket.on('disconnect', () => {
      handler.handlePlayerDisconnect(socket);
    });
  });

  // Service -> Socket: forward domain events to all connected clients
  if (typeof playerService.on === 'function') {
    playerService.on('player.joined', (player) => {
      io.emit('player:joined', { player });
      io.emit('players:updated', { players: playerService.getAllPlayers() });
    });

    playerService.on('player.voted', (payload) => {
      io.emit('player:voted', payload);
    });

    playerService.on('player.removed', (player) => {
      const payload = { message: `${player?.name || 'A player'} left` };
      io.emit('player:removed', payload);
      io.emit('players:updated', { players: playerService.getAllPlayers() });
    });
  }
}
