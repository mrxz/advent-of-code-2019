
// Part1
program = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,5,23,1,6,23,27,1,27,5,31,2,31,10,35,2,35,6,39,1,39,5,43,2,43,9,47,1,47,6,51,1,13,51,55,2,9,55,59,1,59,13,63,1,6,63,67,2,67,10,71,1,9,71,75,2,75,6,79,1,79,5,83,1,83,5,87,2,9,87,91,2,9,91,95,1,95,10,99,1,9,99,103,2,103,6,107,2,9,107,111,1,111,5,115,2,6,115,119,1,5,119,123,1,123,2,127,1,127,9,0,99,2,0,14,0"
data = program.split(",").map(x => +x)

// 1202 state
data[1] = 12
data[2] = 02


pc = 0;
running = true;
while(running) {
    switch(data[pc]) {
        case 1:
        case 2:
            src1 = data[data[pc + 1]]
            src2 = data[data[pc + 2]]
            
            dest = data[pc + 3]
            data[dest] = data[pc] === 2 ? (src1 * src2) : (src1 + src2)
            
            pc += 4;
            break;
        case 99:
            running = false;
            break;
    }
}
console.log(data[0]);

// Part2
for(x = 0; x < 100; x++) for(y = 0; y < 100; y++) {
    program = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,5,23,1,6,23,27,1,27,5,31,2,31,10,35,2,35,6,39,1,39,5,43,2,43,9,47,1,47,6,51,1,13,51,55,2,9,55,59,1,59,13,63,1,6,63,67,2,67,10,71,1,9,71,75,2,75,6,79,1,79,5,83,1,83,5,87,2,9,87,91,2,9,91,95,1,95,10,99,1,9,99,103,2,103,6,107,2,9,107,111,1,111,5,115,2,6,115,119,1,5,119,123,1,123,2,127,1,127,9,0,99,2,0,14,0"
    data = program.split(",").map(x => +x)

    // noun verb state
    data[1] = x
    data[2] = y

    pc = 0;
    running = true;
    while(running) {
        switch(data[pc]) {
            case 1:
            case 2:
                src1 = data[data[pc + 1]]
                src2 = data[data[pc + 2]]
                
                dest = data[pc + 3]
                data[dest] = data[pc] === 2 ? (src1 * src2) : (src1 + src2)
                
                pc += 4;
                break;
            case 99:
                running = false;
                break;
        }
    }
    
    if(data[0] === 19690720) {
        console.log(x, y);
    }
}
console.log(data[0]);
