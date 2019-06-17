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

const exec = (labels, state, step) => {
  const newLabels = labels.filter(e => e !== step)
  const newState = Object.entries(state).reduce((a, [k, v]) => {
    const reqs = v.filter(e => e !== step)
    if (reqs.length < 1) return a
    a[k] = reqs
    return a
  }, {})
  const newStep = nextStep(newLabels, newState)
  return [newLabels, newState, newStep]
}

const runSteps = (...args) => {
  let [labels, state, step] = args
  let order = ''
  do {
    order += step
    ;[labels, state, step] = exec(labels, state, step)
  } while (labels.length > 0)
  return order
}

const steps = parseInput(input)
const labels = Array.from(new Set(steps.flat()))
const state = setStepsRequirements(steps)
const firstStep = nextStep(labels, state)

const order = runSteps(labels, state, firstStep)

console.log(order)
