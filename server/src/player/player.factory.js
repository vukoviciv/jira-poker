import { PlayerService } from './app-services/player.app-service.js';
import { PlayerRepository } from './infrastructure/player.repository.js';
import { PlayerController } from './api/player.controller.js';

export class PlayerFactory {
  static createContainer() {
    const repository = new PlayerRepository();
    const service = new PlayerService(repository);
    const controller = new PlayerController(service);

    return { repository, service, controller };
  }
}
