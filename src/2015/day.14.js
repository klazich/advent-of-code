import { readFileSync } from 'fs'

const input = readFileSync('./input/2015/day.14.input.txt', 'utf-8')

// 2015
// Day 14: Reindeer Olympics
//  1. 2655
//  2. 1059

const END = 2503
const RE = /(?<name>\w+).*?(?<v>\d+).*?(?<t>\d+).*?(?<r>\d+)/

const parseInput = input =>
  input
    .split(/\r?\n/g)
    .map(str => ({ ...RE.exec(str).groups }))
    .map(({ name, v, t, r }) => ({ name, v: +v, t: +t, r: +r }))

// Part One

// Donner can fly 9 km/s for 5 seconds, but then must rest for 38 seconds.

function* aDeer({ v, t, r }) {
  let dist = 0
  while (true) {
    for (let i = 0; i < t; i += 1) {
      dist += v
      yield dist
    }
    for (let i = 0; i < r; i += 1) yield dist
  }
}

const D = ({ dist }) => dist
const S = ({ score }) => score

const furthest = reindeer => {
  let R = reindeer.map(r => ({ iter: aDeer(r) }))

  for (let i = 0; i < END; i += 1) {
    R = R.map(({ iter }) => ({ iter, dist: iter.next().value }))
    console.log(R.map(D))
  }
}

furthest(parseInput(input))

// Part Two

const scoring = reindeer => {
  let R = reindeer.map(r => ({ iter: aDeer(r), score: 0 }))

  for (let i = 0; i < END; i += 1) {
    R = R.map(({ iter, score }) => ({
      iter,
      dist: iter.next().value,
      score,
    }))

    let max = Math.max(...R.map(D))

    R = R.map(({ iter, dist, score }) => ({
      iter,
      dist,
      score: dist === max ? score + 1 : score,
    }))

    console.log(i, R.map(S))
  }
}

scoring(parseInput(input))
