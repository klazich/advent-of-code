import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.2.input.txt', 'utf-8')

// 2015
// Day 2: I Was Told There Would Be No Math
//  1. 1606483
//  2. 3842356

// Part One

const parseInput = input =>
  input
    .split('\n')
    .map(l => ({ .../^(?<l>\d+)x(?<w>\d+)x(?<h>\d+)$/gm.exec(l).groups }))

const area = ({ l, w, h }) => 2 * l * w + 2 * w * h + 2 * h * l
const slack = ({ l, w, h }) => Math.min(l * w, w * h, h * l)
const wrap = dim => area(dim) + slack(dim)

const areas = parseInput(input).map(wrap)
const totalWrap = areas.reduce((a, c) => a + c, 0)

console.log(totalWrap)

// Part Two

const shortest = dimensions => {
  const [a, b] = Object.values(dimensions).sort((a, b) => a - b)
  return 2 * a + 2 * b
}
const volume = ({ l, w, h }) => l * w * h
const ribbon = dim => shortest(dim) + volume(dim)

const lengths = parseInput(input).map(ribbon)
const totalRibbon = lengths.reduce((a, c) => a + c, 0)

console.log(totalRibbon)
