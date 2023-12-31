import { CellType } from "./cell";

export function generateMatrix(rows: number, cols: number, turnFactor: number): CellType[][] {
    const matrix: CellType[][] = Array<CellType[]>(rows).fill([]).map(() => Array<CellType>(cols).fill("EMPTY"));
    const currentPoint = { x: 0, y: 0 };

    while (currentPoint.x < cols - 1) {
        matrix[currentPoint.y][currentPoint.x] = "PATH";
        const nextPoint = pickNextPoint(matrix, currentPoint.x, currentPoint.y, rows, cols, turnFactor);
        if (nextPoint.x === -1) break;
        currentPoint.x = nextPoint.x;
        currentPoint.y = nextPoint.y;
    }

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (matrix[y][x] === "EMPTY") {
                const neighbors = checkNeighbors(matrix, x, y, rows, cols);
                if (neighbors > 1)
                    matrix[y][x] = "SLOT";
                else if (neighbors > 0)
                    matrix[y][x] = "WALL";
            }
        }
    }
    return matrix;
};



function checkNeighbors(matrix: CellType[][], x: number, y: number, rows: number, cols: number): number {
    if (!isValidPoint(x, y, rows, cols)) return -1;
    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];
    let count = 0;
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (isPathPoint(matrix, nx, ny, rows, cols))
            count++;
    }
    return count;
};

function pickNextPoint(matrix: CellType[][], x: number, y: number, rows: number, cols: number, turnFactor: number): { x: number, y: number, } {
    const choices: { x: number, y: number }[] = [];

    const up_point = { x: x, y: y - 1 };
    if (checkNeighbors(matrix, up_point.x, up_point.y, rows, cols) === 1)
        choices.push(up_point);

    const down_point = { x: x, y: y + 1 };
    if (checkNeighbors(matrix, down_point.x, down_point.y, rows, cols) === 1)
        choices.push(down_point);

    const right_point = { x: x + 1, y: y };
    if (checkNeighbors(matrix, right_point.x, right_point.y, rows, cols) === 1)
        choices.push(right_point);

    if (choices.length === 0)
        return { x: -1, y: -1 };
    else if (choices.length === 1)
        return choices[0];
    else if (choices.includes(up_point)) {
        if (Math.random() > turnFactor)
            return up_point;
        else
            return choices[Math.floor(Math.random() * (choices.length - 1))];
    }
    else
        return choices[Math.floor(Math.random() * choices.length)];

};

function isPathPoint(matrix: CellType[][], x: number, y: number, rows: number, cols: number): boolean {
    if (isValidPoint(x, y, rows, cols) && matrix[y][x] === "PATH")
        return true;
    return false;
};

function isValidPoint(x: number, y: number, rows: number, cols: number): boolean {
    return x >= 0 && x < cols && y >= 0 && y < rows;
}