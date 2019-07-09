const INPUT = 376

// 2017
// Day 17: Spinlock
//  1. 777
//  2. 39289581

const buffer = function*(step) {
  let arr = [0]
  let i = 0
  let v = 1
  while (true) {
    i = (i + step) % arr.length
    arr = [...arr.slice(0, i + 1), v, ...arr.slice(i + 1)]
    i = (i + 1) % arr.length
    yield { arr, i }
    v += 1
  }
}

// const iter = buffer(INPUT)

// let result
// for (let i = 0; i < 50000000; i += 1) {
//   result = iter.next().value
//   if (i % 100000 === 0) console.log(i)
// }

// console.log(result.arr.indexOf(0), result.arr[result.arr.indexOf(0) + 1])

let p = 0
let oneth = 1
for (let n = 1; n <= 50000000; n++) {
  p = (p + (INPUT % n) + 1) % n
  if (p == 0) oneth = n
}
console.log(oneth)
