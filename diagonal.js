// Import stylesheets
// import './style.css';
import { createEntity } from './src/utils.js';


// import traverseMaze from './emptyMazeTask.js';
import { diagonalMaze1, diagonalMaze2, diagonalMaze3 } from './src/mazes/diagonal.js';
const appDiv = document.getElementById('app');
const btnStart = document.getElementById('start');
const resultDiv = document.getElementById('result'); //?
const menuLinks = document.querySelectorAll('.menu a');
const entities = [
    diagonalMaze1,
    diagonalMaze2,
    diagonalMaze3,
].map(createEntity);
entities.forEach(({ display }) => appDiv.append(display.fillTable()));
window.location.hash = 'maze_1';

let traverseMaze;

var out = document.getElementById("outRes");

export function readEditor() {
    var bodyOfFunc = editor.getValue();
    try {
        traverseMaze = createFunc(bodyOfFunc);
        out.innerHTML = "";
    } catch (e) {
        out.innerHTML = "<p style='color: red;'>Error: " + e + "</p>";
    }
}

function createFunc(text) {
    text = changeNameFunction(text);
    var arg = text.substring(text.indexOf("(") + 1, text.indexOf(")"));
    var body = text.substring(text.indexOf("{") + 1, text.lastIndexOf("}"));
    body = `const Direction = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3
    }` + body;
    return new Function(arg, body);
}

function changeNameFunction(text) {
    let nameFunction = text.substring(text.indexOf('function ') + 9, text.indexOf("("));
    return text.replaceAll(nameFunction, 'traverseMaze');
}



btnStart.addEventListener('click', async () => {
    let hashName = '';
    btnStart.disabled = true;
    appDiv.innerHTML = '';
    window.location.hash = hashName;
    readEditor();
    const entities = [
        diagonalMaze1,
        diagonalMaze2,
        diagonalMaze3,
    ].map(createEntity);
    entities.forEach(({ display }) => appDiv.append(display.fillTable()));
    entities.forEach(({ display, robot, maze }, i) => {
        const link = document.querySelector(`[href="#maze_${i + 1}"]`);
        try {
            traverseMaze(robot, maze.width, maze.height);
            if (!robot.finished)
                throw new Error('The goal was not reached!');
            link.classList.remove('error');
            link.classList.add('successful');
            //resultDiv.textContent = 'successful';
            display.table.insertAdjacentHTML('afterbegin', '<caption>successful</caption>');
        }
        catch (e) {
            // resultDiv.textContent = e.message;
            display.table.insertAdjacentHTML('afterbegin', `<caption>${e.message}</caption>`);
            link.classList.remove('successful');
            link.classList.add('error');
        }
        finally {
            display.markVisited();
            btnStart.disabled = false;
            if (link.classList.contains('active')) {
                hashName = link.hash;
            }
        }
    });
    window.location.hash = hashName;
});
menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        menuLinks.forEach((link) => {
            link.classList.remove('active');
        });
        link.classList.add('active');
    });
});
