import express from 'express';
import PlayerController from './player.controller.js';
import { PlayerService } from '../player.app-service.js';

export default function createPlayerRouter(ctx) {
  const { playerRepository } = ctx;
  const router = express.Router();
  const service = new PlayerService(playerRepository);
  const ctrl = new PlayerController(service, ctx);

  router.get('/', ctrl.getAll);
  router.get('/:id', ctrl.getPlayer);
  router.post('/', ctrl.createPlayer);

  return router;
}
