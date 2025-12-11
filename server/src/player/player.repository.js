export class PlayerRepository {
  constructor() {
    // MVP in-memory storage
    this.players = new Map();
  }

  addPlayer(player) {
    this.players.set(player.id, player);
    console.log(this.players.values());
    return this.getPlayer(player.id);
  }

  getPlayer(id) {
    return this.players.get(id);
  }

  getAllPlayers() {
    return Array.from(this.players.values());
  }

  removePlayer(id) {
    this.players.delete(id);
  }

  updatePlayerVote(id, vote) {
    const player = this.players.get(id);
    if (player) {
      player.voted = true;
      player.vote = vote;
    }
  }

  resetVotes() {
    this.players.forEach(player => {
      player.voted = false;
      player.vote = null;
    });
  }

  clear() {
    this.players.clear();
  }
}
