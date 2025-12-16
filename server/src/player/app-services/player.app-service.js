import { PlayerEntity } from '../entities/player.entity.js';
import { EventEmitter } from 'events';

export class PlayerService extends EventEmitter {
  #repository;

  constructor(repository) {
    super();
    this.#repository = repository;
  }

  createPlayer(id, name) {
    const player = new PlayerEntity(id, name);
    const saved = this.#repository.addPlayer(player);
    this.emit('player.created', saved);
    this.emit('players.updated', this.getAllPlayers());
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
    this.#repository.removePlayer(id);
    this.emit('player.removed', player);
    this.emit('players.updated', this.getAllPlayers());
  }

  submitVote(id, vote) {
    this.#repository.updatePlayerVote(id, vote);
    this.emit('player.voted', { playerId: id, card: vote });
    this.emit('players.updated', this.getAllPlayers());
  }

  resetVotes() {
    this.#repository.resetVotes();
    this.emit('votes.reset');
    this.emit('players.updated', this.getAllPlayers());
  }
}
