
// Part1
program = "3,8,1005,8,310,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,29,1,2,11,10,1,1101,2,10,2,1008,18,10,2,106,3,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,67,2,105,15,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,93,2,1001,16,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,119,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,141,2,7,17,10,1,1103,16,10,3,8,1002,8,-1,10,101,1,10,10,4,10,108,0,8,10,4,10,102,1,8,170,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,193,1,7,15,10,2,105,13,10,1006,0,92,1006,0,99,3,8,1002,8,-1,10,101,1,10,10,4,10,108,1,8,10,4,10,101,0,8,228,1,3,11,10,1006,0,14,1006,0,71,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,101,0,8,261,2,2,2,10,1006,0,4,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,101,0,8,289,101,1,9,9,1007,9,1049,10,1005,10,15,99,109,632,104,0,104,1,21101,0,387240009756,1,21101,327,0,0,1105,1,431,21101,0,387239486208,1,21102,1,338,0,1106,0,431,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,3224472579,1,1,21101,0,385,0,1106,0,431,21101,0,206253952003,1,21102,396,1,0,1105,1,431,3,10,104,0,104,0,3,10,104,0,104,0,21102,709052072296,1,1,21102,419,1,0,1105,1,431,21102,1,709051962212,1,21102,430,1,0,1106,0,431,99,109,2,21202,-1,1,1,21102,1,40,2,21102,462,1,3,21102,452,1,0,1105,1,495,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,457,458,473,4,0,1001,457,1,457,108,4,457,10,1006,10,489,1101,0,0,457,109,-2,2105,1,0,0,109,4,2102,1,-1,494,1207,-3,0,10,1006,10,512,21101,0,0,-3,22101,0,-3,1,21202,-2,1,2,21102,1,1,3,21101,531,0,0,1105,1,536,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,559,2207,-4,-2,10,1006,10,559,21202,-4,1,-4,1105,1,627,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21102,1,578,0,1105,1,536,21202,1,1,-4,21102,1,1,-1,2207,-4,-2,10,1006,10,597,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,619,21201,-1,0,1,21102,1,619,0,106,0,494,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2106,0,0"
data = program.split(",").map(x => +x)

read = (mode, addr) => {
    switch(+mode) {
        case 0:
            return data[data[addr]] || 0;
        case 1:
            return data[addr] || 0;
        case 2:
            return data[rb + data[addr]] || 0;
    }        
}

write = (mode, addr, value) => {
    switch(+mode) {
        case 0:
            data[data[addr]] = value;
            break;
        case 2:
            data[rb + data[addr]] = value;
            break;
    }
}

let field = {}
field["0,0"] = 1
let x = y = 0;
let direction = 0;
let painting = true

pc = 0;
rb = 0;
debug = true
running = true;
while(running) {
    opcode = data[pc] % 100
    modes = ("0".repeat(5 - (""+data[pc]).length) + data[pc]).split("").map(x => +x)
    switch(opcode) {
        case 1:
        case 2:
            if(debug) console.log(pc, modes.join(""), opcode === 2 ? "mul" : "add", data[pc + 1], data[pc + 2], data[pc + 3])
            src1 = read(modes[2], pc + 1)
            src2 = read(modes[1], pc + 2)
            
            dest = data[pc + 3]
            write(modes[0], pc + 3, opcode === 2 ? (src1 * src2) : (src1 + src2))
            
            pc += 4;
            break;
        case 3:
            if(debug) console.log(pc, modes.join(""), "input", data[pc + 1])
            console.log(`Reading ${x},${y}:r ${['black', 'white'][field[x + "," + y] || 0]}`)
            write(modes[2], pc + 1, field[`${x},${y}`] || 0)
            pc += 2;
            break
        case 4:
            if(debug) console.log(pc, modes.join(""), "output", data[pc + 1])
            src1 = read(modes[2], pc + 1)
            if(painting) {
                console.log(`painting ${x},${y}: ${src1 ? 'white' : 'black'}`)
                field[`${x},${y}`] = src1
            } else {
                console.log(`pointing ${['up', 'right', 'down', 'left'][direction]}`)
                direction = (direction + (src1 ? 1 : -1) + 4) % 4;
                if(direction === 0 || direction === 2) {
                    y += direction ? -1 : 1
                } else {
                    x += direction === 1 ? 1 : -1
                }
                console.log(`moving ${['up', 'right', 'down', 'left'][direction]} to ${x},${y}`)
            }
            painting ^= true
            pc += 2;
            break
        case 5:
        case 6:
            if(debug) console.log(pc, modes.join(""), opcode === 5 ? "jump-if-true" : "jump-if-false", data[pc + 1], data[pc + 2])
            src1 = read(modes[2], pc + 1)
            dest = read(modes[1], pc + 2) 
            if(opcode === 5 ? !!src1 : !src1) {
                pc = dest
            } else {
                pc += 3;
            }
            break;
        case 7:
            if(debug) console.log(pc, modes.join(""), "<", data[pc + 1], data[pc + 2], data[pc + 3])
            src1 = read(modes[2], pc + 1)
            src2 = read(modes[1], pc + 2)
            write(modes[0], pc + 3, src1 < src2 ? 1 : 0)
            pc += 4
            break;
        case 8:
            if(debug) console.log(pc, modes.join(""), "==", data[pc + 1], data[pc + 2], data[pc + 3])
            src1 = read(modes[2], pc + 1)
            src2 = read(modes[1], pc + 2)
            write(modes[0], pc + 3, src1 === src2 ? 1 : 0)
            pc += 4
            break;
        case 9:
            if(debug) console.log(pc, modes.join(""), "arb", data[pc + 1])
            rb += read(modes[2], pc + 1)
            pc += 2
            break;
        case 99:
            if(debug) console.log(pc, modes.join(""), "halt")
            running = false;
            break;
        default:
            console.log("unknown opcode", opcode)
            break;
    }
}

console.log(Object.keys(field).length)

// Part 2
bounds = Object.keys(field).reduce((agg, cur) => {
    x = +cur.split(",")[0]
    y = +cur.split(",")[1]
    if(x < agg.minX) agg.minX = x;
    if(x > agg.maxX) agg.maxX = x;
    if(y < agg.minY) agg.minY = y;
    if(y > agg.maxY) agg.maxY = y;
    return agg
}, {minX: Number.MAX_VALUE, maxX: -Number.MAX_VALUE, minY: Number.MAX_VALUE, maxY: -Number.MAX_VALUE});
console.log(bounds)
for(let y = bounds.maxY; y >= bounds.minY; y--) {
    line = []
    for(let x = bounds.minX; x < bounds.maxX; x++) {
        line.push(field[`${x},${y}`] ? '#' : ' ');
    }
    console.log(line.join(""))
}
