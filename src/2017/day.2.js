import { readFileSync } from 'fs'

const input = readFileSync('./input/2017/day.2.input.txt', 'utf-8')

// 2017
// Day 2: Corruption Checksum
//  1. 42378
//  2. 246

const scanInput = input =>
  input.split(/\r?\n/g).map(str => str.split(/\s+/g).map(v => +v))

const min = a => Math.min(...a)
const max = a => Math.max(...a)

const maxSubMin = row => max(row) - min(row)

const sum = (a, b) => a + b

const checksum = sheet => sheet.map(maxSubMin).reduce(sum)

console.log(checksum(scanInput(input)))

// Part Two

const isDevisable = (a, b) => a % b === 0

const findDevisable = row =>
  row.reduce((a, x, i) => {
    for (let j in row) {
      if (i === +j) continue
      const y = row[j]
      if (isDevisable(x, y)) return x / y
    }
    return a
  }, null)

const devisable = sheet => sheet.map(findDevisable).reduce(sum)

console.log(devisable(scanInput(input)))
