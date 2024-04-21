import { State, Point } from './utils';

export default class Maze {
  map = {
    '#': State.Wall,
    s: State.Start,
    e: State.End,
    _: State.Empty,
  };
  maze: State[][];
  start: Point;
  end: Point;

  constructor(maze: string) {
    this.maze = maze
      .replaceAll(' ', '_')
      .split('\n')
      .map((row, y) =>
        row.split('').map((e, x) => {
          if (e === 's') this.start = { x, y };
          else if (e === 'e') this.end = { x, y };
          return this.map[e];
        })
      );
  }

  clearMaze() {
    console.log('clear 1', this.maze);
    for (let y = 0; y < this.maze.length; y++) {
      for (let x = 0; x < this.maze[y].length; x++) {
        if (this.maze[y][x] === 2) this.maze[y][x] = 0;
      }
    }
    // this.maze.forEach((row) =>
    //   row.forEach((point) => {
    //     if (point === State.Visited) point = State.Empty;
    //   })
    // );
    console.log('clear 2', this.maze);
  }

  get width() {
    return this.maze[0].length;
  }

  get height() {
    return this.maze.length;
  }
}
