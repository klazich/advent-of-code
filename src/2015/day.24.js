import Combinatorics from 'js-combinatorics'

// prettier-ignore
const INPUT = [ 1, 3, 5, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 67, 
  71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113 ].reverse()

// 2015
// Day 24: It Hangs in the Balance
//  1. 10439961859
//  2. 72050269

const evaluate = (units, groups = 3) => {
  const total = units.reduce((r, v) => r + v)
  const target = total / groups

  let perms = []
  for (
    let n = 1;
    !perms.length;
    perms = Combinatorics.combination(units, ++n).filter(
      a => a.reduce((r, v) => r + v) === target
    )
  );

  return perms.map(a => a.reduce((r, v) => r * v)).sort((a, b) => a - b)[0]
}

console.log(evaluate(INPUT, 3))
console.log(evaluate(INPUT, 4))
