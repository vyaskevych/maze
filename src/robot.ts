import { State, Point } from './utils';
export enum Direction {
  Up,
  Down,
  Left,
  Right,
}
export default class Robot {
  maze: State[][];
  currentPoint: Point;
  end: Point;
  count: number;

  constructor(maze: State[][], start: Point, end: Point) {
    this.maze = maze;
    this.currentPoint = start;
    this.count = 0;
    this.end = end;
  }

  public get x() {
    return this.currentPoint.x;
  }

  public get y() {
    return this.currentPoint.y;
  }

  get finished(): boolean {
    return this.x == this.end.x && this.y == this.end.y;
  }

  moveTo(dir: Direction) {
    let dxs = [0, 0, -1, 1];
    let dys = [-1, 1, 0, 0];
    this.tryMoveTo({
      x: this.x + dxs[dir],
      y: this.y + dys[dir],
    });
  }
  private tryMoveTo(destination: Point) {
    if (
      this.count++ > 1000 ||
      this.maze[destination.y][destination.x] === State.Wall
    ) {
      throw new Error(`Robot is broken!`);
    }

    this.currentPoint = destination;
    this.maze[this.currentPoint.y][this.currentPoint.x] = State.Visited;
  }
}
