import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.3.input.txt', 'utf-8')

// 2016
// Day 3: Squares With Three Sides
//  1. 993
//  2. 1849

// Part One

const parseByRow = input =>
  input.split(/\r?\n/g).map(str =>
    str
      .trim()
      .split(/\s+/g)
      .map(v => +v)
  )

const check = ([a, b, c]) => a + b > c && a + c > b && b + c > a

console.log(parseByRow(input).filter(check).length)

// Part Two

const parseByCol = input =>
  parseByRow(input)
    .reduce(([a, b, c], [x, y, z]) => [[...a, x], [...b, y], [...c, z]], [
      [],
      [],
      [],
    ])
    .flat()
    .reduce(
      ({ stack = [], a }, c) =>
        stack.length < 2
          ? { stack: [...stack, c], a }
          : { a: [...a, [...stack, c]] },
      { a: [] }
    ).a

console.log(parseByCol(input).filter(check).length)
