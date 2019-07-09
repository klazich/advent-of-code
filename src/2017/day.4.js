import { readFileSync } from 'fs'

const input = readFileSync('./input/2017/day.4.input.txt', 'utf-8')

// 2017
// Day 4: High-Entropy Passphrases
//  1. 325
//  2. 119

const scanInput = input => input.split(/\r?\n/g)

console.log(scanInput(input).length)
console.log(scanInput(input).filter(pw => !/\b(\w+)\b.+\b\1\b/.test(pw)).length)

const tokenize = str =>
  str
    .split(/\s+/g)
    .map(t => [...new Set(t)].sort().join(''))
    .join(' ')
const tokens = scanInput(input).map(tokenize)

console.log(tokens.filter(pw => !/\b(\w+)\b.+\b\1\b/.test(pw)).length)
