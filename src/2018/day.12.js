import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2018/day.12.input.txt', 'utf-8').trim()
const INIT =
  '####....#...######.###.#...##....#.###.#.###.......###.##..##........##..#.#.#..##.##...####.#..##.#'

// 2018
// Day 12: Subterranean Sustainability
//  1.
//  2.

const scanRules = input =>
  input
    .split(/\r?\n/g)
    .map(str => str.split(' => '))
    .reduce(
      (m, [k, v]) => ({
        ...m,
        [k]: v,
      }),
      {}
    )

const scanInit = init =>
  init.split('').reduce((a, c, i) => ({ ...a, [i]: c }), {})

const check = rules => m => i => {
  const spread = [m[i - 2], m[i - 1], m[i], m[i + 1], m[i + 2]].join('')
  // console.log(i, m[i], spread, rules[spread])
  return rules[spread] || m[i]
}

const expand = map => {
  const s = Math.min(...Object.keys(map).map(v => +v))
  const e = Math.max(...Object.keys(map).map(v => +v))
  return {
    ...map,
    [s - 2]: '.',
    [s - 1]: '.',
    [e + 1]: '.',
    [e + 2]: '.',
  }
}

const RULES = scanRules(INPUT)
const INITIAL_STATE = scanInit(INIT)
const CHECK = check(RULES)

const exec = map => {
  const s = Math.min(...Object.keys(map).map(v => +v))
  const e = Math.max(...Object.keys(map).map(v => +v))

  const curMap = expand(map)
  const get = CHECK(curMap)

  let nextMap = {}
  for (let n = s; n <= e; n += 1) {
    nextMap[n] = get(n)
  }

  return expand(nextMap)
}

const run = map => n => {
  let state = map
  for (let i = 0; i < n; i += 1) state = exec(state)
  return state
}

const D = map => {
  const s = Math.min(...Object.keys(map).map(v => +v))
  const e = Math.max(...Object.keys(map).map(v => +v))
  return [
    s,
    e,
    Object.entries(map)
      .sort((a, b) => a[0] - b[0])
      .map(([, v]) => v)
      .join(''),
  ]
}

const r = run(INITIAL_STATE)(20)

console.log(
  Object.entries(r).reduce((a, [k, v]) => (v === '#' ? a + +k : a), 0)
)
