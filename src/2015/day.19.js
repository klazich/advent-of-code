import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.19.input.txt', 'utf-8')

// 2015
// Day 19: Medicine for Rudolph
//  1. 509
//  2. 195

const parseInput = input =>
  input
    .split(/\r?\n\r?\n/g)
    .map((str, i) => (i === 0 ? str.split(/\r?\n/g) : str))

const [subs, molecule] = parseInput(input)
const replacements1 = subs
  .map(str => str.split(/ => /))
  .reduce(
    (a, [k, v]) => ({
      ...a,
      [k]: [...(a[k] || []), v],
    }),
    {}
  )

const bases = Object.keys(replacements1)

const possiblesFor = replacements => base => str => {
  const RE = RegExp(base, 'g')
  const subs = replacements[base]

  let possibles = new Set()
  let m
  while ((m = RE.exec(str)) !== null) {
    const { index: s } = m
    const e = RE.lastIndex
    subs.forEach(sub => {
      possibles.add(str.slice(0, s) + sub + str.slice(e))
    })
  }

  return [...possibles]
}

const getPossibles = possiblesFor(replacements1)
const possibles = bases.reduce(
  (a, c) => [...a, ...getPossibles(c)(molecule)],
  []
)
console.log(new Set(possibles).size)

// Part Two

const RE = /[A-Z][a-z]?/g

const tokens = molecule.match(RE)
const countAll = tokens.length
const countRnAr = tokens.filter(m => ['Rn', 'Ar'].includes(m)).length
const countY = tokens.filter(m => m === 'Y').length

console.log(countAll - countRnAr - 2 * countY - 1, countAll, countRnAr, countY)
