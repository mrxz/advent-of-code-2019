let input = [
"deal into new stack",
"deal with increment 21",
"cut -1639",
"deal with increment 32",
"cut -873",
"deal with increment 8",
"deal into new stack",
"cut -7730",
"deal with increment 8",
"cut -8408",
"deal with increment 42",
"cut -4951",
"deal into new stack",
"deal with increment 24",
"cut -6185",
"deal with increment 69",
"cut -930",
"deal into new stack",
"cut 8675",
"deal with increment 47",
"cut -4543",
"deal with increment 62",
"deal into new stack",
"deal with increment 23",
"cut 7128",
"deal with increment 29",
"deal into new stack",
"deal with increment 65",
"cut 8232",
"deal with increment 34",
"deal into new stack",
"deal with increment 7",
"deal into new stack",
"cut -5590",
"deal with increment 34",
"cut -3523",
"deal with increment 24",
"cut 8446",
"deal with increment 42",
"cut 6714",
"deal into new stack",
"deal with increment 60",
"cut 1977",
"deal with increment 51",
"cut 2719",
"deal with increment 45",
"cut 9563",
"deal with increment 33",
"cut 9036",
"deal with increment 70",
"cut 3372",
"deal with increment 60",
"cut 9686",
"deal with increment 7",
"cut 9344",
"deal with increment 13",
"cut 797",
"deal with increment 12",
"cut -6989",
"deal with increment 43",
"deal into new stack",
"cut 1031",
"deal with increment 14",
"cut -1145",
"deal with increment 26",
"cut -9008",
"deal with increment 14",
"cut 432",
"deal with increment 46",
"cut -65",
"deal with increment 50",
"cut -704",
"deal with increment 4",
"cut 7372",
"deal with increment 66",
"cut 690",
"deal with increment 60",
"cut -7137",
"deal with increment 66",
"cut 9776",
"deal with increment 30",
"cut 3532",
"deal with increment 62",
"cut 4768",
"deal with increment 13",
"deal into new stack",
"cut -9014",
"deal with increment 68",
"cut -9601",
"deal with increment 6",
"cut -7535",
"deal with increment 74",
"cut 9479",
"deal with increment 6",
"cut -1879",
"deal with increment 33",
"cut 3675",
"deal with increment 19",
"cut -937",
"deal with increment 42",
]
/*
input = [
"deal into new stack",
"cut -2",
"deal with increment 7",
"cut 8",
"cut -4",
"deal with increment 7",
"cut 3",
"deal with increment 9",
"deal with increment 3",
"cut -1",
]

input = [
"deal with increment 7",
"deal into new stack",
"deal into new stack"
]

input = [
"cut 6",
"deal with increment 7",
"deal into new stack",
]

input = [
"deal with increment 7",
"deal with increment 9",
"cut -2"
]
/*
input = [
"deal into new stack",
"cut -2",
"deal with increment 7",
"cut 8",
"cut -4",
"deal with increment 7",
"cut 3",
"deal with increment 9",
"deal with increment 3",
"cut -1",
]*/

// Part 1
const deckSize = 119315717514047
//let deck = [...new Array(deckSize)].map((x, i) => i)

// Deal a new deck
const dealIntoNewStack = (deck) => deck.reverse()
//deck = deck.reverse()

const cut = (deck, n) => {
    const result = [...deck]
    if(n > 0) {
        let part = result.splice(0, n)
        result.splice(result.length, 0, ...part)
    } else {
        let part = result.splice(result.length + n, -n)
        result.splice(0, 0, ...part)
    }
    return result
}
//deck = cut(deck, -4);

const dealWithIncrement = (deck, n) => {
    const result = [...deck]
    let i = 0;
    let j = 0;
    while(i < deck.length) {
        result[j] = deck[i]

        j = (j + n) % deck.length;
        i++;
    }
    return result;
}

