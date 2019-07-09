import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.21.input.txt', 'utf-8')

// 2015
// Day 21: RPG Simulator 20XX
//  1.
//  2.

const BOSS = input.match(/\d+/g).map(v => +v)
const PLAYER = [100, 0, 0]

const weapons = {
  8: [4, 0],
  10: [5, 0],
  25: [6, 0],
  40: [7, 0],
  74: [8, 0],
}

const armor = {
  13: [0, 1],
  31: [0, 2],
  53: [0, 3],
  75: [0, 4],
  102: [0, 5],
}

const rings = {
  25: [1, 0],
  50: [2, 0],
  100: [3, 0],
  20: [0, 1],
  40: [0, 2],
  80: [0, 3],
}

const solve1 = input => {
  var store = require('./store')
  var boss = input.join``.match(/\d+/g)

  return require('lodash')
    .flattenDeep(
      store.weapons.map(w =>
        store.armor.map(a =>
          store.rings.map(r1 =>
            store.rings.map(r2 => ({
              cost: w.cost + a.cost + r1.cost + r2.cost,
              dmg: w.dmg + r1.dmg + r2.dmg,
              ar: a.ar + r1.ar + r2.ar,
            }))
          )
        )
      )
    )
    .filter(
      a =>
        (100 / Math.max(1, boss[1] - a.ar)) >> 0 >=
        (boss[0] / Math.max(1, a.dmg - boss[2])) >> 0
    )
    .reduce((r, v) => (v.cost < r ? v.cost : r), 999)
}

const solve2 = input => {
  var store = require('./store')
  var boss = input.join``.match(/\d+/g)

  return require('lodash')
    .flattenDeep(
      store.weapons.map(w =>
        store.armor.map(a =>
          store.rings.map(r1 => store.rings.map(r2 => ({ w, a, r1, r2 })))
        )
      )
    )
    .filter(s => s.r1.id !== s.r2.id)
    .map(s => ({
      cost: s.w.cost + s.a.cost + s.r1.cost + s.r2.cost,
      dmg: s.w.dmg + s.r1.dmg + s.r2.dmg,
      ar: s.a.ar + s.r1.ar + s.r2.ar,
    }))
    .filter(
      a =>
        (100 / Math.max(1, boss[1] - a.ar)) >> 0 <
        (boss[0] / Math.max(1, a.dmg - boss[2])) >> 0
    )
    .reduce((r, v) => (v.cost > r ? v.cost : r), 0)
}
