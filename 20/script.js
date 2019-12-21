
const input = [
"                                 H         E         A     R         Z   K                                       ",
"                                 U         U         S     N         V   S                                       ",
"  ###############################.#########.#########.#####.#########.###.#####################################  ",
"  #.......#.#.#.#.#.....#...#...#...#...#.....#.....#...#.......#...#.#...#.#.#...#.......#.#.....#.#.#.#.....#  ",
"  #######.#.#.#.#.#####.###.###.#.###.#.#.#.###.#.#####.###.#.###.#.#.###.#.#.#.###.#######.#.#####.#.#.#.###.#  ",
"  #.....#.......#.#.#.................#.#.#...#.#.....#...#.#...#.#.#...#.#.....#.#...#.......#.#.#...#...#...#  ",
"  #.###.###.###.#.#.#####.#.#.###.#.###.#.#######.###.#.#####.#.#.#.#.#.#.#.###.#.#.#####.#####.#.#.###.#####.#  ",
"  #.#.#.#.#.#.............#.#...#.#...#.#.#.#.......#.......#.#.#.#.#.#.#.#.#.#.................#.#.......#.#.#  ",
"  ###.#.#.#####.###.#.###.#############.#.#.#######.#.#.#######.#.#.#.###.#.#.#.#.#.###.#.#.#.###.#.#######.###  ",
"  #.............#.#.#.#...#...........#.#.#...#.....#.#.#.......#.#.#...#.....#.#.#.#.#.#.#.#.#.#.....#.#.....#  ",
"  #############.#.#####.###.#####.###.#.#.###.#####.#########.###.#.###.###.###.#####.#########.#.###.#.###.###  ",
"  #.#.#...#.#.....#.#...#.....#.#.#.#.#.#.#.#.#.#.....#...#...#...#.......#.#.......#.....#...#.#.#.#.#...#.#.#  ",
"  #.#.#.###.#######.###.#.#####.#.#.#.#.#.#.#.#.###.###.#####.###.#############.#.###.#####.###.#.#.###.###.#.#  ",
"  #.#...........#.......#.#...#.#.#.....#.#.....#.#...#.#.#.....#...........#.#.#.....#...#.#.....#...#.......#  ",
"  #.###.###.#.#.###.###.###.###.#.#.#####.###.###.#.###.#.#.#######.###.#.###.#.#.###.#.###.###.###.#####.###.#  ",
"  #.....#...#.#.#...#.....#.#.....#.#.....#.#.........#...#.#...#.#.#...#.#.....#.#.#.#...#...#.#...#.#.....#.#  ",
"  #.#######.#####.#########.#####.#####.#.#.###.#.#.###.#.#.#.###.#####.#.#.###.###.###.###.###.#.###.#.#####.#  ",
"  #.#...........#.#...#...#...#.......#.#...#...#.#.#...#.........#...#.#.#.#...........#...#.#.....#.#.#.#.#.#  ",
"  #########.#########.#.#####.###.#######.#######.###.###.#####.#####.#.###.###.#######.#.###.#.#####.#.#.#.#.#  ",
"  #...#...........#.#...#...#.....#.#.....#...#.....#.#.#.....#.#.......#.#.#.....#.#...#.....#.#...#.....#.#.#  ",
"  ###.#.#######.###.###.#.#.#.###.#.###.#.#.#####.#####.###.###########.#.#####.###.#####.#####.###.###.###.###  ",
"  #.#.#.......#.#.......#.#...#.#...#...#.....#.......#.#.........#.....#.........#...#...#...#.#...#.#.......#  ",
"  #.#.#.###.#######.###.#######.#.###.###.###.#####.#.#.#.#####.#######.#######.###.#.###.#.###.###.#.#.#######  ",
"  #.#...#.#...#.#.#.#.#.#.....#.#.#...#.#.#.#...#.#.#...#...#.#...#...#.#...#.#.....#.......#...#.......#.....#  ",
"  #.#.###.#####.#.###.#.#####.#.#.#####.#.#.###.#.#####.#.###.#######.#.###.#.#.###.###.#######.###.###.#.#####  ",
"  #...........#.#.........#.#.........#.....#.....#.....#.#.....#.......#.#...#.#.#...#.#...#.#.......#...#...#  ",
"  #####.#.#.###.###.#.#####.#.###.#######.#####.#.#.#####.#.#######.###.#.#.#.#.#.#######.###.###.###########.#  ",
"  #...#.#.#...#.#...#.#...#...#.........#.#.....#.#.....#...#.........#.#...#...........#.#.#.#.#.#.#...#.....#  ",
"  #.###.#######.#####.###.#######.###########.#######.###.###########.#####.#########.###.#.#.#.#.#.#.#######.#  ",
"  #.........#...#...#.......#    E           W       F   B           Q     F        #.......#.#.......#.#...#.#  ",
"  ###.#.#.#####.#.#####.#.#.#    U           V       O   I           K     A        #.#######.###.#####.###.#.#  ",
"ZA....#.#.#.#.#.#.#.#.#.#.#.#                                                       #...#.......#.#.#...#.....#  ",
"  #.#.#####.#.#.#.#.#.#####.#                                                       ###########.#.#.#.#####.###  ",
"  #.#...#.........#...#.#.#..XT                                                     #.#.....#.........#.#.....#  ",
"  #.#.#########.###.###.#.#.#                                                       #.###.#####.#####.#.#####.#  ",
"  #.#.#.....#.#...#.......#.#                                                       #...#...#.......#.....#...#  ",
"  #.#####.###.#.###.###.###.#                                                       #.###.#########.#####.#.#.#  ",
"  #.................#.......#                                                     KL..#.#...#.#...#...#...#.#..LM",
"  #.###.#.#####.#########.###                                                       #.#.###.#.#######.#.###.#.#  ",
"  #.#...#...#.#.#.#.....#.#..PD                                                     #.................#.....#.#  ",
"  #.###.#.###.###.###.#.###.#                                                       ###########################  ",
"  #...#.#.#.....#.#.#.#.....#                                                       #...........#.............#  ",
"  #########.#####.#.#.#####.#                                                       ###.#.###.#.#.###.#.#.###.#  ",
"DY....#.#.....#...#.......#.#                                                       #...#...#.#.....#.#.#.#.#.#  ",
"  #.#.#.#####.#.#.#.#####.#.#                                                       #######.###############.#.#  ",
"KC..#...........#.....#.#.#..KS                                                   KI....#...#.....#.#.#.#......FA",
"  #####################.###.#                                                       ###.#.#.###.###.#.#.#####.#  ",
"ZL....#.....#.......#.....#.#                                                       #.....#.#.#...#.....#...#.#  ",
"  #.#####.#.#.###.#.#.#####.#                                                       #########.###.#.#######.###  ",
"  #.#.....#.#.#.#.#.....#.#.#                                                       #.....#.#...........#.....#  ",
"  #.#.#####.#.#.#######.#.###                                                       ###.#.#.###.#######.#.###.#  ",
"  #...#.....#.......#.....#.#                                                     ZV....#...........#.....#...#  ",
"  #.###.#####.#######.#####.#                                                       #.#.###.###.#.###.#.#.#.###  ",
"  #...#.......#.#...#........QO                                                     #.#.#...#...#...#.#.#.#.#..ZU",
"  #####.#######.#.###########                                                       ###############.#######.#.#  ",
"  #...#.#.#.............#...#                                                       #.#...#.#.#.#.....#.#.....#  ",
"  ###.###.###.#.###.###.#.#.#                                                       #.#.###.#.#.#######.#####.#  ",
"  #...........#.#...#...#.#..ZL                                                     #.......#...........#...#.#  ",
"  #.###.#.#.#.#.#####.###.#.#                                                       #.#.#.#.#.#######.###.#.###  ",
"  #...#.#.#.#.#.#.......#.#.#                                                       #.#.#.#.....#.......#.#.#..QK",
"  #####.###.#.#########.#.###                                                       #.###.#.###.#.#####.#.#.#.#  ",
"KL........#.#.....#.......#.#                                                     KC....#.#.#.#.#.#.....#.#.#.#  ",
"  #####.#.###.#######.###.#.#                                                       ###.#.###.#########.#.#.#.#  ",
"AA..#...#.#...#.#.......#.#.#                                                       #...#...#.....#.......#...#  ",
"  #.#########.#.###########.#                                                       #########.###############.#  ",
"  #...#...#.....#.....#.#....ND                                                     #.....#...............#.#.#  ",
"  #.#####.###.#.#.#####.#.###                                                       #####.#.#.#####.#.###.#.###  ",
"BI..#.......#.#.#.#.#...#...#                                                       #.#.....#.#.#...#...#.....#  ",
"  #.#.###.#######.#.#.#.###.#                                                       #.#####.###.#####.###.#####  ",
"  #...#...............#.....#                                                     XX..#.#.#.#.#...#...#.....#..ND",
"  #########.#######.###.###.#                                                       #.#.#.#.#.#.###########.#.#  ",
"  #.#.....#.#.#.#.#.#.#...#.#                                                       #...........#.#.#.#...#...#  ",
"  #.#.###.###.#.#.###.#######                                                       #############.#.#.###.#####  ",
"KI..#.#...................#..RN                                                     #.................#.#......XX",
"  #.#.###.###.###.###.#####.#                                                       #.#.#.#.#.#.#.###.#.#.#.#.#  ",
"  #.....#...#.#...#.........#                                                       #.#.#.#.#.#.#.#.....#.#.#.#  ",
"  #######.#####.#.###.#######                                                       #.#########.#######.#####.#  ",
"QO..#.#...#.#.#.#.#.#.#...#..GN                                                   DY..........#...#.........#.#  ",
"  #.#.#.#.#.#.#####.#####.#.#                                                       #.###.#.#.#.#####.###.###.#  ",
"  #.#.#.#.#...#.....#.......#                                                       #.#...#.#.#...#...#.......#  ",
"  #.#.#####.#####.#.#####.#.#                                                       #.###.#.#######.###.#.#.###  ",
"  #.#...#.....#...#.....#.#.#                                                       #.#.#.#.#.#.#...#...#.#...#  ",
"  #.#.#.#.#.#.#.###.#.#.#.###                                                       #.#.#.###.#.#.###.#####.###  ",
"  #...#...#.#...#...#.#.....#                                                       #.#.#.....#...#...#.....#.#  ",
"  #.#.#.#.###.#.###.###.#.###      Z   L             H     A       Z       S   O    ###.#######.#.#.#####.#.#.#  ",
"  #.#.#.#.#...#...#.#...#.#.#      A   M             U     S       U       W   W    #.#.#.#.#...#.#.#.#...#...#  ",
"  #.###.#######.#######.#.#.#######.###.#############.#####.#######.#######.###.#####.#.#.#.#######.#.###.#.###  ",
"  #...#.....#.....#.....#...#.......#.#.....#...........#...#.......#.........#...............#...#.....#.#...#  ",
"  #.#.###.###.#.#####.#.#.#.###.#####.#.#######.###.#######.###.#####.#.#.#######.#.#.#.###.###.###########.###  ",
"  #.#.#.#...#.#...#.#.#.#.#.#.......#...#.#.#...#.......#.#...#...#.#.#.#...#.#...#.#.#.#...........#...#.....#  ",
"  #.###.#.###.#####.###.#######.#.#.###.#.#.###.#####.###.#.#####.#.#.#######.#.#.#############.#.###.#####.#.#  ",
"  #...#...#...#.......#...#.#.#.#.#...#...#...#...#.....#.....#...#...#.....#...#...........#.#.#...#.......#.#  ",
"  #.#.###.#######.#######.#.#.#.#.#######.#.#.###.#######.###.#.#####.###.###.#####.###.#.###.###.#.###.###.###  ",
"  #.#...#.......#.....#.#.#...#.#.#.#.#.#...#...#.#...#.#.#...#.#.#...#.....#...#.#...#.#.....#.#.#.#.#.#.....#  ",
"  #.#.###.###########.#.#####.###.#.#.#.#####.###.###.#.###.###.#.###.#.###.#.###.#.#####.#####.#.###.###.#.#.#  ",
"  #.#.#.....#.......................#...#.....#.....#.......#...#...#.#...#.#.#...#...#.#.....#.......#...#.#.#  ",
"  #######.#########.#.#.#######.#######.#.###.#.#.#######.#####.#.###.###.#.#.#.#######.###.#####.#.#.#########  ",
"  #.........#...#...#.#.#...#...#.........#...#.#.....#.......#.....#.....#.#.....#.#...#.#.#.#...#.#.#...#.#.#  ",
"  #.#####.#####.#.#.#######.#.#.#####.#.###.###.#########.###.#.#######.#.#.#.###.#.#.###.###.###.#.#.###.#.#.#  ",
"  #.#...........#.#.#...#.#...#.#.....#...#.#...#.#...#...#...#...#.....#.#.#.#...............#...#.#...#.....#  ",
"  #####.###.###.#.#.###.#.###.#.###.#.#.#####.#.###.#.#.###.###.#######.###.#.#.###.#####.###.#######.###.#####  ",
"  #.#.....#.#.#.#.#.#.#.......#...#.#.#...#...#.....#.#.#.....#.......#.#...#.#.#.......#...#.......#.........#  ",
"  #.#####.#.#.###.###.#.#######.#######.#####.#.#.###.###.###.###.###.#####.#.#########.#.#######.###.#.###.#.#  ",
"  #.......#.....#.#.#.#.#...#.#...#.#.#...#...#.#.#.....#.#...#.#...#.#.....#.........#.#.#.#...#...#.#...#.#.#  ",
"  #.#.#######.#####.#.#.###.#.#.#.#.#.###.###.#####.#.#####.###.#.###.#.#.###.#.#######.###.#.#########.#.###.#  ",
"  #.#...#.....#.....#...#.......#.#.........#.#.....#...#...#.......#.#.#.#.#.#.#.....#.#.....#.#...#.#.#...#.#  ",
"  #.#########.###.#.###.###.#.#.#######.#.#.#.#####.#.###.#.###.###.###.###.#.#.###.#####.###.#.#.###.###.###.#  ",
"  #...#.......#...#...#.#.#.#.#.#...#...#.#.#.#.....#.#...#...#.#.#.#.......#.#.#.#.......#.#.#.#.#.....#.#...#  ",
"  #####.#.###.#######.###.#####.###.###.###########.#######.###.#.###.#.###.#.###.#.#.###.#.###.#.###.#.###.###  ",
"  #.....#.#.#.#...#.............#.....#.#.#.#.........#.....#.......#.#.#...#.#.....#.#...............#...#...#  ",
"  ###.#.#.#.#.###.#######.###.#.#.###.#.#.#.#####.#####.#######.#########.#.#.###.#.#######.###.#.#.#.#####.#.#  ",
"  #...#.#...#.#...........#...#...#...#.....#.........#.......#.........#.#.#.....#.......#...#.#.#.#.....#.#.#  ",
"  #################################.#####.###########.#####.#.#####.#######.###.###############################  ",
"                                   P     F           X     Z O     S       G   W                                 ",
"                                   D     O           T     Z W     W       N   V                                 ",
]

