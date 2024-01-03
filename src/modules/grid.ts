import { CellType } from "./cell";

export function generateGrid(rows: number, cols: number, turnFactor: number) {
    const matrix: CellType[][] = Array<CellType[]>(rows).fill([]).map(() => Array<CellType>(cols).fill("EMPTY"));
    const currentPoint = { column_index: 0, row_index: 0 };
    const path = [];
    const slots = [];

    while (currentPoint.column_index < cols - 1) {
        matrix[currentPoint.row_index][currentPoint.column_index] = "PATH";
        path.push({ column_index: currentPoint.column_index, row_index: currentPoint.row_index });
        const nextPoint = pickNextPoint(matrix, currentPoint.column_index, currentPoint.row_index, rows, cols, turnFactor);
        if (nextPoint.column_index === -1) break;
        currentPoint.column_index = nextPoint.column_index;
        currentPoint.row_index = nextPoint.row_index;
    }
    matrix[currentPoint.row_index][currentPoint.column_index] = "PATH";
    path.push({ column_index: currentPoint.column_index, row_index: currentPoint.row_index });

    // add 2 slots beside the base
    const upperPoint = { column_index: currentPoint.column_index, row_index: currentPoint.row_index - 1 };
    
    if (isValidPoint(upperPoint.column_index, upperPoint.row_index, rows, cols) && matrix[upperPoint.row_index][upperPoint.column_index] !== "PATH") {
        matrix[upperPoint.row_index][upperPoint.column_index] = "SLOT";
        slots.push(upperPoint);
    }

    const lowerPoint = { column_index: currentPoint.column_index, row_index: currentPoint.row_index + 1 };

    if (isValidPoint(lowerPoint.column_index, lowerPoint.row_index, rows, cols) && matrix[lowerPoint.row_index][lowerPoint.column_index] !== "PATH") {
        matrix[lowerPoint.row_index][lowerPoint.column_index] = "SLOT";
        slots.push(lowerPoint);
    }


    for (let row_index = 0; row_index < rows; row_index++) {
        for (let column_index = 0; column_index < cols; column_index++) {
            if (matrix[row_index][column_index] === "EMPTY") {
                const neighbors = checkRadius(matrix, column_index, row_index, rows, cols);
                if (neighbors > 3) {
                    matrix[row_index][column_index] = "SLOT";
                    slots.push({ column_index, row_index });
                }
            }
        }
    }

    let dx = [0, 1, 0, -1, 1, 1, -1, -1];
    let dy = [-1, 0, 1, 0, -1, 1, 1, -1];
    for (let row_index = 0; row_index < rows; row_index++) {
        for (let column_index = 0; column_index < cols; column_index++) {
            if (matrix[row_index][column_index] === "SLOT" || matrix[row_index][column_index] === "PATH") {
                for (let i = 0; i < 8; i++) {
                    const nx = column_index + dx[i];
                    const ny = row_index + dy[i];
                    if (isValidPoint(nx, ny, rows, cols) && matrix[ny][nx] === "EMPTY")
                        matrix[ny][nx] = "WALL";
                }
            }
        }
    }

    return {
        matrix,
        path,
        slots
    };
};

function checkRadius(matrix: CellType[][], column_index: number, row_index: number, rows: number, cols: number): number {
    if (!isValidPoint(column_index, row_index, rows, cols)) return -1;
    const dx = [0, 1, 0, -1, 1, 1, -1, -1];
    const dy = [-1, 0, 1, 0, -1, 1, 1, -1];
    let count = 0;
    for (let i = 0; i < 8; i++) {
        const nx = column_index + dx[i];
        const ny = row_index + dy[i];
        if (!isValidPoint(nx, ny, rows, cols)) continue;
        if (matrix[ny][nx] === "PATH")
            count++;
        if (matrix[ny][nx] === "SLOT")
            return -1;
    }
    return count;
}


function checkNeighbors(matrix: CellType[][], column_index: number, row_index: number, rows: number, cols: number): number {
    if (!isValidPoint(column_index, row_index, rows, cols) || isPathPoint(matrix, column_index, row_index, rows, cols)) return -1;
    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];
    let count = 0;
    for (let i = 0; i < 4; i++) {
        const nx = column_index + dx[i];
        const ny = row_index + dy[i];
        if (isPathPoint(matrix, nx, ny, rows, cols))
            count++;
    }
    return count;
};

function pickNextPoint(matrix: CellType[][], column_index: number, row_index: number, rows: number, cols: number, turnFactor: number) {
    const choices: { column_index: number, row_index: number }[] = [];

    const right_point = { column_index: column_index + 1, row_index: row_index };
    if (checkNeighbors(matrix, right_point.column_index, right_point.row_index, rows, cols) === 1)
        choices.push(right_point);

    const up_point = { column_index: column_index, row_index: row_index - 1 };
    if (checkNeighbors(matrix, up_point.column_index, up_point.row_index, rows, cols) === 1)
        choices.push(up_point);

    const down_point = { column_index: column_index, row_index: row_index + 1 };
    if (checkNeighbors(matrix, down_point.column_index, down_point.row_index, rows, cols) === 1)
        choices.push(down_point);

    if (choices.length === 0)
        return { column_index: -1, row_index: -1 };
    else if (choices.length === 1 || Math.random() > turnFactor)
        return choices[0];
    else {
        const random = Math.random();
        return choices[Math.floor(1 + Math.pow(random, 0.5) * (choices.length - 1))];
    }
};

function isPathPoint(matrix: CellType[][], column_index: number, row_index: number, rows: number, cols: number): boolean {
    if (isValidPoint(column_index, row_index, rows, cols) && matrix[row_index][column_index] === "PATH")
        return true;
    return false;
};

function isValidPoint(column_index: number, row_index: number, rows: number, cols: number): boolean {
    return column_index >= 0 && column_index < cols && row_index >= 0 && row_index < rows;
}