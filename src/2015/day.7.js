import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.7.input.txt', 'utf-8')

// 2015
// Day 7: Some Assembly Required
//  1. 16076
//  2. 2797

// Part One

const RE = /(?<x>[a-z0-9]*)\b\s?(?<ins>[A-Z]+)?\s?(?<y>\S+)\s->\s(?<trg>\S+)/

const ops = ins =>
  ({
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    LSHIFT: (a, b) => a << b,
    RSHIFT: (a, b) => a >> b,
    NOT: a => a ^ 65535,
    VAL: a => a,
  }[ins])

const scanner = line => {
  const { trg, ins, x, y } = line.match(RE).groups
  return {
    trg,
    fn: ops(ins || 'VAL'),
    src: [x, y]
      .filter(v => v !== undefined && v !== '')
      .map(v => (/\d+/.test(v) ? +v : v)),
  }
}

const canProcess = sources => sources.every(v => Number.isInteger(v))

const process = ({ wires, resolved = {} }) =>
  Object.entries(wires).reduce(
    (a, [trg, { fn, src }]) => {
      const sources = src.map(v =>
        a.resolved[v] || a.resolved[v] === 0 ? a.resolved[v] : v
      )
      return canProcess(sources)
        ? { ...a, resolved: { ...a.resolved, [trg]: fn(...sources) } }
        : { ...a, wires: { ...a.wires, [trg]: { fn, src: sources } } }
    },
    { wires: {}, resolved }
  )

const run = prop => input => {
  let wires = input
    .split(/\r?\n/g)
    .map(scanner)
    .reduce((a, { trg, fn, src }) => ({ ...a, [trg]: { fn, src } }), {})

  let resolved
  do ({ wires, resolved } = process({ wires, resolved }))
  while (!resolved[prop])

  return resolved[prop]
}

const result1 = run('a')(input)
console.log(result1)

// Part Two

const runOverrides = overrides => prop => input => {
  const overrideList = Object.keys(overrides)

  let wires = input
    .split(/\r?\n/g)
    .map(scanner)
    .filter(({ trg }) => !overrideList.includes(trg))
    .reduce((a, { trg, fn, src }) => ({ ...a, [trg]: { fn, src } }), {})

  let resolved = { ...overrides }
  do ({ wires, resolved } = process({ wires, resolved }))
  while (!resolved[prop])

  return resolved[prop]
}

const result2 = runOverrides({ b: result1 })('a')(input)
console.log(result2)
