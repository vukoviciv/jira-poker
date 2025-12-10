import express from 'express';
import PlayerController from './player.controller.js';
import { PlayerService } from '../player.app-service.js';

export default function createPlayerRouter(repository) {
  const router = express.Router();
  const service = new PlayerService(repository);
  const ctrl = new PlayerController(service);

  router.get('/', ctrl.getAll);
  router.get('/:id', ctrl.getPlayer);
  router.post('/', ctrl.createPlayer);
  // TODO: update, vote

  return router;
}
