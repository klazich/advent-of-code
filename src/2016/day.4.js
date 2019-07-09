import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.4.input.txt', 'utf-8')

// 2016
// Day 4: Security Through Obscurity
//  1. 137896
//  2. 501

const parseInput = input =>
  input
    .split(/\r?\n/g)
    .map(str => str.split(/-(\d+)/))
    .map(([name, sector, checksum]) => ({
      name: name,
      sector: +sector,
      checksum: checksum.slice(1, -1),
    }))

const ALPHAS = 'abcdefghijklmnopqrstuvwxyz'
const SEP = '- '
const alphaValue = l => ALPHAS.indexOf(l)
const isSep = l => SEP.includes(l)

// Part One

const rooms = parseInput(input)

const check = name =>
  Object.entries(
    Object.entries(
      name
        .replace(/-/g, '')
        .split('')
        .reduce((a, c) => ({ ...a, [c]: (a[c] || 0) + 1 }), {})
    ).reduce((a, [k, v]) => ({ ...a, [v]: [...(a[v] || []), k] }), {})
  )
    .sort((a, b) => +b[0] - +a[0])
    .map(([k, v]) => [k, v.sort()])
    .map(([k, v]) => v)
    .flat()
    .slice(0, 5)
    .join('')

const addRealSectors = rooms =>
  rooms.reduce(
    (a, { name, sector, checksum }) =>
      check(name) === checksum ? a + sector : a,
    0
  )

console.log(addRealSectors(rooms))

// Part Two

const shiftAlpha = n => l => {
  const shift = (alphaValue(l) + n) % 26
  return shift > 25 ? 'a' : ALPHAS[shift]
}

const shiftSep = n => l => {
  const shift = ('- '.indexOf(l) + n) % 2
  return shift > 1 ? '-' : '- '[shift]
}

console.log(
  rooms
    .filter(({ name, checksum }) => check(name) === checksum)
    .map(({ name, sector }) => ({
      name: name
        .split('')
        .map(l => (isSep(l) ? shiftSep(sector)(l) : shiftAlpha(sector)(l)))
        .join(''),
      sector,
    }))
    .filter(({ name }) => name.includes('north'))
)
