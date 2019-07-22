import { readFileSync, appendFileSync } from 'fs'

const INPUT = readFileSync('./input/2018/day.19.input.txt', 'utf-8').trim()
const IP = 5

// 2018
// Day 19: Go With The Flow
//  1. 1228
//  2. 15285504

const scan = input =>
  input
    .split(/\r?\n/g)
    .map(s => s.split(' ').map(v => (/\d+/.test(v) ? +v : v)))

const INSTRUCTIONS = scan(INPUT)

const ops = ins =>
  ({
    addr: x => y => z => R => ({ ...R, [z]: R[x] + R[y] }),
    addi: x => y => z => R => ({ ...R, [z]: R[x] + y }),
    mulr: x => y => z => R => ({ ...R, [z]: R[x] * R[y] }),
    muli: x => y => z => R => ({ ...R, [z]: R[x] * y }),
    banr: x => y => z => R => ({ ...R, [z]: R[x] & R[y] }),
    bani: x => y => z => R => ({ ...R, [z]: R[x] & y }),
    borr: x => y => z => R => ({ ...R, [z]: R[x] | R[y] }),
    bori: x => y => z => R => ({ ...R, [z]: R[x] | y }),
    setr: x => y => z => R => ({ ...R, [z]: R[x] }),
    seti: x => y => z => R => ({ ...R, [z]: x }),
    gtir: x => y => z => R => ({ ...R, [z]: x > R[y] ? 1 : 0 }),
    gtri: x => y => z => R => ({ ...R, [z]: R[x] > y ? 1 : 0 }),
    gtrr: x => y => z => R => ({ ...R, [z]: R[x] > R[y] ? 1 : 0 }),
    eqir: x => y => z => R => ({ ...R, [z]: x === R[y] ? 1 : 0 }),
    eqri: x => y => z => R => ({ ...R, [z]: R[x] === y ? 1 : 0 }),
    eqrr: x => y => z => R => ({ ...R, [z]: R[x] === R[y] ? 1 : 0 }),
  }[ins])

const next = R => ({ ...R, [IP]: R[IP] + 1 })

const exec = R => INSTRUCTIONS[R[IP]].reduce((f, token) => f(token), ops)(R)

const pipe = (...fns) => init => fns.reduce((x, f) => f(x), init)

const step = pipe(
  exec,
  next
)

const arr = () => Array.from({ length: 36 }, () => '--')

const run = (init = { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }) => {
  let state = init
  let i = 0
  while (state[IP] >= 0 && state[IP] < INSTRUCTIONS.length) {
    state = step(state)
    const a = arr()
    a[state[IP]] = `${state[IP]}`.padStart(2, '0')

    let msg =
      [
        a.join(''),
        INSTRUCTIONS[state[IP]].join(' '),
        `${state[0]}`.padStart(10, ' '),
        `${state[1]}`.padStart(10, ' '),
        `${state[2]}`.padStart(10, ' '),
        `${state[3]}`.padStart(10, ' '),
        `${state[4]}`.padStart(10, ' '),
        `${state[5]}`.padStart(10, ' '),
      ].join(' ') + '\r\n'

    // appendFileSync('./src/2018/day.19.output.txt', msg)

    i += 1
  }
  return state
}

// console.log(run())

const TRG = 10551267
let sum = 0
for (let i = 0; i <= TRG; i += 1) {
  for (let j = 0; j <= TRG; j += 1) {
    if (i * j === TRG) {
      console.log(i, j)
      sum += i
    }
    if (i * j > TRG) break
  }
}
console.log(sum)
