import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2016/day.15.input.txt', 'utf-8')

const DISK_DATA = [[7, 0], [13, 0], [3, 2], [5, 2], [17, 0], [19, 7], [11, 0]]

// 2016
// Day 15: Timing is Everything
//  1. 121834
//  2. 3208099

const disk = (size, init) => t => (t + init) % size

const disks = DISK_DATA.map(data => disk(...data))

let t = 0
while (true) {
  let positions = disks.map((f, i) => f(t + i + 1))
  if (positions.every(v => v === 0)) break
  if (t % 1000 === 0) console.log(t)
  t += 1
}
console.log(t)
