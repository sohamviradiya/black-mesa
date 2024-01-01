
export type Difficulty = 'ROOKIE' | 'CASUAL' | 'MASTER' | 'VETERAN' | 'INSANE'; 

export function difficultyMapper(difficulty: Difficulty) {
    if (difficulty === "ROOKIE") {
        return {
            rows: 6, 
            columns: 12,
            turnFactor: 0.9,
        }
    }
    else if (difficulty === "CASUAL") {
        return {
            rows: 10,
            columns: 15,
            turnFactor: 0.8,
        }
    }
    else if (difficulty === "MASTER") {
        return {
            rows: 15,
            columns: 24,
            turnFactor: 0.7,
        }
    }
    else if (difficulty === "VETERAN") {
        return {
            rows: 20,
            columns: 40,
            turnFactor: 0.6,
        }
    }
    else if (difficulty === "INSANE") {
        return {
            rows: 30,
            columns: 50,
            turnFactor: 0.5,
        }
    }
    else {
        throw new Error("Invalid difficulty");
    }
}