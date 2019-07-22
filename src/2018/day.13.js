import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2018/day.13.input.txt', 'utf-8').trim()

// 2018
// Day 13: Mine Cart Madness
//  1.
//  2.

const scan = input => input.split(/\r?\n/g).map(s => s.split(''))

const intersection = {
  N: { l: 'E', s: 'N', r: 'E' },
  S: { l: 'W', s: 'S', r: 'W' },
  E: { l: 'N', s: 'E', r: 'S' },
  W: { l: 'S', s: 'W', r: 'N' },
}

const turn = {
  N: { '/': 'E', '\\': 'W' },
  S: { '/': 'W', '\\': 'E' },
  E: { '/': 'N', '\\': 'S' },
  W: { '/': 'S', '\\': 'N' },
}

const move = (y, x) => ({
  N: { y: y - 1, x },
  S: { y: y + 1, x },
  E: { y, x: x + 1 },
  W: { y, x: x - 1 },
})

const cart = grid =>
  function*(init) {
    const cycle = { l: 's', s: 'r', r: 'l' }
    let { x, y, d, c = 'l' } = init

    while (true) {
      yield { y, x, d, c }

      const track = grid[y][x]

      if (track === '+') {
        d = intersection[d][c]
        c = cycle[c]
      }
      if (track === '/' || track === '\\') {
        d = turn[d][track]
      }
      ;({ y, x } = move(y, x)[d])
    }
  }

const initCarts = grid => {
  const dir = { v: 'S', '^': 'N', '<': 'W', '>': 'E' }
  let carts = []
  for (let y in grid) {
    for (let x in grid[y]) {
      const sq = grid[y][x]
      if (['v', '^', '<', '>'].includes(sq)) {
        carts = [...carts, { y: +y, x: +x, d: dir[sq] }]
        grid[y][x] = sq === 'v' || sq === '^' ? '|' : '-'
      }
    }
  }

  carts = carts.map(c => ({ iter: cart(grid)(c) }))

  return { grid, carts }
}

const C = ({ y, x }) => `${y} ${x}`

const values = carts =>
  carts
    .map(({ iter }) => ({ iter, S: iter.next().value }))
    .map(({ iter, S }) => ({ iter, S, co: C(S) }))

const INIT = scan(INPUT)
let { grid, carts } = initCarts(INIT)

const initCart = values(carts)
  .sort((a, b) => a.S.x - b.S.x)
  .sort((a, b) => a.S.y - b.S.y)

const exec = carts => {
  let next = []
  for (let i in carts) {
    const { iter } = carts[i]
    const S = iter.next().value
    const co = C(S)
    for (let n in carts) {
      if (i === n) continue
      if (carts[n].co === co) console.log(co)
    }
    next = [...next, { iter, S, co }]
  }
  return next
}

let next = exec(initCart)

while (true) {
  next = exec(next)
}
