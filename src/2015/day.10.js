import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.10.input.txt', 'utf-8')

// 2015
// Day 10: Elves Look, Elves Say
//  1. 252594
//  2. 3579328

const RE = /((\d)\2+)|(\d)/g
const units = str => str.match(RE)
const parse = units => units.map(s => `${s.length}${s[0]}`).join('')
const pipe = (...fn) => x => fn.reduce((a, f) => f(a), x)
const nTimes = fn => n => pipe(...Array.from({ length: n }, () => fn))

// Part One

const exec = pipe(
  units,
  parse
)

const exec40 = nTimes(exec)(40)
const result1 = exec40(input)

// Part Two

const exec50 = nTimes(exec)(50)
const result2 = exec50(input)
