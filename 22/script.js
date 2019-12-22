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
const deckSize = 10007
let deck = [...new Array(deckSize)].map((x, i) => i)

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
console.log(deck.findIndex(c => c === 2019))

// Part 2
// Follow the desired card
{
    const deckSize = 100
    const iterations = 101741582076661
    let card = 9
    let checking = true
    let span = -1
    let show = -1
    const seen = {}
    for(let i = 0; i < iterations; i++) {
        for(let command of input.reverse()) {
            const parts = command.split(" ")
            if(parts[0] === "cut") {
                const n = +parts[1]
                card = ((card - n) + deckSize) % deckSize
            } else if(parts[2] === "increment") {
                const m = +parts[3]
                card = ~~(card / m) + (~~(deckSize/m) * (card % m))
            } else {
                card = (deckSize - 1) - card
            }
        }
        console.log(card)
        if(checking && card in seen) {
            span = i - seen[card]
            console.log('Seen', card, 'before on iter', seen[card], 'now at', i, '(span', span, ')')
            i = iterations - ((iterations - i) % span)
            show = i
            checking = false
            //break;
        }
        if(i === show) {
            console.log('show', i, card)
            show += span
        }
        seen[card] = i
    }
    console.log(card)
}
