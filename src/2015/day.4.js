import { readFileSync } from 'fs'
import md5 from 'md5'

const input = readFileSync('./input/2015/day.4.input.txt', 'utf-8')

// 2015
// Day 4: The Ideal Stocking Stuffer
//  1. 282749
//  2. 9962624

// Part One

const run1 = term => input => {
  let i = 0
  while (!md5(`${input}${i}`).startsWith(term)) i += 1
  return i
}

const result1 = run1('00000')(input)
console.log(result1)

// Part Two

const result2 = run1('000000')(input)
console.log(result2)
