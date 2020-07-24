//Objective is to make sure a robot cleans a room, not knowing where it started
//and having obstacles along the way. We know that the robot originally faces up.

class Robot {
    constructor(board, row, col) {
        this.board = board
        this.row = row 
        this.col = col
        this.direction = [0,1]
    }

    move() {
        if (this.board[row + direction[0]][col + direction[1]] != 1) {
            return true
        }
        return false
    }

    clean() {
        this.board[this.row][this.col] = 'X'
    }

    turnRight() {
        if (this.direction[0] == 0 && this.direction[1] == 1) {
            this.direction = [1,0]
        } else if (this.direction[0] == 1 && this.direction[1] == 0) {
            this.direction = [0,-1]
        } else if (this.direction[0] == 0 && this.direction[1] == -1) {
            this.direction = [-1,0]
        } else if (this.direction[0] == -1 && this.direction[1] == 0) {
            this.direction = [0,1]
        }
     }

    turnLeft() {
        if (this.direction[0] == 0 && this.direction[1] == 1) {
            this.direction = [-1,0]
        } else if (this.direction[0] == -1 && this.direction[1] == 0) {
            this.direction = [0,-1]
        } else if (this.direction[0] == 0 && this.direction[1] == -1) {
            this.direction = [1,0]
        } else if (this.direction[0] == 1 && this.direction[1] == 0) {
            this.direction = [0,1]
        }
    }

    check() {
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j] == '0') {
                    return false
                }
            }
        }

        return true
    }
}

let board = 
[[1,1,1,1,1,0,1,1],
 [1,1,1,1,1,0,1,1],
 [1,0,1,1,1,1,1,1],
 [0,0,0,1,0,0,0,0],
 [1,1,1,1,1,1,1,1]]

let robot = new Robot(board, 1, 3)


//O(4^(n - m)) solution where n is the number of cells in the room
//and m is the number of obstacles
//We use a 'spiral backtracking' algorithm to test all possible cells,
//and if we get stuck, we backtrack to where we were not stuck

let directions = [[-1,0], [0,1], [1,0], [0,-1]]
let visited = new Set()

function backtrack(row, col, dir) {
    visited.add([row, col].join(','))
    robot.clean()
    
    //For all four directions, get valid new coordinates then turn right
    for (let i = 0; i < 4; i++) {
        let nextDir = (dir + i) % 4
        let nextRow = row + directions[nextDir][0]
        let nextCol = col + directions[nextDir][1]
        if (!visited.has([nextRow, nextCol].join(',')) && robot.move()) {
            backtrack(nextRow, nextCol, nextDir)
            goBack()
        }
        robot.turnRight()
    }
}

function goBack() {
    robot.turnRight()
    robot.turnRight()
    robot.move()
    robot.turnRight()
    robot.turnRight()
}

backtrack(0, 0, 0)