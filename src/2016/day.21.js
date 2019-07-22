import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2016/day.21.input.txt', 'utf-8')
const PSW = 'abcdefgh'

// 2016
// Scrambled Letters and Hash
//  1. agcebfdh
//  2.

const scan = input => input.split(/\r?\n/g)

const tokenize = lines =>
  lines.map(ln => {
    let ins = ln.match(/\w+/g).slice(0, 2)
    if (ins[0] === 'move' || ins[0] === 'reverse') ins = ins.slice(0, 1)
    const val = ln
      .match(/\b[\d|\w]\b/g)
      .map(v => (Number.isInteger(+v) ? +v : v))

    return [...ins, ...val]
  })

const position = x => y => S => {
  const s = S
  ;[s[x], s[y]] = [s[y], s[x]]
  return s
}
const letter = x => y => S => position(S.indexOf(x))(S.indexOf(y))(S)
const swap = type => (type === 'position' ? position : letter)

const right = n => S => [...S.slice(-n), ...S.slice(0, -n)]
const left = n => S => [...S.slice(n), ...S.slice(0, n)]
const based = v => S => {
  const id = S.indexOf(v)
  const offset = (id >= 4 ? id + 2 : id + 1) % S.length
  return right(offset)(S)
}

const rotate = type =>
  type === 'based' ? based : type === 'right' ? right : left

const reverse = x => y => S => [
  ...S.slice(0, x),
  ...S.slice(x, y + 1).reverse(),
  ...S.slice(y + 1),
]

const move = x => y => S => {
  const a = [...S.slice(0, x), ...S.slice(x + 1)]
  return [...a.slice(0, y), S[x], ...a.slice(y)]
}

const ops = op => ({ swap, rotate, reverse, move }[op])

const exec = ins => ins.reduce((f, x) => f(x), ops)

const instructions = tokenize(scan(INPUT))
console.log(
  instructions.reduce((state, ins) => exec(ins)(state), PSW.split('')).join('')
)

// Part Two
