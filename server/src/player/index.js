import { PlayerFactory } from './player.factory.js';
import { registerPlayerEvents } from './api/player-event.js';
import express from 'express';

export default {
  load(context) {
    const { repository, service, controller } = PlayerFactory.createContainer();

    const router = express.Router();
    router.get('/', controller.getAll);
    router.post('/', controller.createPlayer);

    context.registerService('playerService', service);
    context.registerService('playerRepository', repository);

    return { repository, service, controller, router };
  },

  afterStart(moduleData, io) {
    const { service } = moduleData;
    registerPlayerEvents(io, service);
  }
};
