import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.9.input.txt', 'utf-8')

// 2016
// Day 9: Explosives in Cyberspace
//  1. 98135
//  2.

// Part One

const scanner1 = function*(input) {
  let i = 0

  while (i < input.length) {
    let count = 0
    let repeat = 0

    if (input[i] === '(') {
      i += 1

      let N = ''
      while (input[i] !== 'x') {
        N += input[i]
        i += 1
      }
      count = +N

      i += 1

      let R = ''
      while (input[i] !== ')') {
        R += input[i]
        i += 1
      }
      repeat = +R

      i += 1
    }

    let msg = ''
    while (count > 0) {
      msg += input[i]
      i += 1
      count -= 1
    }

    while (repeat > 0) {
      yield msg
      repeat -= 1
    }
  }
}

// const scan1 = scanner1(input)

// let decompressed = ''

// for (let token of scan1) {
//   console.log(token)
//   decompressed += token
// }

// console.log(decompressed.length)

// Part Two

const iterate = function*(iterable) {
  for (let i of iterable) yield i
}

const scanner = function*(input) {
  const chars = iterate(input)

  for (let ch of chars) {
    if (ch === '(') {
      let a = ''
      let b = ''
      while ((ch = chars.next().value) !== 'x') a += ch
      while ((ch = chars.next().value) !== ')') b += ch
      yield {
        type: 'MARKER',
        n: +a,
        r: +b,
        length: a.length + b.length + 3,
        raw: `(${a}x${b})`,
      }
      continue
    }
    yield {
      type: 'CHAR',
      length: 1,
      raw: ch,
    }
  }
}

const counting = tokens => {
  let multipliers = []

  let count = 0
  for (let token of tokens) {
    let i = token.length

    multipliers = multipliers
      .map(({ m, c }) => ({ m, c: c - i }))
      .filter(({ c }) => c > 0)
    let multi = multipliers.reduce((a, { m }) => a * m, 1)

    if (token.type === 'MARKER') {
      multipliers = [...multipliers, { m: token.r, c: token.n }]
      continue
    }

    count += multi
    console.log(multipliers)
  }

  return count
}

const tokens = scanner(input)

const count = counting(tokens)
