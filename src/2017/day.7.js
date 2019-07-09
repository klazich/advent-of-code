import { readFileSync } from 'fs'

const input = readFileSync('./input/2017/day.7.input.txt', 'utf-8')

// 2017
// Day 7: Recursive Circus
//  1. airlri
//  2. 1206

const scan = input =>
  input
    .split(/\r?\n/g)
    .map(str => str.match(/\w+/g))
    .map(([name, w, ...subs]) => ({ name, w: +w, subs }))

const names = tokens => [...new Set(tokens.map(({ name }) => name))]
const dependents = tokens => [
  ...new Set(tokens.reduce((a, { subs }) => [...a, ...subs], [])),
]

const TOKENS = scan(input)
const deps = dependents(TOKENS)
console.log(names(TOKENS).reduce((a, c) => (!deps.includes(c) ? c : a), null))

const weights = TOKENS.reduce((a, { name, w }) => ({ ...a, [name]: w }), {})

const mapTokens = tokens =>
  tokens.map(({ name, w, subs }) =>
    subs.length === 0
      ? { name, w }
      : {
          name,
          w,
          subs: mapTokens(TOKENS.filter(({ name }) => subs.includes(name))),
        }
  )

const map = mapTokens(TOKENS).filter(({ name }) => name === 'airlri')[0]

const mapWeights = ({ w, subs }) =>
  subs
    ? {
        w,
        total: !subs ? w : subs.reduce((a, c) => a + mapWeights(c).total, w),
        subs: subs.map(mapWeights),
      }
    : { w, total: w }

// console.log(mapWeights(map))

const checkWeights = ({ w, total, subs }) => {
  if (subs) {
    const weights = subs.map(({ w, total }) => ({ w, total }))
    if (!weights.every(({ total }) => total === weights[0].total)) {
      console.log(w, total)
      console.log(weights)
    }
    subs.map(checkWeights)
  }
}

checkWeights(mapWeights(map))