// convert input
const iterations = 101741582076661
const checkCard = 2020
/*
for(let i = 0; i < iterations; i++) {
    for(let command of input) {
        const parts = command.split(" ")
        if(parts[0] === "cut") {
            deck = cut(deck, +parts[1])
        } else if(parts[2] === "increment") {
            deck = dealWithIncrement(deck, +parts[3])
        } else {
            deck = deck.reverse()
        }
        //console.log(deck, command)
    }
}
console.log(deck[checkCard])
*/

// Part 2

const xgcd = (a, b) => {
    let prevx = 1; let x = 0;
    let prevy = 0; let y = 1;
    
    while(b) {
        let q = Math.floor(a / b)
        let r = a % b;
        [x, prevx] = [prevx - q*x, x];
        [y, prevy] = [prevy - q*y, y];
        [a, b] = [b, r];
    }
    return prevx
}
const inv = (x) => (xgcd(x, deckSize) + deckSize) % deckSize
console.log(xgcd(21, deckSize))
console.log(inv(21))

const back = (card, m) => Number((BigInt(card) * BigInt((xgcd(m, deckSize) + deckSize) % deckSize)) % BigInt(deckSize))
/*
const series = [
    [1, [0,1,2,3,4,5,6,7,8,9]],
    [3, [0,3,6,9,2,5,8,1,4,7]],
    [7, [0,7,4,1,8,5,2,9,6,3]],
    [9, [0,9,8,7,6,5,4,3,2,1]],
]
for(let serie of series) {
    const result = []
    for(let i = 0; i < serie[1].length; i++) {
        result.push(back(serie[1][i], serie[0]))
    }
    console.log(serie[0], result);
}*/

// Copied helper
function expmod( base, exp, mod ){
  if (exp == 0n) return 1n;
  if (exp % 2n == 0n){
    return (expmod( base, (exp / 2n), mod) ** 2n) % mod;
  }
  else {
    return (base * expmod( base, (exp - 1n), mod)) % mod;
  }
}


// Build matrix
const reverseInput = [...input].reverse()
let coefficients = [1, 0]
for(let command of reverseInput) {
    const parts = command.split(" ")
    if(parts[0] === "cut") {
        const n = +parts[1]
        coefficients[1] = (coefficients[1] + n) % deckSize
    } else if(parts[2] === "increment") {
        const m = +parts[3]
        coefficients[0] = Number((BigInt(coefficients[0]) * BigInt(inv(m))) % BigInt(deckSize))
        coefficients[1] = Number((BigInt(coefficients[1]) * BigInt(inv(m))) % BigInt(deckSize))
    } else {
        coefficients[0] = (coefficients[0] * -1) + deckSize
        coefficients[1] = (coefficients[1] * -1) + deckSize - 1
    }
}
console.log(coefficients)
console.log("Compute", coefficients[0], iterations, deckSize)
const raised = expmod(BigInt(coefficients[0]), BigInt(iterations), BigInt(deckSize))
const result = (raised * BigInt(checkCard) + BigInt(coefficients[1]) * (raised - 1n) * BigInt(inv(coefficients[0] - 1))) % BigInt(deckSize)
console.log(raised, result)

console.log("Reasoning backwards...")
// Follow the desired card
{
    let card = checkCard
    let checking = true
    let span = -1
    let show = -1
    const seen = {}
    for(let i = 0; i < iterations; i++) {
        for(let command of reverseInput) {
            const parts = command.split(" ")
            if(parts[0] === "cut") {
                const n = +parts[1]
                card = (card + n + deckSize) % deckSize
            } else if(parts[2] === "increment") {
                const m = +parts[3]
                card = back(card, m)
            } else {
                card = (deckSize - 1) - card
            }
            //console.log(card, command)
        }
        if(checking && card in seen) {
            span = i - seen[card]
            console.log('Seen', card, 'before on iter', seen[card], 'now at', i, '(span', span, ')')
            i = iterations - ((iterations - i) % span)
            show = i + span
            checking = false
            //break;
        }
        if(i === show || card === 3920265924568) {
            console.log('show', i % span, card)
            show += span
        }
        seen[card] = i
    }
    console.log(card)
}
