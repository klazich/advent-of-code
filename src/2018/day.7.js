import { readFileSync } from 'fs'

const input = readFileSync('./input/day.7.input.txt', 'utf-8')

// PART 1
// = CFMNLOAHRKPTWBJSYZVGUQXIDE

const parseInput = input =>
  input.split('\n').map(str => {
    const m = /\s(?<a>[A-Z])\s.*\s(?<b>[A-Z])\s/g.exec(str)
    return [m.groups.a, m.groups.b]
  })

const setStepsRequirements = steps =>
  steps.reduce(
    (a, [req, step]) => ({
      ...a,
      [step]: [...(a[step] || []), req],
    }),
    {}
  )

const nextStep = (labels, state) => {
  const needReq = Object.keys(state)
  const [first] = labels.filter(step => !needReq.includes(step)).sort()
  return first
}

const execStep = (labels, state, step) => {
  const nextLabels = labels.filter(e => e !== step)
  const nextState = Object.entries(state).reduce((a, [k, v]) => {
    const reqs = v.filter(e => e !== step)
    return reqs.length < 1 ? a : { ...a, [k]: reqs }
  }, {})
  const newStep = nextStep(nextLabels, nextState)
  return [nextLabels, nextState, newStep]
}

const runSteps = (...args) => {
  let [labels, state, step] = args
  let order = ''
  do {
    order += step
    ;[labels, state, step] = execStep(labels, state, step)
  } while (labels.length > 0)
  return order
}

// const steps = parseInput(input)
// const labels = Array.from(new Set(steps.flat()))
// const state = setStepsRequirements(steps)
// const firstStep = nextStep(labels, state)

// const order = runSteps(labels, state, firstStep)
// console.log(order)

// PART 2
// = 971

const NUM_WORKERS = 5
const ALPHAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const stepCost = step => ALPHAS.indexOf(step) + 61

const setSteps = requisites =>
  requisites.reduce(
    (a, [req, step]) => ({
      ...a,
      [step]: [...(a[step] || []), req],
    }),
    {}
  )

const completeStep = step => steps =>
  Object.entries(steps).reduce((a, [k, v]) => {
    const reqs = v.filter(e => e !== step)
    return reqs.length < 1 ? a : { ...a, [k]: reqs }
  }, {})

const readySteps = remaining => steps => {
  const needReq = Object.keys(steps)
  return remaining.filter(step => !needReq.includes(step)).sort()
}

const inProgSteps = working => working.map(({ step }) => step)

function* runWorkers() {
  let stack = []
  let seconds = 0
  while (true) {
    let complete = []

    stack = stack.reduce((a, { step, time }) => {
      if (time === 1) {
        complete = [...complete, step]
        return a
      }
      return [...a, { step, time: time - 1 }]
    }, [])

    const ready = yield { complete, seconds }

    const inProgress = inProgSteps(stack)
    const assignable = ready
      .filter(e => !inProgress.includes(e))
      .map(step => ({ step, time: stepCost(step) }))
    stack = [...stack, ...assignable]
    stack.length = stack.length > NUM_WORKERS ? NUM_WORKERS : stack.length

    seconds += 1
  }
}

const doWork = requisites => {
  let steps = setSteps(requisites)
  let remaining = Array.from(new Set(requisites.flat()))
  let done = []

  const workers = runWorkers()

  let result
  while (remaining.length > 0) {
    let ready = readySteps(remaining)(steps)
    let { complete, seconds } = workers.next(ready).value
    result = seconds
    done = [...done, ...complete]
    remaining = remaining.filter(e => !done.includes(e))
    steps = complete.reduce((a, c) => completeStep(c)(a), steps)
  }

  return result
}

const requisites = parseInput(input)
const result = doWork(requisites)

console.log(result)