/*
const input = [
"         A           ",
"         A           ",
"  #######.#########  ",
"  #######.........#  ",
"  #######.#######.#  ",
"  #######.#######.#  ",
"  #######.#######.#  ",
"  #####  B    ###.#  ",
"BC...##  C    ###.#  ",
"  ##.##       ###.#  ",
"  ##...DE  F  ###.#  ",
"  #####    G  ###.#  ",
"  #########.#####.#  ",
"DE..#######...###.#  ",
"  #.#########.###.#  ",
"FG..#########.....#  ",
"  ###########.#####  ",
"             Z       ",
"             Z       ",
]/*
const input = [
"                   A               ",
"                   A               ",
"  #################.#############  ",
"  #.#...#...................#.#.#  ",
"  #.#.#.###.###.###.#########.#.#  ",
"  #.#.#.......#...#.....#.#.#...#  ",
"  #.#########.###.#####.#.#.###.#  ",
"  #.............#.#.....#.......#  ",
"  ###.###########.###.#####.#.#.#  ",
"  #.....#        A   C    #.#.#.#  ",
"  #######        S   P    #####.#  ",
"  #.#...#                 #......VT",
"  #.#.#.#                 #.#####  ",
"  #...#.#               YN....#.#  ",
"  #.###.#                 #####.#  ",
"DI....#.#                 #.....#  ",
"  #####.#                 #.###.#  ",
"ZZ......#               QG....#..AS",
"  ###.###                 #######  ",
"JO..#.#.#                 #.....#  ",
"  #.#.#.#                 ###.#.#  ",
"  #...#..DI             BU....#..LF",
"  #####.#                 #.#####  ",
"YN......#               VT..#....QG",
"  #.###.#                 #.###.#  ",
"  #.#...#                 #.....#  ",
"  ###.###    J L     J    #.#.###  ",
"  #.....#    O F     P    #.#...#  ",
"  #.###.#####.#.#####.#####.###.#  ",
"  #...#.#.#...#.....#.....#.#...#  ",
"  #.#####.###.###.#.#.#########.#  ",
"  #...#.#.....#...#.#.#.#.....#.#  ",
"  #.###.#####.###.###.#.#.#######  ",
"  #.#.........#...#.............#  ",
"  #########.###.###.#############  ",
"           B   J   C               ",
"           U   P   P               ",
]
*/
const field = []
const portals = {}

