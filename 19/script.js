
// Part1
program = "109,424,203,1,21102,11,1,0,1105,1,282,21102,1,18,0,1106,0,259,2101,0,1,221,203,1,21102,1,31,0,1106,0,282,21102,38,1,0,1105,1,259,20101,0,23,2,22101,0,1,3,21101,1,0,1,21101,57,0,0,1105,1,303,2101,0,1,222,21001,221,0,3,21002,221,1,2,21101,0,259,1,21102,80,1,0,1106,0,225,21102,89,1,2,21102,91,1,0,1105,1,303,2101,0,1,223,20101,0,222,4,21101,0,259,3,21102,1,225,2,21102,225,1,1,21102,118,1,0,1106,0,225,20101,0,222,3,21101,136,0,2,21101,133,0,0,1106,0,303,21202,1,-1,1,22001,223,1,1,21101,148,0,0,1105,1,259,1202,1,1,223,20102,1,221,4,21001,222,0,3,21102,18,1,2,1001,132,-2,224,1002,224,2,224,1001,224,3,224,1002,132,-1,132,1,224,132,224,21001,224,1,1,21102,195,1,0,106,0,108,20207,1,223,2,20102,1,23,1,21101,-1,0,3,21101,214,0,0,1105,1,303,22101,1,1,1,204,1,99,0,0,0,0,109,5,1202,-4,1,249,21201,-3,0,1,22102,1,-2,2,21202,-1,1,3,21102,1,250,0,1105,1,225,21201,1,0,-4,109,-5,2105,1,0,109,3,22107,0,-2,-1,21202,-1,2,-1,21201,-1,-1,-1,22202,-1,-2,-2,109,-3,2105,1,0,109,3,21207,-2,0,-1,1206,-1,294,104,0,99,22102,1,-2,-2,109,-3,2105,1,0,109,5,22207,-3,-4,-1,1206,-1,346,22201,-4,-3,-4,21202,-3,-1,-1,22201,-4,-1,2,21202,2,-1,-1,22201,-4,-1,1,21201,-2,0,3,21102,343,1,0,1106,0,303,1105,1,415,22207,-2,-3,-1,1206,-1,387,22201,-3,-2,-3,21202,-2,-1,-1,22201,-3,-1,3,21202,3,-1,-1,22201,-3,-1,2,21202,-4,1,1,21102,384,1,0,1105,1,303,1106,0,415,21202,-4,-1,-4,22201,-4,-3,-4,22202,-3,-2,-2,22202,-2,-4,-4,22202,-3,-2,-3,21202,-4,-1,-2,22201,-3,-2,1,21202,1,1,-4,109,-5,2106,0,0"
let data = program.split(",").map(x => +x)

const execute = (data, input) => {
    let pc = 0;
    let rb = 0;
    let debug = false
    let running = true;
    let inputPtr = 0
    let output = []
    const read = (mode, addr) => {
        switch(+mode) {
            case 0:
                return data[data[addr]] || 0;
            case 1:
                return data[addr] || 0;
            case 2:
                return data[rb + data[addr]] || 0;
        }        
    }

    const write = (mode, addr, value) => {
        switch(+mode) {
            case 0:
                data[data[addr]] = value;
                break;
            case 2:
                data[rb + data[addr]] = value;
                break;
        }
    }
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
                write(modes[2], pc + 1, input[inputPtr++])
                pc += 2;
                break
            case 4:
                if(debug) console.log(pc, modes.join(""), "output", data[pc + 1])
                src1 = read(modes[2], pc + 1)
                output.push(src1)
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
                running = false;
                break;
            default:
                console.log("unknown opcode", opcode)
                break;
        }
    }
    return output
}

let sum = 0;
for(let x = 0; x < 50; x++) {
    for(let y = 0; y < 50; y++) {
        const out = execute(program.split(",").map(x => +x), [x, y]);
        sum += out[0]
    }
}
console.log(sum)
