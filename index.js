let WIDTH = 5;
let HEIGHT = 5;
let PUZZLE;
let FROM = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
]
let TO = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0],
]

window.onload = function() {
    let code = window.location.hash.slice(1);
    if (code.length) {
        code = code.split(",");
        HEIGHT = Number(code[0]);
        WIDTH = Number(code[1]);
        FROM = []; TO = [];
        for (let i = 0; i < HEIGHT; i++) {
            FROM.push([]); TO.push([]);
            for (let j = 0; j < WIDTH; j++) {
                let ptr = Number(code[2][i * WIDTH + j]);
                FROM[i].push(ptr % 2); TO[i].push(ptr >> 1);
            }
        }
    }
    let puzzle = document.getElementById("puzzle");
    puzzle.style.width = (WIDTH + 2) * 40;
    puzzle.style.height = (HEIGHT + 2) * 40;
    initPanel();
}

function initPanel() {
    PUZZLE = FROM.map(x => [...x]);
    updatePuzzle();
}

function checkSolve() {
    let ret = true;
    for (let j = 0; j < WIDTH; j++) for (let i = 0; i < HEIGHT; i++) if (PUZZLE[i][j] != TO[i][j]) ret = false;
    return ret;
}

function isInBound(x, y) {
    return (0 <= x && x < WIDTH && 0 <= y && y < HEIGHT);
}
function updatePuzzle() {
    let puzzle = document.getElementById("puzzle");
    let solved = checkSolve();
    while (puzzle.firstChild) puzzle.removeChild(puzzle.firstChild);
    for (let i = -1; i <= HEIGHT; i++) {
        let row = document.createElement("div")
        row.classList.add("hlist");
        for (let j = -1; j <= WIDTH; j++) {
            let button = document.createElement("button");
            if (!isInBound(j, i)) button.classList.add("disabled");
            else {
                if (PUZZLE[i][j]) button.classList.add("active");
                if (TO[i][j]) button.classList.add("answer");
                if (solved) button.classList.add("solved");
            }
            button.addEventListener("click", click(j - (WIDTH / 2 - 0.5), i - (HEIGHT / 2 - 0.5)))
            row.appendChild(button);
        }
        puzzle.appendChild(row);
    }
    if (solved) document.getElementById("lick").style.display = "inline-block"
}

function click(x, y) { if (x === 0 && y === 0) return initPanel; else return () => {
    let prev = PUZZLE.map(x => [...x]); // de-reference
    for (let i = 0; i < HEIGHT; i++) for (let j = 0; j < WIDTH; j++) {
        if (isInBound(j + x, i + y) && prev[i][j]) PUZZLE[i + y][j + x] = !PUZZLE[i + y][j + x];
    }
    updatePuzzle()
}}