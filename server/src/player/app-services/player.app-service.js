import { PlayerEntity } from '../entities/player.entity.js';
import { EventEmitter } from 'events';

export class PlayerService extends EventEmitter {
  #repository;

  constructor(repository) {
    super();
    this.#repository = repository;
  }

  createPlayer(name) {
    const id = Math.random().toString(36).substring(2, 15);
    const player = new PlayerEntity(id, name);
    const saved = this.#repository.addPlayer(player);
    this.emit('player.joined', saved);
    return saved;
  }

  getPlayer(id) {
    return this.#repository.getPlayer(id);
  }

  getAllPlayers() {
    return this.#repository.getAllPlayers();
  }

  removePlayer(id) {
    const player = this.getPlayer(id);
    if (!player) return;
    this.#repository.removePlayer(id);
    this.emit('player.removed', player);
    return player;
  }

  submitVote(id, vote) {
    this.#repository.updatePlayerVote(id, vote);
    this.emit('player.voted', { playerId: id, card: vote });
  }

  resetVotes() {
    this.#repository.resetVotes();
    this.emit('votes.reset');
  }
}
