export class Task {
  constructor(id, description = "", expectedPomodoros = 1) {
    this.id = id;
    this.description = description;
    this.expectedPomodoros = expectedPomodoros;
    this.actualPomodoros = 0;
  }
}
