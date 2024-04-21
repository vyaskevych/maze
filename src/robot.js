import { State } from './utils.js';
// export var Direction;
// (function (Direction) {
//     Direction[Direction["Up"] = 0] = "Up";
//     Direction[Direction["Down"] = 1] = "Down";
//     Direction[Direction["Left"] = 2] = "Left";
//     Direction[Direction["Right"] = 3] = "Right";
// })(Direction || (Direction = {}));

export const Direction = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3
}
export default class Robot {
    maze;
    currentPoint;
    end;
    count;
    constructor(maze, start, end) {
        this.maze = maze;
        this.currentPoint = start;
        this.count = 0;
        this.end = end;
    }
    get x() {
        return this.currentPoint.x;
    }
    get y() {
        return this.currentPoint.y;
    }
    get finished() {
        return this.x == this.end.x && this.y == this.end.y;
    }
    moveTo(dir) {
        let dxs = [0, 0, -1, 1];
        let dys = [-1, 1, 0, 0];
        this.tryMoveTo({
            x: this.x + dxs[dir],
            y: this.y + dys[dir],
        });
    }
    tryMoveTo(destination) {
        if (this.count++ > 1000 ||
            this.maze[destination.y][destination.x] === State.Wall) {
            throw new Error(`Robot is broken!`);
        }
        this.currentPoint = destination;
        this.maze[this.currentPoint.y][this.currentPoint.x] = State.Visited;
    }
}
