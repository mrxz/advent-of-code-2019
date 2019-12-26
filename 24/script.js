
const input = "#..#." +
"....." +
".#..#" +
"....." +
"#.#.."

/*
const input = "....#" +
"#..#." +
"#..##" +
"..#.." +
"#...."*/
const width = 5

const readi = (field, x, y, z, dir) => {
    // Going outward
    if(x < 0) {
        return read(field, 1, 2, z - 1) === '#' ? 1 : 0
    } else if(x >= width) {
        return read(field, 3, 2, z - 1) === '#' ? 1 : 0
    } else if(y < 0) {
        return read(field, 2, 1, z - 1) === '#' ? 1 : 0
    } else if(y >= width) {
        return read(field, 2, 3, z - 1) === '#' ? 1 : 0
    }
    
    // Going inward
    if(x === 2 && y === 2) {
        if(dir === 'U') {
            return readi(field, 0, 4, z + 1)
                + readi(field, 1, 4, z + 1)
                + readi(field, 2, 4, z + 1)
                + readi(field, 3, 4, z + 1)
                + readi(field, 4, 4, z + 1)
        } else if(dir === 'R') {
            return readi(field, 0, 0, z + 1)
                + readi(field, 0, 1, z + 1)
                + readi(field, 0, 2, z + 1)
                + readi(field, 0, 3, z + 1)
                + readi(field, 0, 4, z + 1)
        } else if(dir === 'D') {
            return readi(field, 0, 0, z + 1)
                + readi(field, 1, 0, z + 1)
                + readi(field, 2, 0, z + 1)
                + readi(field, 3, 0, z + 1)
                + readi(field, 4, 0, z + 1)
        } else if(dir === 'L') {
            return readi(field, 4, 0, z + 1)
                + readi(field, 4, 1, z + 1)
                + readi(field, 4, 2, z + 1)
                + readi(field, 4, 3, z + 1)
                + readi(field, 4, 4, z + 1)
        } else {
            console.log('INVALID DIRECTION!');
        }
    }
    
    // Normal
    return read(field, x, y, z) === '#' ? 1 : 0
}
const read = (field, x, y, z) => {
    if(x < 0 || x >= width) return '.'
    if(y < 0 || y >= width) return '.'
    return (field[z] || [])[y * width + x] || '.'
}
const write = (field, x, y, z, value) => {
    if(!(z in field)) {
        field[z] = []
    }
    field[z][y * width + x] = value
}

const count = (field) => {
    let sum = 0;
    for(let level of Object.keys(field)) {
        for(let i = 0; i < 25; i++) {
            if(field[level][i] === '#') {
                sum += 1;
            }
        }
    }
    return sum;
}

const step = (field) => {
    let newField = JSON.parse(JSON.stringify(field));
    // Check if bugs can go outward
    let min = Object.keys(field).map(x => +x).reduce((a,b) => b < a ? b : a)
    {
        let sum = 0
        for(let i = 0; i < 5; i++) {
            sum += readi(field, i, 0, min) + readi(field, i, 4, min) + readi(field, 0, i, min) + readi(field, 4, i, min);
        }
        if(sum > 0) {
            min--;
        }
    }
    let max = Object.keys(field).map(x => +x).reduce((a,b) => b > a ? b : a)
    {
        let sum = readi(field, 1, 2, max) + readi(field, 3, 2, max) + readi(field, 2, 1, max) + readi(field, 2, 3, max);
        if(sum > 0) {
            max++;
        }
    }

    for(let z = min; z <= max; z++) {
        for(let x = 0; x < width; x++) {
            for(let y = 0; y < width; y++) {
                if(x === 2 && y == 2) {
                    write(newField, x, y, z, '.')
                    continue
                }
                let count = readi(field, x - 1, y, z, 'L')
                    + readi(field, x + 1, y, z, 'R')
                    + readi(field, x, y - 1, z, 'U')
                    + readi(field, x, y + 1, z, 'D')
                if(read(field, x, y, z) === '#') {
                    write(newField, x, y, z, count === 1 ? '#' : '.')
                } else {
                    write(newField, x, y, z, (count == 1 || count == 2) ? '#' : '.')
                }
            }
        }
    }
    
    return newField
}

// Part 1
/*
const terminal = '.'.repeat(25)
const states = []
let state = input
do {
    states.push(state)
    console.log(state)
    state = step(state)
} while(states.indexOf(state) === -1 && state !== terminal)

console.log(state)
let sum = 0
for(let i = 0; i < width ** 2; i++) {
    if(state[i] === '#') {
        sum += Math.pow(2, i);
    }
}
console.log(sum)
*/

// Part 2
let state = [[...input]]
for(let i = 0; i < 200; i++) {
    state = step(state);
    console.log(count(state))
}

for(let z = -5; z <= 5; z++) {
    let line = "";
    for(let y = 0; y < width; y++) {
        for(let x = 0; x < width; x++) {
            if(x === 2 && y === 2) {
                line += '?'
            } else {
                line += read(state, x, y, z)
            }
        }
        line += '\n'
    }
    console.log(line, count([state[z]]));
    console.log()
}
