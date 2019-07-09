import { readFileSync } from 'fs'

const input = readFileSync('./input/2017/day.6.input.txt', 'utf-8')

// 2017
// Day 6: Memory Reallocation
//  1. 6681
//  2. 2392

const scan = input => input.split(/\s+/g).map(v => +v)

const max = banks => ({
  n: Math.max(...banks),
  j: banks.indexOf(Math.max(...banks)),
})

const reallocate = function*(banks) {
  let cycles = 0
  while (true) {
    cycles += 1

    let { n, j } = max(banks)

    banks[j] = 0
    let i = j + 1 >= banks.length ? 0 : j + 1

    while (n > 0) {
      banks[i] += 1
      n -= 1
      i = i + 1 >= banks.length ? 0 : i + 1
    }
    yield { banks, cycles }
  }
}

const display = banks =>
  banks
    .map(v => Array.from({ length: 4 }, (_, i) => `${v}`[i] || ' ').join(''))
    .join(' ')

const seen = new Set()
let c, b
for (let { banks, cycles } of reallocate(scan(input))) {
  c = cycles
  b = banks.join(' ')

  if (b === '0 14 13 12 11 10 8 8 6 6 5 3 3 2 1 10') console.log(c)

  if (seen.has(banks.join(' '))) break
  seen.add(banks.join(' '))
}
console.log(c, b)
