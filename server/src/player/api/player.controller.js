import express from 'express';

export class PlayerController {
  #playerService;
  #io;

  constructor(service, ctx) {
    this.#playerService = service;
    this.#io = ctx.io;
  }

  getAll = async (_req, res) => {
    try {
      const players = this.#playerService.getAllPlayers();
      
      return res.json({ data: players });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getPlayer = async ({ params }, res) => {
    try {
      const { id } = params;
      const player = this.#playerService.getPlayer(id);
      if (!player) return res.status(404).json({ error: "Player not found" });

      return res.json({ data: player });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createPlayer = async ({ body }, res) => {
    try {
      const { name, id } = body;
      const newPlayer = this.#playerService.createPlayer(id, name);
      
      if (this.#io) {
        this.#io.emit('playerJoined', newPlayer);
      }
      
      return res.status(201).json({ data: newPlayer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PlayerController;
