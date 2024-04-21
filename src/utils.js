import Robot from './robot.js';
import Maze from './maze.js';
import Display from './display.js';
export var State;
(function (State) {
    State[State["Empty"] = 0] = "Empty";
    State[State["Wall"] = 1] = "Wall";
    State[State["Visited"] = 2] = "Visited";
    State[State["Start"] = 3] = "Start";
    State[State["End"] = 4] = "End";
})(State || (State = {}));
export function createEntity(nameMaze, i) {
    const maze = new Maze(nameMaze);
    const robot = new Robot(maze.maze, maze.start, maze.end);
    const display = new Display(maze.maze, maze.start, `maze_${i + 1}`);
    return { maze, robot, display };
}


var out = document.getElementById("outRes");

let traverseMaze;

export function readEditor() {
    var bodyOfFunc = editor.getValue();
    try {
        traverseMaze = createFunc(bodyOfFunc);
        
    } catch (e) {
        out.innerHTML = "<p style='color: red;'>Error: " + e + "</p>";
    }
}

function createFunc(text) {
	text = changeNameFunction(text);
	var arg = text.substring(text.indexOf("(") + 1, text.indexOf(")"));
	var body = text.substring(text.indexOf("{") + 1, text.lastIndexOf("}"));
	return new Function(arg, body);
}

function changeNameFunction(text) {
	let nameFunction = text.substring(text.indexOf('function ') + 9, text.indexOf("("));
	return text.replaceAll(nameFunction, 'traverseMaze');
}
