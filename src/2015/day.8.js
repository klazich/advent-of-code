import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.8.input.txt', 'utf-8')

// 2015
// Day 8: Matchsticks
//  1. 1371
//  2. 2117

const scanInput = input => input.split(/\r?\n/g)

// Part One

const cleanQuotes = str => str.slice(1, -1)
const subEscapes = str => str.replace(/\\x\w\w|\\\\|\\"/g, '*')

const cLen = str => str.length
const mLen = str => subEscapes(cleanQuotes(str)).length

const result1 = scanInput(input)
  .reduce(([c, m], str) => [c + cLen(str), m + mLen(str)], [0, 0])
  .reduce((p, c) => p - c)

// Part Two

const eLen = str => str.length + str.match(/\\|"/g).length + 2

const result2 = scanInput(input)
  .reduce(([e, c], str) => [e + eLen(str), c + cLen(str)], [0, 0])
  .reduce((p, c) => p - c)

console.log(result2)
