
const input = [
    "<x=4, y=12, z=13>",
    "<x=-9, y=14, z=-3>",
    "<x=-7, y=-1, z=2>",
    "<x=-11, y=17, z=-1>"
]/**//*
const input = [
"<x=-1, y=0, z=2>",
"<x=2, y=-10, z=-7>",
"<x=4, y=-8, z=8>",
"<x=3, y=5, z=-1>"
]*/

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
            // X
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
    console.log(bodies)
    
    // Compute energy
    const sum = bodies.reduce((total, cur) => {
        const pot = Math.abs(cur.x) + Math.abs(cur.y) + Math.abs(cur.z)
        const kin = Math.abs(cur.vx) + Math.abs(cur.vy) + Math.abs(cur.vz)
        console.log("Step", total, pot, kin, pot * kin)
        return total + (pot * kin);
    }, 0)
    console.log(sum)
}
