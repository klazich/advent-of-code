const fs = require('fs')

const input = fs
  .readFileSync('./test.5.input.txt', 'utf-8')
  .split(/\r?\n/)
  .map(e => +e)

const genInput = function*(input) {
  while (true) {
    for (let x of input) yield x
  }
}

// DAY 0
{
  const add = a => b => a + b
  const sum = input.reduce((a, c) => add(a)(c), 0)
  console.log(sum)
}

// DAY 1 = 245
{
  const genFreq = function*(input) {
    let freq = 0
    for (let x of input) {
      freq += x
      yield freq
    }
  }

  let seen = new Set()
  let freq
  for (freq of genFreq(genInput(input))) {
    if (seen.has(freq)) break
    else seen.add(freq)
  }

  console.log(freq)
}
