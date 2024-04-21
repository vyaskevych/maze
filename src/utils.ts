import Robot, { Direction } from './robot';
import Maze from './maze';
import Display from './display';

export enum State {
  Empty,
  Wall,
  Visited,
  Start,
  End,
}

export interface Point {
  x: number;
  y: number;
}

export function createEntity(nameMaze: string, i: number) {
  const maze = new Maze(nameMaze);
  const robot = new Robot(maze.maze, maze.start, maze.end);
  const display = new Display(maze.maze, maze.start, `maze_${i + 1}`);
  return { maze, robot, display };
}
