import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.5.input.txt', 'utf-8')

// 2015
// Day 5: Doesn't He Have Intern-Elves For This?
//  1. 258
//  2. 53

const VOWELS = /[aeiou].*?[aeiou].*?[aeiou]/
const TWICE = /([a-z])\1/
const DISALLOWED = /ab|cd|pq|xy/

const parseInput = input => input.split(/\r?\n/g)
const strings = parseInput(input)

// Part One

const vowels = str => VOWELS.test(str)
const doubles = str => TWICE.test(str)
const noBad = str => !DISALLOWED.test(str)

const doTests = (...tests) => str => tests.every(t => t(str))

const nice = doTests(vowels, doubles, noBad)

const result1 = strings.filter(nice)
console.log(result1)

// Part Two

// 871 strings for the first rule (pairs)
// 60 strings for the second rule (repeated characters with one in the middle)
// leaving you with 69 nice strings.

function nice2(str) {
  var repeat = str.match(/([a-z][a-z])[a-z]*\1/)
  var zxz = str.match(/([a-z])[a-z]\1/)
  return (
    repeat != undefined &&
    repeat.length > 0 &&
    (zxz != undefined && zxz.length > 0)
  )
}

const result2 = strings.filter(nice2)
console.log(result2.length)
