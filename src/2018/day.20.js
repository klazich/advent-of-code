import { readFileSync } from 'fs'
import { memoize } from 'lodash'

const INPUT = readFileSync('./input/2018/day.20.input.txt', 'utf-8').trim()

// 2018
// Day 20: A Regular Map
//  1.
//  2.

const scan = input => input.trim().slice(1, -1)

const replacer = () => {
  let c = 0
  let map = {}
  return {
    f: match => {
      const key = `<${`${c}`.padStart(6, '0')}>`
      map[key] = match.slice(1, -1)
      c += 1
      return key
    },
    get: () =>
      Object.entries(map).reduce((m, [k, v]) => {
        m[k] = v
          .split(/\|/g)
          .map(s => (/\d/.test(s) ? s.split(/(<\d+>)/g).filter(Boolean) : [s]))
        return m
      }, {}),
  }
}

const tokenize = str => {
  const { f, get } = replacer()
  let next = str
  while (next.includes('(')) {
    next = next.replace(/\([NSEW|0-9<>]+\)/g, f)
  }

  return { init: [next.split(/(<\d+>)/g).filter(Boolean)], tokens: get() }
}

// console.log(tokenize(scan(INPUT)).init)

const move = ([y, x]) => dir =>
  ({
    N: [y - 1, x],
    S: [y + 1, x],
    E: [y, x + 1],
    W: [y, x - 1],
  }[dir])

const opp = dir => ({ N: 'S', S: 'N', E: 'W', W: 'E' }[dir])

const S = ([y, x]) => `${y} ${x}`

const map = tokens =>
  function*(rooms, arr, coords = [0, 0], dist = 0) {
    for (let ins of arr) {
      for (let path of ins) {
        if (/\d/.test(path)) {
          yield* map(tokens)(rooms, tokens[path], coords, dist)
          continue
        }

        for (let d of path) {
          // console.log(d)
          let k = S(coords)
          rooms[k] = rooms[k] || {
            y: coords[0],
            x: coords[1],
            doors: { N: 0, S: 0, E: 0, W: 0 },
          }
          rooms[k].doors[d] = 1

          coords = move(coords)(d)
          dist += 1

          k = S(coords)
          rooms[k] = rooms[k] || {
            y: coords[0],
            x: coords[1],
            doors: { N: 0, S: 0, E: 0, W: 0 },
          }
          rooms[k].doors[opp(d)] = 1
        }
      }
    }

    return rooms
  }

const { init, tokens } = tokenize(scan(INPUT))
const iter1 = map(tokens)({}, init)
const ROOMS = iter1.next().value

// const trek = rooms => {
//   let least = Infinity

//   return function* exec(src, trg, path = []) {
//     if (path.length > least) return

//     if (src[0] === trg[0] && src[1] === trg[1]) {
//       const dist = [...path, S(src)].length
//       console.log(dist)
//       if (dist < least) least = dist
//       return [...path, S(src)]
//     }
//     const room = rooms[S(src)]

//     for (let dir of ['N', 'S', 'E', 'W']) {
//       if (room.doors[dir] === 1) {
//         const next = move(src)(dir)
//         if (path.includes(S(next))) continue
//         yield* exec(next, trg, [...path, S(src)])
//       }
//     }
//   }
// }

const trek = rooms => (src, trg) => {
  let least = Infinity

  const exec = (src, trg, path = []) => {
    if (path.length > least) return

    if (src[0] === trg[0] && src[1] === trg[1]) {
      const dist = [...path, S(src)].length
      if (dist < least) least = dist
      return
    }

    const room = rooms[S(src)]
    for (let dir of ['N', 'S', 'E', 'W']) {
      if (room.doors[dir] === 1) {
        const next = move(src)(dir)
        if (path.includes(S(next))) continue
        exec(next, trg, [...path, S(src)])
      }
    }
  }

  exec(src, trg)

  return least
}

const l = trek(ROOMS)([0, 0], [17, 7])

// console.log(Object.keys(ROOMS).length)
console.log(l)
