export class PlayerEntity {
  constructor(id, name, isCurrent) {
    this.id = id;
    this.name = name;
    this.isCurrent = isCurrent;
    this.joinedAt = new Date();
    this.voted = false;
    this.vote = null;
  }
}
