const INPUT = '00111101111101000'
const SIZE_1 = 272
const SIZE_2 = 35651584

// 2016
// Day 16: Dragon Checksum
//  1. 10011010010010010
//  2. 10101011110100011

const iterate = data =>
  data +
  '0' +
  data
    .split('')
    .reverse()
    .join('')
    .replace(/[01]/g, v => (v === '0' ? '1' : '0'))

const fit = n => data => data.slice(0, n)

const fitToDisk = n => data => {
  let next = data
  while (next.length < n) next = iterate(next)
  return fit(n)(next)
}

const check = data => data.replace(/\w\w/g, ([a, b]) => (a === b ? '1' : '0'))

const checksum = data => {
  let next = check(data)
  while (next.length % 2 === 0) next = check(next)
  return next
}

const data1 = fitToDisk(SIZE_1)(INPUT)
const cs1 = checksum(data1)

console.log(cs1)

const data2 = fitToDisk(SIZE_2)(INPUT)
const cs2 = checksum(data2)

console.log(cs2)
