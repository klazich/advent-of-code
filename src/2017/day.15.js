const INIT_A = 873
const INIT_B = 583

// 2017
// Day 15: Dueling Generators
//  1. 631
//  2. 279

const gen1 = function*(init, multiplier) {
  let x = init
  while (true) {
    x = (x * multiplier) % 2147483647
    yield x
  }
}

let A = gen1(INIT_A, 16807)
let B = gen1(INIT_B, 48271)

const bn = n => n.toString(2)
const low16bits = bin => bin.slice(-16)

const judge = n => (a, b) => {
  let score = 0
  for (let i = 0; i < n; i += 1) {
    const a16 = low16bits(bn(a.next().value))
    const b16 = low16bits(bn(b.next().value))
    if (a16 === b16) score += 1
    if (i % 1000000 === 0) console.log(i, score)
  }
  return score
}

// console.log(judge(40000000)(A, B))

// Part Two

const gen2 = function*(init, multiplier, criteria) {
  let x = init
  while (true) {
    x = (x * multiplier) % 2147483647
    if (x % criteria === 0) yield x
  }
}

let A = gen2(INIT_A, 16807, 4)
let B = gen2(INIT_B, 48271, 8)

console.log(judge(5000000)(A, B))
