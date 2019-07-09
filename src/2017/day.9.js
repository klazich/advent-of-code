import { readFileSync } from 'fs'

const input = readFileSync('./input/2017/day.9.input.txt', 'utf-8').trim()

// 2017
// Day 9: Stream Processing
//  1. 9251
//  2. 4322

const pipe = (...fns) => init => fns.reduce((x, f) => f(x), init)

const cleanIgnorable = input => input.replace(/!./g, '')
const cleanGarbage = input => input.replace(/<.*?>/g, '')
const cleanCommas = input =>
  input.replace(/(?<={),/g, '').replace(/,(?=})/g, '')
const initScoring = input => input.replace(/\{\}/g, '1')

const clean = pipe(
  cleanIgnorable,
  cleanGarbage,
  cleanCommas
)

let cleaned = clean(input)

const scan = function*(input) {
  let stack = []
  for (let i in input.split('')) {
    const ch = input[i]

    if (ch === '}') stack.pop()
    yield {
      value: ch,
      depth: stack.length,
      pos: +i,
    }
    if (ch === '{') stack.push(ch)
  }
}

const tokens = [...scan(cleaned.replace(/,/g, ''))]
const maxDepth = tokens.reduce((a, { depth }) => (depth > a ? depth : a), 0)

let sum = 0
for (let i = 1; i <= maxDepth; i += 1) {
  const count = tokens.filter(({ depth }) => depth === i).length / 2
  sum += count * i
}

console.log(sum)

let garbage = false,
  score = 0,
  depth = 1,
  garbageCount = 0
for (let i = 0, ch = input[0]; i < input.length; i++, ch = input[i]) {
  if (ch == '!') i++
  else if (garbage && ch != '>') garbageCount++
  else if (ch == '<') garbage = true
  else if (ch == '>') garbage = false
  else if (ch == '{') score += depth++
  else if (ch == '}') depth--
}
console.log(score, garbageCount)
