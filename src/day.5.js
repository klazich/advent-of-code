import { readFileSync } from 'fs'

const input = readFileSync('./input/day.5.input.txt', 'utf-8')

// PART 1
// = 9686

const buildHugeRe = () => {
  const lowers = 'abcdefghijklmnopqrstuvwxyz'
  const uppers = lowers.toUpperCase()
  const aA = lowers.split('').map((v, i) => v + uppers[i])
  const Aa = uppers.split('').map((v, i) => v + lowers[i])
  return new RegExp([...aA, ...Aa].join('|'), 'g')
}

const re = buildHugeRe()
const replacer = match =>
  match.toUpperCase() !== match && match.toLowerCase() !== match ? '' : match
const react = input => input.replace(re, replacer)

const reactor = input => {
  let str = input
  let pre = null
  while (str !== pre) {
    pre = str
    str = react(str)
  }
  return str
}

console.log(reactor(input).length)

// PART 2
// = 5524

const alphas = 'abcdefghijklmnopqrstuvwxyz'

const checkAlphas = input =>
  alphas.split('').map(a => {
    const re = new RegExp(a, 'gi')
    const str = input.replace(re, '')
    return reactor(str).length
  })

const shortest = lengths => Math.min(...lengths)

const lengths = checkAlphas(input)

console.log(shortest(lengths))
