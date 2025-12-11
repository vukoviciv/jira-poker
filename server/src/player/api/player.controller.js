export class PlayerController {
  #playerService;

  constructor(service) {
    this.#playerService = service;
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
      
      return res.status(201).json({ data: newPlayer });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// TODO: create simple DI container
export default PlayerController;
