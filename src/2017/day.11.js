import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.11.input.txt', 'utf-8').trim()

// 2017
// Day 11: Hex Ed
//  1. 794
//  2. 1524

const INSTRUCTIONS = INPUT.split(/,/g)

// N  + S  = 0
// NE + SW = 0
// NW + SE = 0

//x N  + SW = NW
//x N  + SE = NE
//x S  + NW = SW
//  S  + NE = SE
//x NW + NE = N
//x SW + SE = S

const exec = ins => state => ({ ...state, [ins]: (state[ins] || 0) + 1 })
const getSteps = instructions =>
  instructions.reduce((a, ins) => exec(ins)(a), {})

const STEPS_TAKEN = getSteps(INSTRUCTIONS)

const reduceZeros = ({ n, s, nw, se, ne, sw }) =>
  Object.entries({
    n: n > s ? n - s : 0,
    s: s > n ? s - n : 0,
    nw: nw > se ? nw - se : 0,
    se: se > nw ? se - nw : 0,
    ne: ne > sw ? ne - sw : 0,
    sw: sw > ne ? sw - ne : 0,
  }).reduce((a, [k, v]) => (v > 0 ? { ...a, [k]: v } : a), {})

const useReducer = ({ req, ret }) => state => {
  const [x, y] = req.sort((a, b) => state[b] - state[a])
  return Object.entries({
    ...state,
    [ret]: state[ret] + state[y],
    [x]: state[x] - state[y],
    [y]: 0,
  }).reduce((a, [k, v]) => (v > 0 ? { ...a, [k]: v } : a), {})
}

const canUse = ({ req }) => steps =>
  req.every(d => Object.keys(steps).includes(d))

const execReducers = steps =>
  [
    { req: ['n', 'sw'], ret: 'nw' },
    { req: ['n', 'se'], ret: 'ne' },
    { req: ['s', 'nw'], ret: 'sw' },
    { req: ['s', 'ne'], ret: 'se' },
    { req: ['nw', 'ne'], ret: 'n' },
    { req: ['sw', 'se'], ret: 's' },
  ].reduce((a, rdc) => (canUse(rdc)(a) ? useReducer(rdc)(a) : a), steps)

const distance = steps =>
  Object.values(execReducers(reduceZeros(steps))).reduce((a, c) => a + c, 0)

// console.log(STEPS_TAKEN)
// console.log(reduceZeros(STEPS_TAKEN))
// console.log(execReducers(reduceZeros(STEPS_TAKEN)))

// console.log(distance(STEPS_TAKEN))

// Part Two

let max = 0
let instructions = []
for (let ins of INSTRUCTIONS) {
  instructions = [...instructions, ins]
  const steps = getSteps(instructions)
  const dist = distance(steps)
  console.log(dist)
  if (dist > max) max = dist
}

console.log(max)
