import { PlayerEntity } from './player.entity.js';

export class PlayerService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  createPlayer(id, name, isCurrent = false) {
    const player = new PlayerEntity(id, name, isCurrent);
    return this.#repository.addPlayer(player);
  }

  getPlayer(id) {
    return this.#repository.getPlayer(id);
  }

  getAllPlayers() {
    return this.#repository.getAllPlayers();
  }

  removePlayer(id) {
    this.#repository.removePlayer(id);
  }

  submitVote(id, vote) {
    this.#repository.updatePlayerVote(id, vote);
  }

  resetVotes() {
    this.#repository.resetVotes();
  }
}
