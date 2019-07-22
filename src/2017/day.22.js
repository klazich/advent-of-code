import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.22.input.txt', 'utf-8')

// 2017
// Day 22: Sporifica Virus
//  1. 5404
//  2. 2511672

// - If the current node is infected, it turns to its right. Otherwise, it turns
//   to its left. (Turning is done in-place; the current node does not change.)
// - If the current node is clean, it becomes infected. Otherwise, it becomes
//   cleaned. (This is done after the node is considered for the purposes of
//   changing direction.)
// - The virus carrier moves forward one node in the direction it is facing.

const scan = input => input.split(/\r?\n/g).map(str => str.split(''))

const _movement = {
  N: { r: 'E', l: 'W' },
  S: { r: 'W', l: 'E' },
  E: { r: 'S', l: 'N' },
  W: { r: 'N', l: 'S' },
}

const C = ({ y, x }) => `${y} ${x}`

const _turn = ({ map, state }) => ({
  map,
  state: {
    ...state,
    facing: map[C(state)] ? movement[state.facing].r : movement[state.facing].l,
  },
})

const _mark = ({ map, state }) => ({
  map: {
    ...map,
    [C(state)]: !map[C(state)],
  },
  state,
})

const _count = ({ map, state }) => ({
  map,
  state: {
    ...state,
    count: map[C(state)] ? state.count + 1 : state.count,
  },
})

const _move = ({ map, state }) => ({
  map,
  state: {
    ...state,
    y:
      state.facing === 'N'
        ? state.y - 1
        : state.facing === 'S'
        ? state.y + 1
        : state.y,
    x:
      state.facing === 'E'
        ? state.x + 1
        : state.facing === 'W'
        ? state.x - 1
        : state.x,
  },
})

const pipe = (...fns) => init => fns.reduce((x, f) => f(x), init)

const _exec = pipe(
  _turn,
  _mark,
  _count,
  _move
)

const _INIT_MAP = scan(INPUT).reduce(
  (a, arr, y) =>
    arr.reduce((b, v, x) => ({ ...b, [`${y} ${x}`]: v === '#' }), a),
  {}
)

const _INIT_STATE = {
  y: 12,
  x: 12,
  facing: 'N',
  count: 0,
}

// console.log(run(10000)())

// Part Two

const movement = {
  N: { c: 'W', w: 'N', i: 'E', f: 'S' },
  S: { c: 'E', w: 'S', i: 'W', f: 'N' },
  E: { c: 'N', w: 'E', i: 'S', f: 'W' },
  W: { c: 'S', w: 'W', i: 'N', f: 'E' },
}

const marking = {
  c: 'w',
  w: 'i',
  i: 'f',
  f: 'c',
}

const turn = ({ map, state }) => ({
  map,
  state: {
    ...state,
    facing: movement[state.facing][map[C(state)] || 'c'],
  },
})

const mark = ({ map, state }) => {
  map[C(state)] = marking[map[C(state)] || 'c']
  return { map, state }
}

const count = ({ map, state }) => ({
  map,
  state: {
    ...state,
    count: map[C(state)] === 'i' ? state.count + 1 : state.count,
  },
})

const move = ({ map, state }) => ({
  map,
  state: {
    ...state,
    y:
      state.facing === 'N'
        ? state.y - 1
        : state.facing === 'S'
        ? state.y + 1
        : state.y,
    x:
      state.facing === 'E'
        ? state.x + 1
        : state.facing === 'W'
        ? state.x - 1
        : state.x,
  },
})

const exec = pipe(
  turn,
  mark,
  count,
  move
)

const INIT_MAP = scan(INPUT).reduce(
  (a, arr, y) =>
    arr.reduce(
      (b, v, x) => ({ ...b, [`${y} ${x}`]: v === '#' ? 'i' : 'c' }),
      a
    ),
  {}
)

const INIT_STATE = {
  y: 12,
  x: 12,
  facing: 'N',
  count: 0,
}

const run = n => ({ map = INIT_MAP, state = INIT_STATE } = {}) => {
  // console.log(map, state)
  let next = { map, state }
  for (let i = 0; i < n; i += 1) {
    next = exec(next)
    if (i % 10000 === 0) console.log(i, next.state)
  }
  return next
}

console.log(run(10000000)().state)
