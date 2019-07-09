import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.15.input.txt', 'utf-8')

// 2015
// Day 15: Science for Hungry People
//  1. 13882464
//  2. 11171160

const scan = str =>
  /(\w+).*?(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+)/
    .exec(str)
    .slice(1, 7)

const makeObj = arr => ({
  name: arr[0],
  cap: +arr[1],
  dur: +arr[2],
  fla: +arr[3],
  tex: +arr[4],
  cal: +arr[5],
})

const Ingredient = o => fn => fn(o)

const ingredients = input =>
  input
    .split(/\r?\n/g)
    .map(scan)
    .map(makeObj)
    .map(Ingredient)

const scoreIngredient = ingredient => tsp => {}

const getProp = prop => ingredient => ingredient(o => o[prop])

const cap = getProp('cap')
const dur = getProp('dur')
const fla = getProp('fla')
const tex = getProp('tex')
const cal = getProp('cal')

const props = [cap, dur, fla, tex]

const score = ingredients =>
  props.reduce((mul, f) => {
    const s = ingredients.reduce((sum, { ing, tbs }) => sum + f(ing) * tbs, 0)
    return mul * (s > 0 ? s : 0)
  }, 1)

// Part One

const list = ingredients(input)

// capacity
let max = 0

for (let A = 100; A >= 1; A -= 1) {
  for (let B = 100 - A; B >= 1; B -= 1) {
    for (let C = 100 - A - B; C >= 1; C -= 1) {
      let D = 100 - A - B - C
      if (D >= 1) {
        const sCap = 5 * A + -1 * B + -1 * D // 5A > B + D
        const sDur = -1 * A + 3 * B + -1 * C // 3B > A + C
        const sFla = 4 * C
        const sTex = 2 * D

        const sCal = 5 * A + B + 6 * C + 8 * D

        const scores = [sCap, sDur, sFla, sTex].map(e => (e > 0 ? e : 0))
        const mul = scores.reduce((a, c) => a * c, 1)

        if (sCal === 500 && mul > max) max = mul
        if (sCal === 500) console.log(max, mul, scores, [A, B, C, D])
      }
    }
  }
}
