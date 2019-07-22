import { createHash } from 'crypto'

const INPUT = 'yjjvjgan'

// 2016
// Day 17: Two Steps Forward
//  1. RLDRUDRDDR
//  2. 498

const memoize = fn => {
  const cache = {}
  return (...args) => {
    const n = args.join(' ')
    if (n in cache) return cache[n]
    const result = fn(n)
    cache[n] = result
    return result
  }
}

const movement = (y, x) => d =>
  ({
    U: [y - 1, x],
    D: [y + 1, x],
    L: [y, x - 1],
    R: [y, x + 1],
  }[d])

const isDoor = ([y, x]) => y >= 0 && x >= 0 && y < 4 && x < 4
const wallStates = (y, x) => {
  const move = movement(y, x)
  return ['U', 'D', 'L', 'R']
    .map(move)
    .map(v => (isDoor(v) ? '1' : '0'))
    .join('')
}

const isOpen = c => /[bcdef]/.test(c)
const directionStates = code =>
  createHash('md5')
    .update(code)
    .digest('hex')
    .slice(0, 4)
    .replace(/\w/g, m => (isOpen(m) ? '1' : '0'))

const MEMO_directionStates = memoize(directionStates)

const walkable = (code, y, x) => {
  const doors = wallStates(y, x)
  const opens = MEMO_directionStates(code)
  const bin = (parseInt(doors, 2) & parseInt(opens, 2)).toString(2)
  return '0000'.substr(bin.length) + bin
}

const MEMO_walkable = memoize(walkable)

const exec = function*(code, y, x, path = '') {
  if (y === 3 && x === 3) {
    yield path
    return
  }

  const available = walkable(code + path, y, x)
    .split('')
    .map(v => v === '1')

  const directions = ['U', 'D', 'L', 'R']
  for (let i in directions) {
    const d = directions[i]
    if (available[i]) {
      const [ny, nx] = movement(y, x)(d)
      yield* exec(code, ny, nx, path + d)
    }
  }
}

// let max = 0
// for (let p of exec(INPUT, 0, 0)) {
//   if (p.length > max) max = p.length
//   console.log(max)
// }

const paths = [...exec(INPUT, 0, 0)].sort((a, b) => a.length - b.length)

console.log(paths)
