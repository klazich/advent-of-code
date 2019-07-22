import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.21.input.txt', 'utf-8')

// 2017
// Day 21: Fractal Art
//  1. 205
//  2. 3389823

const scan = input => input.split(/\r?\n/g)

const RE3 = /([#.])([#.])([#.])\/([#.])([#.])([#.])\/([#.])([#.])([#.])/
const RE2 = /([#.])([#.])\/([#.])([#.])/

const size = square => square.split('/')[0].split('').length
const str = (...units) => units.join('')

const rotations = code => {
  if (size(code) === 2) {
    const [a, b, c, d] = RE2.exec(code).slice(1)
    return [
      str(str(a, b), '/', str(c, d)),
      str(str(c, a), '/', str(d, b)),
      str(str(d, c), '/', str(b, a)),
      str(str(b, d), '/', str(a, c)),
    ]
  } else {
    const [a, b, c, d, e, f, g, h, i] = RE3.exec(code).slice(1)
    return [
      str(str(a, b, c), '/', str(d, e, f), '/', str(g, h, i)),
      str(str(g, d, a), '/', str(h, e, b), '/', str(i, f, c)),
      str(str(i, h, g), '/', str(f, e, d), '/', str(c, b, a)),
      str(str(c, f, i), '/', str(b, e, h), '/', str(a, d, g)),
    ]
  }
}

const flips = code => {
  if (size(code) === 2) {
    const [a, b, c, d] = RE2.exec(code).slice(1)
    return [
      str(str(a, b), '/', str(c, d)),
      str(str(b, a), '/', str(d, c)),
      str(str(c, d), '/', str(a, b)),
    ]
  } else {
    const [a, b, c, d, e, f, g, h, i] = RE3.exec(code).slice(1)
    return [
      str(str(a, b, c), '/', str(d, e, f), '/', str(g, h, i)),
      str(str(c, b, a), '/', str(f, e, d), '/', str(i, h, g)),
      str(str(g, h, i), '/', str(h, e, b), '/', str(a, b, c)),
    ]
  }
}

const mapEnhancement = map => rule => {
  const [code, enhancement] = rule.split(' => ')
  const codes = rotations(code)
  codes.forEach(c => {
    flips(c).forEach(cc => {
      map.set(cc, enhancement)
    })
  })
  return map
}

const ENHANCEMENTS = scan(INPUT).reduce(
  (map, rule) => mapEnhancement(map)(rule),
  new Map()
)

// ---

const pixelate = n => square => {
  const on = RegExp('(' + '.'.repeat(n) + ')', 'g')
  const groups = square.map(line => line.split(on).filter(Boolean))

  let pixels = []

  for (let i = 0; i < groups.length; i += n) {
    let pixRow = groups[i].map(s => [s])
    for (let j = i + 1; j < i + n; j += 1) {
      pixRow = pixRow.map((a, k) => [...a, groups[j][k]])
    }
    pixels = [...pixels, pixRow.map(arr => arr.join('/'))]
  }

  return pixels
}

const composite = pixels => {
  const groups = pixels.map(row => row.map(pixel => pixel.split('/')))

  let square = []

  for (let i = 0; i < groups.length; i += 1) {
    for (let j = 0; j < groups[i][0].length; j += 1) {
      const row = groups[i].map(a => a[j])
      square = [...square, row.join('')]
    }
  }

  return square
}

const execute = map => square => {
  const n = square[0].length % 2 === 0 ? 2 : 3
  const pixels = pixelate(n)(square).map(row =>
    row.map(pixel => map.get(pixel))
  )
  return composite(pixels)
}

const INIT = ['.#.', '..#', '###']
const TEST = ['###.', '#.#.', '.#..', '.#.#']

const exec = execute(ENHANCEMENTS)

const run = n => square => {
  let next = square
  for (let i = 0; i < n; i += 1) next = exec(next)
  return next
}

console.log(run(18)(INIT))
console.log(
  run(18)(INIT)
    .join('')
    .replace(/\./g, '').length
)
