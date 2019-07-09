import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.16.input.txt', 'utf-8')

// 2015
// Day 16: Aunt Sue
//  1. 373
//  2. 260

const SUE = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

const RE = /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/
const parseInput = input =>
  input
    .split(/\r+\n/g)
    .map(str => RE.exec(str).slice(1, 8))
    .map(([S, A, a, B, b, C, c]) => ({ number: +S, [A]: +a, [B]: +b, [C]: +c }))

const sues = parseInput(input)

// Part One

const test1 = obj =>
  Object.entries(obj).every(([k, v]) => {
    if (k === 'sue') return true
    return SUE[k] === v
  })

const result1 = sues.filter(test1)
console.log(result1)

// Part Two

const test2 = obj =>
  Object.entries(obj).every(([k, v]) => {
    if (k === 'sue') return true
    if (k === 'cats' || k === 'trees') return SUE[k] > v
    if (k === 'pomeranians' || k === 'goldfish') return SUE[k] < v
    return SUE[k] === v
  })

function sueFilter2(sue) {
  var fail = false
  Object.keys(sue).forEach(function(k) {
    if (k == 'number') return
    switch (k) {
      case 'cats':
      case 'trees':
        if (sue[k] != undefined && sue[k] <= SUE[k]) fail = true
        break
      case 'pomeranians':
      case 'goldfish':
        if (sue[k] != undefined && sue[k] >= SUE[k]) fail = true
        break
      default:
        if (sue[k] != undefined && sue[k] != SUE[k]) fail = true
        break
    }
  })
  return !fail
}

const result2 = sues.filter(sueFilter2)
console.log(result2)

// function parse(line) {
//   var parsed = line.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/)
//   var thisSue = {
//     number: Number(parsed[1]),
//   }
//   thisSue[parsed[2]] = Number(parsed[3])
//   thisSue[parsed[4]] = Number(parsed[5])
//   thisSue[parsed[6]] = Number(parsed[7])
//   return thisSue
// }

// function sueFilter(sue) {
//   var fail = false
//   Object.keys(sue).forEach(function(k) {
//     if (k == 'number') return
//     if (sue[k] != undefined && sue[k] != tickerTape[k]) fail = true
//   })
//   return !fail
// }

// function sueFilter2(sue) {
//   var fail = false
//   Object.keys(sue).forEach(function(k) {
//     if (k == 'number') return
//     switch (k) {
//       case 'cats':
//       case 'trees':
//         if (sue[k] != undefined && sue[k] <= tickerTape[k]) fail = true
//         break
//       case 'pomeranians':
//       case 'goldfish':
//         if (sue[k] != undefined && sue[k] >= tickerTape[k]) fail = true
//         break
//       default:
//         if (sue[k] != undefined && sue[k] != tickerTape[k]) fail = true
//         break
//     }
//   })
//   return !fail
// }

// var input = document.body.textContent.trim().split('\n')
// var sues = input.map(parse)
// console.log('Solution 1: Sue #' + sues.filter(sueFilter)[0].number)
// console.log('Solution 2: Sue #' + sues.filter(sueFilter2)[0].number)
