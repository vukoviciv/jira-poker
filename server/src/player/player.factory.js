import { PlayerService } from './player.app-service.js';
import { PlayerRepository } from './player.repository.js';
import { PlayerController } from './api/player.controller.js';

export class PlayerFactory {
  static createContainer() {
    const repository = new PlayerRepository();
    const service = new PlayerService(repository);
    const controller = new PlayerController(service);

    return { repository, service, controller };
  }
}
