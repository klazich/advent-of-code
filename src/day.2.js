import { readFileSync } from 'fs'

const input = readFileSync('./input/day.2.input.txt', 'utf-8').split(/\r?\n/)

// PART 1

const checksum = input =>
  input
    .map(id => id.split(''))
    .map(arr => arr.reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {}))
    .map(o => Array.from(new Set(Object.values(o))))
    .map(arr => arr.filter(e => [2, 3].includes(e)))
    .reduce(
      (a, c) => [
        c.includes(2) ? a[0] + 1 : a[0],
        c.includes(3) ? a[1] + 1 : a[1],
      ],
      [0, 0]
    )
    .reduce((a, c) => a * c, 1)

const answer1 = checksum(input) // 248 * 22 = 5456

console.log(answer1)

// PART 2

const commons = input =>
  input
    .map(ID =>
      input
        .map((id, j) => id.split('').map((d, k) => (d === ID[k] ? 0 : 1)))
        // .map(arr => arr.reduce((a, c) => a + c, 0))
        .filter(arr => arr.reduce((a, c) => a + c, 0) === 1)
    )
    .reduce((a, c, i) => (c.length > 0 ? [...a, [i, c[0].indexOf(1)]] : a), [])
// .reduce(
//   (a, c, i) =>
//     c.length > 0 ? input[i].replace(input[i][c[0].indexOf(1)], '') : a,
//   null
// )

const [[id, pos]] = commons(input)
const code = input[id]
const diff = code[pos]

const answer2 = code.replace(diff, '')

console.log(answer2)
