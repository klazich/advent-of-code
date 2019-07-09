import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.9.input.txt', 'utf-8')

// 2015
// Day 9: All in a Single Night
//  1. 251
//  2. 898

const RE = /(?<a>\w+)\sto\s(?<b>\w+)\s=\s(?<dist>\d+)/

const scanInput = input =>
  input
    .split(/\r?\n/g)
    .map(str => ({ ...RE.exec(str).groups }))
    .map(({ a, b, dist }) => ({ nodes: [a, b].sort(), dist: +dist }))

// Part One

const graphNodes = nodes =>
  nodes.reduce((a, { nodes: [x, y], dist }) => {
    return {
      ...a,
      [x]: { ...(a[x] || {}), [y]: dist },
      [y]: { ...(a[y] || {}), [x]: dist },
    }
  }, {})

const distance = graph => a => b => graph[a][b]

const swap = arr => (i, j) => {
  const a = [...arr]
  a[i] = arr[j]
  a[j] = arr[i]
  return a
}

function* generate(arr, n = arr.length) {
  let a = arr
  let c = Array.from({ length: n }, () => 0)

  yield a

  let i = 0
  while (i < n) {
    if (c[i] < i) {
      a = i % 2 === 0 ? swap(a)(0, i) : swap(a)(c[i], i)
      yield a
      c[i] += 1
      i = 0
    } else {
      c[i] = 0
      i += 1
    }
  }
}

const shortestPath = nodes => {
  const dist = distance(graph)
  const permutations = generate(nodes)
  let min = Infinity
  let max = 0
  for (let p of permutations) {
    const total = p.reduce(
      ({ sum, f }, c) => ({ sum: sum + f(c), f: dist(c) }),
      { sum: 0, f: () => 0 }
    )
    min = total.sum < min ? total.sum : min
    max = total.sum > max ? total.sum : max
    console.log(min, max, total.sum, p.join(' '))
  }
}

const graph = graphNodes(scanInput(input))
const nodes = Object.keys(graph)

shortestPath(nodes)
