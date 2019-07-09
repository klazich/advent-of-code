import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.19.input.txt', 'utf-8')

// 2017
// Day 19: A Series of Tubes
//  1. YOHREPXWN
//  2. 16734

const DOWN = 'DOWN'
const UP = 'UP'
const RIGHT = 'RIGHT'
const LEFT = 'LEFT'

const scan = input => input.split(/\r?\n/g)

const initPos = lines => ({ y: 0, x: lines[0].indexOf('|') })

const initState = lines => ({
  pos: initPos(lines),
  movement: DOWN,
  letters: '',
})

const down = ({ y, x }) => ({ y: y + 1, x })
const up = ({ y, x }) => ({ y: y - 1, x })
const right = ({ y, x }) => ({ y, x: x + 1 })
const left = ({ y, x }) => ({ y, x: x - 1 })

const move = ({ pos, movement }) =>
  ({
    DOWN: down,
    UP: up,
    RIGHT: right,
    LEFT: left,
  }[movement](pos))

const symbol = lines => ({ x, y }) => lines[y][x]

const next = lines => state => {
  const { pos } = state
  const look = symbol(lines)

  if (/[A-Z]/.test(look(pos))) {
    return [
      look(right(pos)),
      look(left(pos)),
      look(up(pos)),
      look(down(pos)),
    ].filter(c => c !== ' ').length === 1
      ? {
          ...state,
          letters: state.letters + look(pos),
          done: true,
        }
      : {
          ...state,
          pos: move(state),
          letters: state.letters + look(pos),
        }
  }

  if (look(pos) === '+') {
    if (state.movement === UP || state.movement === DOWN)
      return look(right(pos)) === '-'
        ? {
            ...state,
            pos: right(pos),
            movement: RIGHT,
          }
        : {
            ...state,
            pos: left(pos),
            movement: LEFT,
          }
    else
      return look(up(pos)) === '|'
        ? {
            ...state,
            pos: up(pos),
            movement: UP,
          }
        : {
            ...state,
            pos: down(pos),
            movement: DOWN,
          }
  }

  return {
    ...state,
    pos: move(state),
  }
}

const LINES = scan(INPUT)
const exec = next(LINES)

let state = initState(LINES)
while (!state.done) {
  state = exec(state)
  state = { ...state, n: (state.n || 0) + 1 }
  console.log(symbol(LINES)(state.pos), state)
}