for(let y = 0; y < input.length; y++) {
    for(let x = 0; x < input[y].length; x++) {
        field[x] = field[x] || []
        field[x][y] = input[y][x]
    }
}

const move = (pos, dir) => {
    if(dir === 0) return {x: pos.x, y: pos.y - 1}; 
    if(dir === 1) return {x: pos.x + 1, y: pos.y};
    if(dir === 2) return {x: pos.x, y: pos.y + 1};
    if(dir === 3) return {x: pos.x - 1, y: pos.y};
}

const read = (pos) => {
    return (field[pos.x] || [])[pos.y];
}

for(let x = 0; x < field.length; x++) {
    for(let y = 0; y < field[x].length; y++) {
        let pos = {x: x, y: y}
        if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(read(pos)) !== -1) {
            // Found portal, determine direction
            // Due to the order we should only check right or down
            const rightPos = move(pos, 1);
            const downPos = move(pos, 2);
            const leftPos = move(pos, 3);
            const upPos = move(pos, 0);
            if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(read(rightPos)) !== -1) {
                let name = read(pos) + read(rightPos)
                if(!(name in portals)) {
                    portals[name] = []
                }

                // Check the location of the connecting tile
                if(read(leftPos) === '.') {
                    portals[name].push({x: pos.x, y: pos.y})
                } else {
                    portals[name].push({x: rightPos.x, y: rightPos.y})
                }
            } else if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(read(downPos)) !== -1) {
                let name = read(pos) + read(downPos)
                if(!(name in portals)) {
                    portals[name] = []
                }

                // Check the location of the connecting tile
                if(read(upPos) === '.') {
                    portals[name].push({x: pos.x, y: pos.y})
                } else {
                    portals[name].push({x: downPos.x, y: downPos.y})
                }
            }
        }
    }
}

