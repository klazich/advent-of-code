import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.10.input.txt', 'utf-8')

// 2016
// Day 10: Balance Bots
//  1. 113
//  2. 12803

const RE = /(\d+).+?(bot|output) (\d+)(?:.+?(bot|output) (\d+))?/

const scanInput = input =>
  input.split(/\r?\n/g).map(str =>
    RE.exec(str)
      .slice(1)
      .filter(Boolean)
      .map((v, i) => ([0, 2, 4].includes(i) ? +v : v))
  )

// Part One

const tokenize = (...args) => {
  return args.length === 3
    ? {
        type: 'ASSIGN',
        val: args[0],
        trg: { type: args[1], n: args[2] },
      }
    : {
        type: 'SPLIT',
        src: { type: 'bot', n: args[0] },
        trg: {
          lo: { type: args[1], n: args[2] },
          hi: { type: args[3], n: args[4] },
        },
      }
}

const extractAssignments = instructions => ({
  instructions: instructions.filter(({ type }) => type !== 'ASSIGN'),
  assignments: instructions.filter(({ type }) => type === 'ASSIGN'),
})

const processAssignments = assignments => state =>
  assignments.reduce(
    (a, { val, trg }) => ({
      ...a,
      [trg.type]: {
        ...a[trg.type],
        [trg.n]: [...(a[trg.type][trg.n] || []), val].sort((a, b) => a - b),
      },
    }),
    state
  )

const extractReadyBots = state => {
  const { state: bot, ready } = Object.entries(state.bot).reduce(
    ({ state, ready }, [bot, str]) =>
      str.length < 2
        ? { state: { ...state, [+bot]: str }, ready }
        : { state, ready: [...ready, { bot: +bot, str }] },
    { state: {}, ready: [] }
  )
  return { state: { ...state, bot }, ready }
}

const makeAssignIns = (val, type, n) => ({
  type: 'ASSIGN',
  val,
  trg: { type, n },
})

const processReadyBots = ready => instructions =>
  instructions.reduce((a, ins) => {
    if (
      ins.type === 'ASSIGN' ||
      !ready.map(({ bot }) => bot).includes(ins.src.n)
    )
      return [...a, ins]

    const { lo, hi } = ins.trg
    const [{ bot, str }] = ready.filter(({ bot }) => bot === ins.src.n)
    const [vLo, vHi] = str

    if (vLo === 17 && vHi === 61) console.log(bot)

    return [
      ...a,
      makeAssignIns(vLo, lo.type, lo.n),
      makeAssignIns(vHi, hi.type, hi.n),
    ]
  }, [])

const exec = instruct => st => {
  let { instructions, assignments } = extractAssignments(instruct)
  let { state, ready } = extractReadyBots(processAssignments(assignments)(st))
  instructions = processReadyBots(ready)(instructions)
  // console.log(ready, instructions.slice(-2))
  return { instructions, state }
}

const run = initInstructions => (initState = { bot: {}, output: [] }) => {
  let instructions = initInstructions
  let state = initState

  let i = 0
  while (instructions.length > 0) {
    ;({ instructions, state } = exec(instructions)(state))
    // console.log(instructions.length)
  }

  return state.output
}

const instructions = scanInput(input).map(arr => tokenize(...arr))
const result = run(instructions)()

console.log(result)
