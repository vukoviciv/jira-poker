import { PlayerRepository } from './player/player.repository.js';

export class GameContext {
  constructor() {
    this.playerRepository = new PlayerRepository();
  }
}
