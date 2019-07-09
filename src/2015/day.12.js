import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.12.input.txt', 'utf-8')

// 2015
// Day 12: JSAbacusFramework.io
//  1. 119433
//  2. 68466

const RED = 'red'
const obj = JSON.parse(input)

// Part One

const numbers = input => input.match(/-?\d+/g).map(n => +n)

const sum1 = numbers(input).reduce((a, c) => a + c, 0)
console.log(sum1)

// Part Two

const type = x => (Array.isArray(x) ? 'array' : typeof x)

const clean = x => {
  const arr =
    type(x) === 'object'
      ? Object.values(x).includes('red')
        ? []
        : Object.values(x).flatMap(clean)
      : x

  if (type(arr) === 'array') return arr.flatMap(clean)
  if (type(arr) === 'string') return []
  return arr
}

const sum2 = clean(obj).reduce((a, c) => a + c, 0)
console.log(sum2)
