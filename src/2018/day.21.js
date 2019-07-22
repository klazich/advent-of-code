import { readFileSync, appendFileSync } from 'fs'

const INPUT = readFileSync('./input/2018/day.21.input.txt', 'utf-8')
const IP = 2

// 2018
// Day 21: Chronal Conversion
//  1.
//  2.

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
        INSTRUCTIONS[state[IP]].map(v => `${v}`.padStart(8, ' ')).join(' '),
        `${state[0]}`.padStart(7, ' '),
        `${state[1]}`.padStart(7, ' '),
        `${state[2]}`.padStart(7, ' '),
        `${state[3]}`.padStart(7, ' '),
        `${state[4]}`.padStart(7, ' '),
        `${state[5]}`.padStart(7, ' '),
      ].join(' ') + '\r\n'

    appendFileSync('./src/2018/day.21.output.txt', msg)

    i += 1
  }
  return state
}

run()
