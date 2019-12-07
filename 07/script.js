
// Part1
program = "3,8,1001,8,10,8,105,1,0,0,21,42,67,76,89,110,191,272,353,434,99999,3,9,102,2,9,9,1001,9,2,9,1002,9,2,9,1001,9,2,9,4,9,99,3,9,1001,9,4,9,102,4,9,9,101,3,9,9,1002,9,2,9,1001,9,4,9,4,9,99,3,9,102,5,9,9,4,9,99,3,9,1001,9,3,9,1002,9,3,9,4,9,99,3,9,102,3,9,9,101,2,9,9,1002,9,3,9,101,5,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99"
if(process.argv[2]) {
    console.log(process.argv[2])
    program = process.argv[2]
}
const debug = false

execute = async (name, program, io) => {
    const data = program.split(",").map(x => +x)
    let pc = 0;
    const outputs = []
    if(debug) console.log(' === STARTING EXECUTION', name, '===')
    let running = true;
    while(running) {
        opcode = data[pc] % 100
        modes = ("0".repeat(5 - (""+data[pc]).length) + data[pc]).split("").map(x => +x)
        switch(opcode) {
            case 1:
            case 2:
                if(debug) console.log(name, pc, modes.join(""), opcode === 2 ? "mul" : "add", data[pc + 1], data[pc + 2], data[pc + 3])
                src1 = modes[2] ? data[pc + 1] : data[data[pc + 1]]
                src2 = modes[1] ? data[pc + 2] : data[data[pc + 2]]
                
                dest = data[pc + 3]
                data[dest] = opcode === 2 ? (src1 * src2) : (src1 + src2)
                
                pc += 4;
                break;
            case 3:
                if(debug) console.log(name, pc, modes.join(""), "input", data[pc + 1])
                dest = data[pc + 1]
                data[dest] = await io.next()
                pc += 2;
                break
            case 4:
                if(debug) console.log(name, pc, modes.join(""), "output", data[pc + 1])
                src1 = modes[2] ? data[pc + 1] : data[data[pc + 1]]
                //console.log(src1)
                io.output(src1)
                pc += 2;
                break
            case 5:
            case 6:
                if(debug) console.log(name, pc, modes.join(""), opcode === 5 ? "jump-if-true" : "jump-if-false", data[pc + 1], data[pc + 2])
                src1 = modes[2] ? data[pc + 1] : data[data[pc + 1]]
                dest = modes[1] ? data[pc + 2] : data[data[pc + 2]]
                if(opcode === 5 ? !!src1 : !src1) {
                    pc = dest
                } else {
                    pc += 3;
                }
                break;
            case 7:
                if(debug) console.log(name, pc, modes.join(""), "<", data[pc + 1], data[pc + 2], data[pc + 3])
                src1 = modes[2] ? data[pc + 1] : data[data[pc + 1]]
                src2 = modes[1] ? data[pc + 2] : data[data[pc + 2]]
                dest = data[pc + 3]
                data[dest] = src1 < src2 ? 1 : 0
                pc += 4
                break;
            case 8:
                if(debug) console.log(pc, modes.join(""), "==", data[pc + 1], data[pc + 2], data[pc + 3])
                src1 = modes[2] ? data[pc + 1] : data[data[pc + 1]]
                src2 = modes[1] ? data[pc + 2] : data[data[pc + 2]]
                dest = data[pc + 3]
                data[dest] = src1 === src2 ? 1 : 0
                pc += 4
                break;
            case 99:
                running = false;
                io.halt()
                break;
            default:
                console.log("unknown opcode", opcode)
                break;
        }
    }
    
    return outputs
}


// Ugly permute
permute = (fullIn) => {
    var permArr = [],
    usedChars = [];

    function permuteImpl(input) {
        var i, ch;
        for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            permuteImpl(input);
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr
    };
    return permuteImpl(fullIn);
}


runAsync = async () => {
    best = -1
    for(phases of permute([5, 6, 7, 8, 9])) {
        machines = []
        for(amp = 0; amp < 5; amp++) {
            if(!machines[amp]) {
                let inputs = amp === 0 ? [phases[amp], 0] : [phases[amp]]
                let state = (function() {
                    let id = amp
                    let outputs = []
                    let outputCallback = null 
                    let halted = false
                    let pointer = 0;
                    let triggerResolve = null
                    let checkResolve = () => {
                        if(inputs.length >= pointer) {
                            triggerResolve(inputs[pointer++])
                        }
                    }
                    return {
                        next: () => {
                            if(debug) console.log(id, 'REQUESTING NEXT')
                            return new Promise((resolve, reject) => {
                                triggerResolve = resolve;
                                if(inputs.length > pointer) {
                                    console.log('ALREADY HAVE INPUT: ', inputs, inputs[pointer], pointer)
                                    triggerResolve(inputs[pointer++])
                                }
                            });
                        },
                        addInput: (input) => {
                            if(debug) console.log(id, 'RECEIVED INPUT: ', input)
                            inputs.push(input);
                            checkResolve()
                        },
                        outputs: outputs,
                        outputValue: () => outputs[outputs.length - 1],
                        output: (value) => {
                            if(debug) console.log(id, 'OUTPUTTING: ', value)
                            outputs.push(value);
                            if(outputCallback) {
                                outputCallback(value)
                            }
                        },
                        addOutputCallback: (callback) => {
                            outputCallback = callback
                        },
                        halt: () => { if(debug) console.log(id, 'HALTED'); halted = true},
                        halted: () => halted
                    };
                })()
                let machine = {}
                machine.state = state
                machine.start = () => {
                    machine.resume = execute('AMP' + amp, program, state)
                }
                machines.push(machine);
            }
        }
        for(amp = 0; amp < 5; amp++) {
            const to = (amp + 1) % 5
            console.log('HOOKING up ' + amp + ' to ' + to)
            machines[amp].state.addOutputCallback((value) => machines[to].state.addInput(value))
        }
        for(amp = 0; amp < 5; amp++) {
            console.log('BOOTING up ' + amp)
            machines[amp].start()
        }
        console.log('AWAITING COMPLETION of AMP4')
        await machines[4].resume
        
        
        output = machines[4].state.outputValue()
        console.log(phases.join(''), output)
        if(output > best) {
            best = output
        }
    }
    return best
}
runAsync().then(answer => console.log(answer))
