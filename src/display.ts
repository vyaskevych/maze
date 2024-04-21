import { State, Point } from './utils';

export default class Display {
  private mazeState: { [key in State]: string } = {
    [State.Empty]: '',
    [State.Wall]: 'wall',
    [State.Visited]: 'visited',
    [State.Start]: 'start',
    [State.End]: 'end',
  };

  maze: State[][];
  table: HTMLTableElement;
  start: Point;

  constructor(maze: State[][], start: Point, name: string) {
    this.maze = maze;
    this.table = document.createElement('table');
    this.table.id = name;
    this.start = start;
  }

  fillTable() {
    const t = this.maze
      .map(
        (row) =>
          `<tr>${row
            .map((col) => `<td class="${this.mazeState[col]}"></td>`)
            .join('')}</tr>`
      )
      .join('');
    this.table.insertAdjacentHTML('afterbegin', t);
    return this.table;
  }

  clearMaze() {
    [...this.table.rows].forEach((row) =>
      [...row.cells].forEach((cell) => {
        cell.classList.remove('visited');
        cell.textContent = '';
      })
    );
  }

  markVisited() {
    this.table.rows[this.start.y].cells[this.start.x].classList.add('visited');
    for (let y = 0; y < this.maze.length; y++) {
      for (let x = 0; x < this.maze[y].length; x++) {
        if (this.maze[y][x] === State.Visited) {
          // this.table.rows[y].cells[x].textContent = '•';
          this.table.rows[y].cells[x].classList.add('visited');
        }
      }
    }
  }
}
