import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.1.input.txt', 'utf-8')

// 2016
// Day 1: No Time for a Taxicab
//  1. 242
//  2. 150

const directions = input.split`, `
  .map(str => str.match(/[LR]|\d+/g))
  .map(([a, n]) => [a, +n])

const N = 'NORTH'
const S = 'SOUTH'
const E = 'EAST'
const W = 'WEST'

const Compass = function*(init = 0) {
  const points = [N, E, S, W]
  let i = init
  while (true) {
    const d = yield points[i]
    i = d === 'L' ? (i === 0 ? 3 : i - 1) : i === 3 ? 0 : i + 1
  }
}

// Part One

const reduceDirections = directions => {
  const compass = Compass()
  compass.next()

  let ahead
  let x = 0
  let y = 0
  let visited = [`${y} ${x}`]
  for (let [v, d] of directions) {
    ahead = compass.next(v).value
    y = ahead === N ? y + d : ahead === S ? y - d : y
    x = ahead === E ? x + d : ahead === W ? x - d : x

    const loc = `${x} ${y}`
    if (visited.includes(loc)) break
    visited = [...visited, loc]

    console.log(v, d, x, y, visited)
  }

  return Math.abs(x) + Math.abs(y)
}

const r = reduceDirections(directions)
console.log(r)

const AoCd1p2 = directions => {
  const nav = {
      n: { L: 'w', R: 'e', plane: 'y', offset: 1 },
      e: { L: 'n', R: 's', plane: 'x', offset: 1 },
      s: { L: 'e', R: 'w', plane: 'y', offset: -1 },
      w: { L: 's', R: 'n', plane: 'x', offset: -1 },
    },
    mem = { x0y0: true }

  let key

  return Object.values(
    directions.reduce(
      (state, dir) => {
        if (state.found) return state

        state.dir = nav[state.dir[dir[0]]]

        for (let i = 0, j = +dir.slice(1); i < j && !state.found; i++) {
          state.pos[state.dir.plane] += state.dir.offset
          key = `x${state.pos.x}y${state.pos.y}`

          if (mem[key]) state.found = true
          else mem[key] = true
        }

        return state
      },
      { dir: nav.n, pos: { x: 0, y: 0 }, found: false }
    ).pos
  ).reduce((sum, val) => sum + Math.abs(val), 0)
}

console.log(AoCd1p2(directions))
