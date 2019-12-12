const input = [
    "<x=4, y=12, z=13>",
    "<x=-9, y=14, z=-3>",
    "<x=-7, y=-1, z=2>",
    "<x=-11, y=17, z=-1>"
]

const bodies = input
    .map(i => i.substring(1, i.length - 1))
    .map(i => i.split(", "))
    .map(i => ({
        x: +i[0].substring(2),
        y: +i[1].substring(2),
        z: +i[2].substring(2),
        vx: 0,
        vy: 0,
        vz: 0
    }));
console.log(bodies)

// Part 1
let t = 0;
while(t++ < 1000) {
    // Apply gravity
    for(let x = 0; x < bodies.length; x++) {
        for(let y = x + 1; y < bodies.length; y++) {
            for(let axis of ["x", "y", "z"]) {
                const vaxis = `v${axis}`
                if(bodies[x][axis] < bodies[y][axis]) {
                    bodies[x][vaxis] += 1;
                    bodies[y][vaxis] += -1;
                } else if(bodies[x][axis] > bodies[y][axis]) {
                    bodies[x][vaxis] += -1;
                    bodies[y][vaxis] += 1;
                }
            }
        }
    }
    
    // Apply velocity
    bodies.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        b.z += b.vz;
    });
    console.log("Step ", t)
    
    // Compute energy
    const sum = bodies.reduce((total, cur) => {
        const pot = Math.abs(cur.x) + Math.abs(cur.y) + Math.abs(cur.z)
        const kin = Math.abs(cur.vx) + Math.abs(cur.vy) + Math.abs(cur.vz)
        console.log("Step", total, pot, kin, pot * kin)
        return total + (pot * kin);
    }, 0)
    console.log(sum)
}

// Part 2 (xLoop * yLoop * zLoop) / divisor
// Find loop
findLoop = (bodies, axis) => {
    const states = {}
    const vaxis = `v${axis}`
    let t = 0;
    while(t++ || true) {
        // Apply gravity
        for(let x = 0; x < bodies.length; x++) {
            for(let y = x + 1; y < bodies.length; y++) {
                if(bodies[x][axis] < bodies[y][axis]) {
                    bodies[x][vaxis] += 1;
                    bodies[y][vaxis] += -1;
                } else if(bodies[x][axis] > bodies[y][axis]) {
                    bodies[x][vaxis] += -1;
                    bodies[y][vaxis] += 1;
                }
            }
        }
        
        // Apply velocity
        bodies.forEach(b => {
            b[axis] += b[vaxis];
        });
        
        const state = `${bodies[0][axis]};${bodies[0][vaxis]};${bodies[1][axis]};${bodies[1][vaxis]};${bodies[2][axis]};${bodies[2][vaxis]}`
        if(state in states) {
            console.log("Found loop for", axis, t - 1);
            return t - 1;
            break;
        }
        states[state] = true
    }
}

const xLoop = findLoop(JSON.parse(JSON.stringify(bodies)), "x")
const yLoop = findLoop(JSON.parse(JSON.stringify(bodies)), "y")
const zLoop = findLoop(JSON.parse(JSON.stringify(bodies)), "z")
const gcd = (a, b) => !b ? a :gcd(b, a % b)

let result = (xLoop * yLoop) / gcd(xLoop, yLoop)
result = (result * zLoop) / gcd(result, zLoop)
console.log(result)
