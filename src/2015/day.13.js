import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.13.input.txt', 'utf-8')

// 2015
// Day 13: Knights of the Dinner Table
//  1. 733
//  2. 725

const RE = /^(?<target>\w+).*(?<sign>lose|gain) (?<units>\d+).*\b(?<source>\w+).$/

const scanInput = input =>
  input
    .split(/\r?\n/g)
    .map(str => ({ ...RE.exec(str).groups }))
    .map(({ target, sign, units, source }) => ({
      trg: target,
      src: source,
      u: +units * (sign === 'lose' ? -1 : 1),
    }))

const graphNodes = parsed =>
  parsed.reduce(
    (a, { trg, src, u }) => ({
      ...a,
      [trg]: { ...(a[trg] || {}), [src]: u },
    }),
    {}
  )

const change = graph => a => b => graph[a][b]

const swap = arr => (i, j) => {
  const a = [...arr]
  a[i] = arr[j]
  a[j] = arr[i]
  return a
}

function* generatePermutations(arr, n = arr.length) {
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

function* generateScores(graph) {
  const nodes = Object.keys(graph)
  const permutations = generatePermutations(nodes)
  const delta = change(graph)

  for (let p of permutations) {
    const nodes = p.map((c, i) => {
      const score = delta(c)
      const l = p[i - 1 < 0 ? p.length - 1 : i - 1]
      const r = p[i + 1 > p.length - 1 ? 0 : i + 1]
      return score(l) + score(r)
    })

    const edges = p.map((c, i) => {
      const r = p[i + 1 > p.length - 1 ? 0 : i + 1]
      return delta(c)(r) + delta(r)(c)
    })

    yield { nodes, edges }
  }
}

const sumArr = arr => arr.reduce((a, c) => a + c, 0)

const maxScores = graph => type => {
  const scores = generateScores(graph)

  let max = 0
  for (let s of scores) {
    const sum = sumArr(s[type])
    if (sum > max) max = sum
  }

  return max
}

const graph = graphNodes(scanInput(input))

// Part One

console.log(maxScores(graph)('nodes'))

// Part Two

function* removeMinEdge(scores) {
  for (let { edges } of scores) {
    const min = Math.min(...edges)
    yield edges.filter(e => e !== min)
  }
}

const maxRemoved = graph => {
  const scores = removeMinEdge(generateScores(graph))

  let max = 0
  for (let s of scores) {
    const sum = sumArr(s)
    if (sum > max) max = sum
  }

  return max
}

console.log(maxRemoved(graph))
