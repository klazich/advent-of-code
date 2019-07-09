import { readFileSync } from 'fs'
import Combinatorics from 'js-combinatorics'

const input = readFileSync('./input/2015/day.17.input.txt', 'utf-8')

// 2015
// Day 17: No Such Thing as Too Much
//  1. 4372
//  2. 4

const parseInput = input => input.split(/\r?\n/g).map(v => +v)
const set = Combinatorics.power(parseInput(input))

const memoize = fn => {
  let cache = {}
  return (...args) => {
    const key = args.sort((a, b) => a - b).join(',')
    if (cache[key]) return cache[key]
    const result = fn(...args)
    cache[key] = result
    return result
  }
}

const sum = (x, ...args) => (args.length > 0 ? x + sum(...args) : x)
const mSum = memoize(sum)

// const count1 = set.map(arr => sum(...arr)).filter(v => v === 150)
// console.log(count1)

// Part Two

const con150 = set.filter(a => sum(...a) === 150)
const minCount = con150.reduce(
  (a, c) => (c.length < a ? c.length : a),
  Infinity
)
const conMin = con150.filter(a => a.length === minCount)
console.log(conMin)
