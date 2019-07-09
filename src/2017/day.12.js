import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.12.input.txt', 'utf-8').trim()

// 2017
// Day 12: Digital Plumber
//  1. 306
//  2. 200

const scan = input =>
  input
    .split(/\r?\n/g)
    .map(str => /(\d+) <-> (\d+(?:, \d+)*)/g.exec(str).slice(1, 3))
    .map(([src, trg]) => ({ src: +src, trg: trg.split(/, /g).map(v => +v) }))

const reduceGroupedTo = ({ group = new Set([0]), cons }) =>
  cons.reduce(
    ({ group, cons }, { src, trg }) => {
      const check = [src, ...trg]
      const test = check.some(e => group.has(e))
      if (test) check.forEach(e => group.add(e))
      return {
        group,
        cons: test ? cons : [...cons, { src, trg }],
      }
    },
    { group, cons: [] }
  )

const groupConnectedTo = (...n) => connections => {
  let cur = reduceGroupedTo({ group: new Set(n), cons: connections })
  let pre
  do {
    pre = cur
    cur = reduceGroupedTo(cur)
  } while (cur.cons.length !== pre.cons.length)

  return [...cur.group]
}

const allGroups = function*(connections) {
  let toCheck = connections.map(({ src }) => src)
  while (toCheck.length > 0) {
    const pipe = toCheck[0]
    const group = groupConnectedTo(pipe)(connections)
    toCheck = toCheck.filter(e => !group.includes(e))
    yield group
  }
}

const iter = allGroups(scan(INPUT))
console.log([...iter].length)
