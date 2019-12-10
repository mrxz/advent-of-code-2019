input = [
"##.##..#.####...#.#.####",
"##.###..##.#######..##..",
"..######.###.#.##.######",
".#######.####.##.#.###.#",
"..#...##.#.....#####..##",
"#..###.#...#..###.#..#..",
"###..#.##.####.#..##..##",
".##.##....###.#..#....#.",
"########..#####..#######",
"##..#..##.#..##.#.#.#..#",
"##.#.##.######.#####....",
"###.##...#.##...#.######",
"###...##.####..##..#####",
"##.#...#.#.....######.##",
".#...####..####.##...##.",
"#.#########..###..#.####",
"#.##..###.#.######.#####",
"##..##.##...####.#...##.",
"###...###.##.####.#.##..",
"####.#.....###..#.####.#",
"##.####..##.#.##..##.#.#",
"#####..#...####..##..#.#",
".##.##.##...###.##...###",
"..###.########.#.###..#."
]

// Example input
// Answer should be: 802
/*
input = [
".#..##.###...#######",
"##.############..##.",
".#.######.########.#",
".###.#######.####.#.",
"#####.##.#.##.###.##",
"..#####..#.#########",
"####################",
"#.####....###.#.#.##",
"##.#################",
"#####.##.###..####..",
"..######..##.#######",
"####.##.####...##..#",
".#####..#.######.###",
"##...#.##########...",
"#.##########.#######",
".####.#.###.###.#.##",
"....##.##.###..#####",
".#.#.###########.###",
"#.#.#.#####.####.###",
"###.##.####.##.#..##"
]*/

// Part1
asteroids = {}
for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
        if(input[y][x] === '#') {
            asteroids[`${x},${y}`] = {
                x: x,
                y: y,
            }
        }
    }
}

var gcd = (a, b) => !b ? a :gcd(b, a % b)

best = null
for(let asteroid of Object.values(asteroids)) {
    let matches = {}
    for(let other of Object.values(asteroids)) {
        if(other === asteroid) {
            continue;
        }
        
        translated = {
            x: other.x - asteroid.x,
            y: other.y - asteroid.y
        }
        
        // Normalize
        factor = gcd(Math.abs(translated.x), Math.abs(translated.y));
        translated.x /= factor;
        translated.y /= factor;
        
        matches[`${translated.x},${translated.y}`] = true;
    }

    let chars = [...input[asteroid.y]]
    let amount = Object.keys(matches).length
    chars.splice(asteroid.x, 1, amount+'');
    input[asteroid.y] = chars.join("");
    
    if(!best || amount > best.amount) {
        best = {
            amount: amount,
            x: asteroid.x,
            y: asteroid.y
        }
    }
}

console.log(best)

// Part 2
base = Object.values(asteroids).find(a => a.x == best.x && a.y == best.y)

let matches = {}
for(let other of Object.values(asteroids)) {
    if(other === base) {
        continue;
    }
    
    translated = {
        x: other.x - base.x,
        y: other.y - base.y
    }
    
    // Normalize
    factor = gcd(Math.abs(translated.x), Math.abs(translated.y));
    angle = Math.atan2(translated.x / factor, translated.y / factor)
    
    if(!(angle in matches)) {
        matches[angle] = []
    }
    matches[angle].push(translated);
}
for(let list of Object.values(matches)) {
    list.sort((a, b) => {
        factorA = gcd(Math.abs(a.x), Math.abs(a.y));
        factorB = gcd(Math.abs(b.x), Math.abs(b.y));
        return factorA - factorB;
    });
}

sortedKeys = Object.keys(matches).sort((a,b) => a - b)
index = 0
while(sortedKeys[index] < Math.PI) index++
vaporized = 0
last = null
while(vaporized < 200) {
    if(matches[sortedKeys[index]].length) {
        last = matches[sortedKeys[index]].splice(0, 1);
        console.log(sortedKeys[index], last[0].x + base.x, last[0].y + base.y)
        vaporized++;
    }
    
    index = (index - 1);
    if(index < 0) {
        index = sortedKeys.length - 1
    }
}

console.log((last[0].x + base.x) * 100 + (last[0].y + base.y))
