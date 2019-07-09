import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2017/day.20.input.txt', 'utf-8')

// 2017
// Day 20: Particle Swarm
//  1. 364
//  2. 420

const scan = input =>
  input
    .split(/\r?\n/g)
    .map(str =>
      str
        .match(/<(.+?)>/g)
        .map(str => str.replace(/[<>]/g, ''))
        .map(str => str.split(/,/g).map(v => +v))
    )
    .map((data, id) => ({ id, data }))

const score = i => ({ data }) => data[i].reduce((a, v) => a + Math.abs(v), 0)

let state = scan(INPUT)

// state = state.sort((a, b) => score(0)(a) - score(0)(b))
// state = state.sort((a, b) => score(1)(a) - score(1)(b))
// state = state.sort((a, b) => score(2)(a) - score(2)(b))

const update = ([[px, py, pz], [vx, vy, vz], [ax, ay, az]]) => [
  [px + vx + ax, py + vy + ay, pz + vz + az],
  [vx + ax, vy + ay, vz + az],
  [ax, ay, az],
]

const toStr = ([[x, y, z]]) => `${x} ${y} ${z}`

const xt = (p, v, a) => t => 0.5 * a * t ** 2 + v * t + p
const pos = ([[px, py, pz], [vx, vy, vz], [ax, ay, az]]) => t =>
  `${xt(px, vx, ax)(t)} ${xt(py, vy, ay)(t)} ${xt(pz, vz, az)(t)}`

// [
//   xt(px, vx, ax)(t),
//   xt(py, vy, ay)(t),
//   xt(pz, vz, az)(t),
// ]

state = scan(INPUT).map(({ data }) => data)

for (let t = 0; t < 1000000; t += 1) {
  state = state.map(update)
  const positions = state.map(toStr)

  const collisions = new Set()
  const seen = new Set()

  positions.forEach(p => {
    seen.has(p) ? collisions.add(p) : seen.add(p)
  })

  state = state.filter(arr => !collisions.has(toStr(arr)))

  if (t % 1000 === 0) console.log(t, state.length)
}
