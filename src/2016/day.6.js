import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.6.input.txt', 'utf-8')

// 2016
// Day 6: Signals and Noise
//  1. tkspfjcc
//  2. xrlmbypn

const parseInput = input => input.split(/\r?\n/g)

const recording = parseInput(input)

// Part One

const countChar = (acc, str) =>
  acc.map((o, i) => ({ ...o, [str[i]]: (o[str[i]] || 0) + 1 }))

const getCounts = recording => recording.reduce(countChar, Array(8).fill({}))

const countMaxes = counts =>
  counts
    .map(
      o => Object.entries(o).reduce((a, [k, v]) => (v > a[1] ? [k, v] : a)),
      [, 0]
    )
    .map(([k, v]) => k).join``

console.log(countMaxes(getCounts(recording)))

// Part Two

const countMins = counts =>
  counts
    .map(
      o => Object.entries(o).reduce((a, [k, v]) => (v < a[1] ? [k, v] : a)),
      [, Infinity]
    )
    .map(([k, v]) => k).join``

console.log(countMins(getCounts(recording)))
