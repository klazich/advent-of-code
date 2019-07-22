import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2018/day.23.input.txt', 'utf-8')

// 2018
// Day 23: Experimental Emergency Teleportation
//  1.
//  2.

const scan = input =>
  input
    .split(/\r?\n/g)
    .map(str => str.match(/\d+/g).map(v => +v))
    .map(([x, y, z, r]) => ({ x, y, z, r }))

const BOTS = scan(INPUT)
const LARGEST_R_BOT = BOTS.reduce((m, bot) => (bot.r > m.r ? bot : m), { r: 0 })
const LARGEST_R = LARGEST_R_BOT.r

const distance = src => trg =>
  Math.abs(src.x - trg.x) + Math.abs(src.y - trg.y) + Math.abs(src.z - trg.z)

let c = 0
for (let bot of BOTS) {
  const dist = distance(LARGEST_R_BOT)(bot)
  if (dist <= LARGEST_R) c += 1
}
console.log(c)
