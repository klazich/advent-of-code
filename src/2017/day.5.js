import { readFileSync } from 'fs'

const input = readFileSync('./input/2017/day.5.input.txt', 'utf-8')

// 2017
// Day 5: A Maze of Twisty Trampolines, All Alike
//  1. 325922
//  2. 24490906

const scan = input => input.split(/\r?\n/g).map(v => +v)

const instructions = scan(input)

const run1 = function*(instructions) {
  let steps = 0
  let i = 0
  while (i >= 0 && i < instructions.length) {
    const cur = i
    i = i + instructions[i]
    instructions[cur] += 1
    steps += 1
    yield { steps, i }
  }

  return steps
}

// const iter1 = run1(instructions)

// for (let step of iter1) {
//   console.log(step)
// }

const run2 = function*(ins) {
  let steps = 0
  let i = 0
  while (i >= 0 && i < ins.length) {
    const cur = i
    i = i + ins[i]
    ins[cur] = ins[cur] > 2 ? ins[cur] - 1 : ins[cur] + 1
    steps += 1
    yield { steps, i }
  }

  return steps
}

const iter2 = run2(instructions)
let s
for (let step of iter2) {
  s = step
  if (step.steps % 1000 === 0) console.log(step)
}
console.log(s)
