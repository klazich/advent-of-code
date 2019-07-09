import { readFileSync } from 'fs'

const input = readFileSync('./input/2017/day.1.input.txt', 'utf-8')

// 2017
// Day 1: Inverse Captcha
//  1. 1393
//  2. 1292

const sumRepeats = nums => nums.match(/(\d)(?=\1)/g).reduce((a, c) => a + +c, 0)

console.log(sumRepeats(input + input[0]))

const sumRepeatsHalf = nums =>
  nums.split('').reduce((a, c, i) => {
    const check = (i + nums.length / 2) % nums.length
    return c === nums[check] ? a + +c : a
  }, 0)

console.log(sumRepeatsHalf(input))
