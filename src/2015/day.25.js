const INPUT =
  'To continue, please consult the code grid in the manual.  Enter the code at row 3010, column 3019.'

// 2015
// Day 25: Let It Snow
//  1. 8997277
//  2.

const gen = function*(init) {
  let code = init
  while (true) {
    yield code
    code = (code * 252533) % 33554393
  }
}

const tri = x => (x * (x + 1)) / 2
const row = x => (x * (x + 1)) / 2 + 1

const codeNumAt = (y, x) => {
  let val = tri(x)
  let adder = x
  for (let i = 0; i < y - 1; i += 1) {
    val += adder
    adder += 1
  }
  return val
}

console.log(codeNumAt(2, 1))
// code# 18168397

let val
let i = 1
for (let v of gen(20151125)) {
  val = v
  if (i === 18168397) break
  i += 1
}
console.log(val)
