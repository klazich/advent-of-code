import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.20.input.txt', 'utf-8')

// 2015
// Day 20: Infinite Elves and Infinite Houses
//  1. 831600
//  2. 884520

const INPUT = 36000000

function getDivisors(num) {
  let divisors = []
  for (let i = Math.floor(Math.sqrt(num)); i > 0; i -= 1) {
    if (num % i == 0) {
      divisors.push(i)
      let complement = num / i
      if (i != complement) divisors.push(complement)
    }
  }
  return divisors
}

function getHouse(numPresentsPerElf, maxHousesPerElf) {
  let house = 1
  let delivered = []

  while (true) {
    let numPresents = getDivisors(house).reduce((a, b) => {
      delivered[b] = delivered[b] || 0
      let x
      if (maxHousesPerElf === undefined || delivered[b] < maxHousesPerElf) {
        x = a + b * numPresentsPerElf
        delivered[b] += 1
      }
      return x || a
    })

    if (numPresents >= INPUT) break

    house += 1
  }

  return house
}

console.log('Solution 1: ' + getHouse(10))
console.log('Solution 2: ' + getHouse(11, 50))
