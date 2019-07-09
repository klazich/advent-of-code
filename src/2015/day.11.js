import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.11.input.txt', 'utf-8')

// 2015
// Day 11: Corporate Policy
//  1. hxbxxyzz
//  2. hxcaabcc

const ALPHAS = 'abcdefghijklmnopqrstuvwxyz'
const toInt = l => ALPHAS.indexOf(l) + 1
const toAlpha = n => ALPHAS[n - 1]

const inc = arr =>
  arr[arr.length - 1] !== 26
    ? [...arr.slice(0, -1), arr[arr.length - 1] + 1]
    : [...inc(arr.slice(0, -1)), 1]

const passwords = function*(input) {
  let arr = input.split('').map(toInt)
  while (true) {
    arr = inc(arr)
    yield arr.map(toAlpha).join('')
  }
}

const runTests = (...tests) => x => tests.every(t => t(x))

// Part One

const rule1 = str => {
  const arr = str.split('').map(toInt)
  for (let i = 2; i < arr.length; i += 1) {
    let [a, b, c] = [arr[i - 2], arr[i - 1], arr[i]]
    if (a + 1 === b && b + 1 === c) return true
  }
  return false
}
const rule2 = str => str.split('').every(c => !['i', 'o', 'l'].includes(c))
const rule3 = str => (str.match(/([a-z])\1/g) || []).length >= 2

const test = runTests(rule1, rule2, rule3)

let iter = passwords(input)
let p = input

while (!test(p)) p = iter.next().value
console.log(p)

// Part Two

p = iter.next().value

while (!test(p)) p = iter.next().value
console.log(p)
