import md5 from 'md5'
import { createHash } from 'crypto'

const INPUT = 'ngcjuoqr'

// 2016
// Day 14: One-Time Pad
//  1. 18626
//  2. 20092

const RE3 = /(\w)\1\1/g
const RE5 = /(\w)\1\1\1\1/g

const hasher = function*(salt) {
  let i = 0
  while (true) {
    // yield { i, h: md5(`${salt}${i}`) }
    yield {
      i,
      h: createHash('md5')
        .update(`${salt}${i}`)
        .digest('hex'),
    }
    i += 1
  }
}

const hasher2017 = function*(salt) {
  let i = 0
  while (true) {
    let hash = `${salt}${i}`
    for (let n = 0; n < 2017; n += 1)
      hash = createHash('md5')
        .update(hash)
        .digest('hex')

    yield { i, h: hash }
    i += 1
  }
}

const track = salt => {
  const iter = hasher2017(salt)
  let tracker = []
  let found = []

  for (let { i, h: hash } of iter) {
    const match3 = hash.match(RE3)
    const match5 = hash.match(RE5)

    if (match3) tracker.push({ v: match3[0][0], c: 1000, h: hash, i })

    if (match5) {
      for (let m of match5) {
        const check = m[0]
        let next = []
        for (let t of tracker) {
          if (t.v === check && t.i !== i) {
            found.push({ i: t.i, h: t.h, mi: i, m: hash })
            continue
          }
          next.push(t)
        }
        tracker = next.sort((a, b) => a.c - b.c)
      }
    }

    if (found.length >= 64) return found

    tracker = tracker
      .map(({ v, c, h, i }) => (c - 1 === 0 ? null : { v, c: c - 1, h, i }))
      .filter(Boolean)
      .sort((a, b) => a.c - b.c)

    if (i % 100 === 0) {
      console.log(i, found.length)
    }
  }
}

const r = track(INPUT)
console.log(r)
console.log(r[63])
