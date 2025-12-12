import { PlayerRepository } from './player/player.repository.js';

export class GameContext {
  constructor(io = null) {
    if (!io) throw new Error("IO instance is required for GameContext");
    this.io = io;
    this.playerRepository = new PlayerRepository();
  }
}
