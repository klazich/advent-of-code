const INPUT = 3012210

// 2016
// Day 19: An Elephant Named Joseph
//  1. 1830117
//  2. 1417887

const next = map => last => s => {
  let i = s + 1
  while (!map.has(i)) {
    i += 1
    if (i > last) i = 0
  }

  return i
}

const circle_1 = n => {
  let map = new Map(Array.from({ length: n }, (_, i) => [i, 1]))

  let last = n - 1
  let pre = 0
  let i = 0
  let vic = next(map)(last)(i)

  let j = 0
  while (i !== vic) {
    if (pre > i) {
      last = 0
      for (let k of map.keys()) if (k > last) last = k
    }

    map.set(i, map.get(i) + map.get(vic))
    map.delete(vic)

    pre = i
    i = next(map)(last)(i)
    vic = next(map)(last)(i)

    if (j % 1000 === 0) console.log(pre, i, vic, last, map.size)
    j += 1
  }

  return { map, i }
}

// console.log(circle_1(INPUT))

const circle_2 = n => {
  let trg = n
  let pow = Math.pow(3, trg.toString(3).length - 1)
  if (pow === trg) return pow
  else if (pow >= trg / 2) return trg - pow
  else return pow + 2 * (trg - 2 * pow)
}

console.log(circle_2(INPUT))
