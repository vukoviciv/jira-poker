export class PlayerEventHandler {
  #playerService;

  constructor(service) {
    this.#playerService = service;
  }

  handlePlayerJoin = (socket, data) => {
    this.#playerService.createPlayer(socket.id, data?.name || `Player-${socket.id}`);
  };

  handlePlayerVote = (socket, data) => {
    this.#playerService.submitVote(socket.id, data?.card);
  };

  handlePlayerDisconnect = (socket) => {
    this.#playerService.removePlayer(socket.id);
  };
}
