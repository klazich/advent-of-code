import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.16.input.txt', 'utf-8').trim()

// 2017
// Day 16: Permutation Promenade
//  1. ebjpfdgmihonackl
//  2. abocefghijklmndp

const scan = input =>
  input.split(/,/g).map(str =>
    /([a-z])([a-z]|\d+)(?:\/([a-z]|\d+))?/
      .exec(str)
      .slice(1, 4)
      .filter(Boolean)
      .map(v => (/\d+/.test(v) ? +v : v))
  )

const INSTRUCTIONS = scan(INPUT)
const INIT = 'abcdefghijklmnop'.split('')

const spin = x => S => [...S.slice(-x), ...S.slice(0, -x)]
const exchange = a => b => S => {
  const arr = [...S]
  arr[a] = S[b]
  arr[b] = S[a]
  return arr
}
const partner = a => b => S => exchange(S.indexOf(a))(S.indexOf(b))(S)

const ops = ch => (ch === 's' ? spin : ch === 'x' ? exchange : partner)
const exec = ins => ins.reduce((f, x) => f(x), ops)
const run = instructions => init =>
  instructions.reduce((a, c) => exec(c)(a), init)

let result = run(INSTRUCTIONS)(INIT)

const genFn = function*(fn, init) {
  let result = init
  while (true) {
    result = fn(result)
    yield result
  }
}

const get = () => genFn(run(INSTRUCTIONS), INIT)

const detectRepeat = gen => at => {
  let i = 0
  let r
  do {
    r = gen.next().value.join('')
    i += 1
  } while (r !== at.join(''))
  return i
}

// const iter = get()
// console.log(iter.next().value.join(''))
// console.log(iter.next().value.join(''))
// console.log(iter.next().value.join(''))
// console.log(iter.next().value.join(''))
// console.log(iter.next().value.join(''))

const runFor = n => gen => {
  let r
  for (let i = 0; i < n; i += 1) r = gen.next().value
  return r.join('')
}

const mod = detectRepeat(get())(INIT)
console.log(runFor(1000000000 % mod)(get()))

console.log(1, runFor(1)(get()))
console.log(29, runFor(29)(get()))
console.log(30, runFor(30)(get()))
console.log(31, runFor(31)(get()))
