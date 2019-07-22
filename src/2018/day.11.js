const INPUT = 3214

// 2018
// Day 11: Chronal Charge
//  1. 21,42
//  2. 230,212,13

const id = co => co[0] + 10
const s2 = co => id(co) * co[1]
const s3 = co => s2(co) + INPUT
const s4 = co => s3(co) * id(co)
const s5 = co => (s4(co) < 100 ? 0 : Math.floor((s4(co) % 1000) / 100))
const s6 = co => s5(co) - 5

const base = ([x, y]) => ((x + 10) * y + INPUT) * (x + 10)
const power = co =>
  (base(co) < 100 ? 0 : Math.floor((base(co) % 1000) / 100)) - 5

const S = ([x, y]) => `${x},${y}`
const C = str => str.split(',').map(v => +v)

const MAP = {}
for (let x = 1; x <= 300; x += 1) {
  for (let y = 1; y <= 300; y += 1) {
    MAP[S([x, y])] = power([x, y])
  }
}

const GRID = Array.from({ length: 300 }, (_, y) =>
  Array.from({ length: 300 }, (_, x) => power([x + 1, y + 1]))
)

const val = map => co => map[S(co)]

const by3at = ([x, y]) => [
  [x, y],
  [x + 1, y],
  [x + 2, y],
  [x, y + 1],
  [x + 1, y + 1],
  [x + 2, y + 1],
  [x, y + 2],
  [x + 1, y + 2],
  [x + 2, y + 2],
]

const get = val(MAP)

// let max1 = [-Infinity]
// for (let x = 1; x <= 298; x += 1)
//   for (let y = 1; y <= 298; y += 1) {
//     const coordsPow = by3at([x, y]).reduce((a, c) => a + get(c), 0)
//     if (coordsPow > max1[0]) max1 = [coordsPow, [x, y]]
//   }

// console.log(max1)

const byNat = n => ([x, y]) => {
  let coords = []
  for (let j = x; j < x + n; j += 1)
    for (let i = y; i < y + n; i += 1) coords.push([j, i])
  return coords
}

let max = [-Infinity]
for (let s = 2; s <= 300; s += 1) {
  for (let x = 1; x <= 300 - (s - 1); x += 1) {
    for (let y = 1; y <= 300 - (s - 1); y += 1) {
      const coords = byNat(s)([x, y])
      const values = coords.map(get)
      const sum = values.reduce((a, c) => a + c, 0)
      if (sum > max[0]) {
        max = [sum, [s, x, y]]
        console.log(max, s, x, y)
        console.log(coords)
      }
    }
  }
}

console.log(max)