let start, exit

for(let portal of Object.keys(portals)) {
    if(portals[portal].length == 2) {
        console.log(`Portal ${portal} from ${portals[portal][0].x}x${portals[portal][0].y} to ${portals[portal][1].x}x${portals[portal][1].y}`);
        // Find proper exit
        for(let dir = 0; dir < 4; dir++) {
            const possibleExit = move(portals[portal][1], dir)
            if(read(possibleExit) === '.') {
                field[portals[portal][0].x][portals[portal][0].y] = possibleExit
            }
        }
        for(let dir = 0; dir < 4; dir++) {
            const possibleExit = move(portals[portal][0], dir)
            if(read(possibleExit) === '.') {
                field[portals[portal][1].x][portals[portal][1].y] = possibleExit
            }
        }
    } else if(portals[portal].length == 1) {
        console.log(`Exit ${portal} at ${portals[portal][0].x}x${portals[portal][0].y}`);
        if(portal === 'AA') start = portals[portal][0];
        if(portal === 'ZZ') exit = portals[portal][0];
    } else {
        console.log(`!!! malformed portal ${portal}`);
    }
}

// Part 1
// BFS

const drawPath = (hist) => {
    let line = ""
    for(let y = 0; y < field[0].length; y++) {
        for(let x = 0; x < field.length; x++) {
            if(hist.findIndex(h => h.x == x && h.y == y) !== -1) {
                line += "O"
            } else if(typeof(read({x:x, y:y})) === 'object') {
                line += "]"
            } else {
                line += read({x:x, y:y})
            }
        }
        line += "\n"
    }
    console.log(line)
}

const neighbours = (pos) => {
    const result = [];
    for(let dir = 0; dir < 4; dir++) {
        if(typeof(read(move(pos, dir))) === 'object') {
            result.push(read(move(pos, dir)))
        } else if(read(move(pos, dir)) === '.' || read(move(pos, dir)) === 'Z') {
            result.push(move(pos, dir));
        }
    }
    
    return result.map(r => ({x: r.x, y: r.y, hist: [{x: pos.x, y: pos.y}, ...pos.hist]}))
}

const visited = []
let open = [{x: start.x, y: start.y, hist: []}]
let steps = 0
outer:
while(open.length) {
    let newOpen = []
    
    for(let state of open) {
        if(state.x === exit.x && state.y === exit.y) {
            console.log("Found exit in", steps, "steps")
            console.log(state.hist)
            drawPath(state.hist)
            break outer;
        }
        
        // Find neighbours
        for(let neighbour of neighbours(state).filter(s => !(`${s.x},${s.y}` in visited))) {
            visited[`${neighbour.x},${neighbour.y}`] = true
            newOpen.push(neighbour)
        }
    }
    
    console.log(steps, open.length, newOpen.length)
    open = newOpen;
    steps++;
}

