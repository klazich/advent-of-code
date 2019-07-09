import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.8.input.txt', 'utf-8')

// 2016
// Day 8: Two-Factor Authentication
//  1. 119
//  2. ZFHFSFOGPO

const RERect = /(\d+)x(\d+)/
const RERotate = /([yx])=(\d+) by (\d+)/

const parseInput = input =>
  input.split(/\r?\n/g).map(str =>
    str.startsWith('rect')
      ? {
          type: 'RECT',
          args: RERect.exec(str)
            .slice(1, 3)
            .map(v => +v),
        }
      : {
          type: 'ROTATE',
          args: RERotate.exec(str)
            .slice(1, 4)
            .map((v, i) => (i > 0 ? +v : v)),
        }
  )

const initGrid = () =>
  Array.from({ length: 6 }, () => Array.from({ length: 50 }, () => 0))

// Part One

const instructions = parseInput(input)

const rect = (x, y) => state => {
  for (let i = 0; i < y; i += 1) for (let j = 0; j < x; j += 1) state[i][j] = 1
  return state
}

const rotateY = (id, n) => state => {
  n %= 50
  state[id] = [...state[id].slice(-n), ...state[id].slice(0, -n)]
  return state
}
const rotateX = (id, n) => state => {
  n %= 6
  const col = Array.from({ length: 6 }, (_, i) => state[i][id])
  const newCol = [...col.slice(-n), ...col.slice(0, -n)]
  for (let i = 0; i < 6; i += 1) {
    state[i][id] = newCol[i]
  }
  return state
}

const rot = dir => (dir === 'x' ? rotateX : rotateY)
const rotate = (dir, i, n) => rot(dir)(i, n)

const get = ({ type }) => (type === 'RECT' ? rect : rotate)
const exec = ins => get(ins)(...ins.args)

const display = grid => {
  let g = grid
  console.log(g.map(r => r.map(v => (v === 1 ? '#' : ' ')).join('')).join('\n'))
}

const run = instructions => (init = initGrid()) => {
  let grid = init
  for (let ins of instructions) grid = exec(ins)(grid)
  return grid
}

const result = run(instructions)()
display(result)
console.log(result.flat().filter(Boolean).length)
