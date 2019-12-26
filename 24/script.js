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

const readi = (field, x, y) => read(field, x, y) === '#' ? 1 : 0
const read = (field, x, y) => {
    if(x < 0 || x >= width) return '.'
    if(y < 0 || y >= width) return '.'
    return field[y * width + x]
}
const write = (field, x, y, value) => field[y * width + x] = value

const step = (field) => {
    let newField = [...field];
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < width; y++) {
            let count = readi(field, x - 1, y)
                + readi(field, x + 1, y)
                + readi(field, x, y - 1)
                + readi(field, x, y + 1)
            if(read(field, x, y) === '#') {
                write(newField, x, y, count === 1 ? '#' : '.')
            } else {
                write(newField, x, y, (count == 1 || count == 2) ? '#' : '.')
            }
        }
    }
    
    return newField.join('');
}

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
