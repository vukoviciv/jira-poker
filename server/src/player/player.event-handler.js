export class PlayerEventHandler {
  #playerService;

  constructor(service) {
    this.#playerService = service;
  }

  handlePlayerJoin = (socket, io, data) => {
    const player = this.#playerService.createPlayer(socket.id, data.name);
    io.emit('playersUpdated', {
      players: this.#playerService.getAllPlayers(),
      message: `${player.name} joined`
    });
  };

  handlePlayerDisconnect = (socket, io) => {
    const player = this.#playerService.getPlayer(socket.id);
    this.#playerService.removePlayer(socket.id);
    
    io.emit('playersUpdated', {
      players: this.#playerService.getAllPlayers(),
      message: `${player?.name || 'A player'} left`
    });
  };
}
