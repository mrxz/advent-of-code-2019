let input = "59776034095811644545367793179989602140948714406234694972894485066523525742503986771912019032922788494900655855458086979764617375580802558963587025784918882219610831940992399201782385674223284411499237619800193879768668210162176394607502218602633153772062973149533650562554942574593878073238232563649673858167635378695190356159796342204759393156294658366279922734213385144895116649768185966866202413314939692174223210484933678866478944104978890019728562001417746656699281992028356004888860103805472866615243544781377748654471750560830099048747570925902575765054898899512303917159138097375338444610809891667094051108359134017128028174230720398965960712".split("").map(x => +x)
//const input = "12345678".split("").map(x => +x)
const phases = 100
const basePattern = [0, 1, 0, -1]

// Part 1
let current = input
for(let phase = 0; phase < phases; phase++) {
    let sum = [];
    for(let i = 0; i < input.length; i++) {
        let result = 0;
        for(let j = i; j < input.length; j++) {
            result += current[j] * basePattern[~~((j + 1) / (i + 1)) % 4]
        }
        const digit = Math.abs(result % 10)
        sum.push(digit)
    }
    
    current = sum
    if(phase >= phases - 1) {
        console.log(sum.join(""))
    }
}

// Part 2
input = input.join("").repeat(10000).split("").map(x => +x)
const offset = +input.slice(0, 7).join("")

let row = []
let sum = []
let i = -1
for(i = input.length - 1; i >= input.length/2; i--) {
    let result = 0;
    for(let j = 0; j < phases; j++) {
        row[j] = (row[j] || 0) + (row[j - 1] || input[i]) % 10
    }
    sum[i] = row[phases - 1] % 10;
}
for(; i >= 0; i--) {
    sum[i] = 0
}
console.log(offset, offset > sum.length)
console.log(sum[offset])
console.log(sum.slice(offset, offset + 8).join(""))

