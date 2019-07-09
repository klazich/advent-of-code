import { readFileSync } from 'fs'

const input = readFileSync('./input/day.8.input.txt', 'utf-8').split(' ')

function* iterate(numbers) {
  for (let n of numbers) yield n
}

// PART 1
// = 48260

function processNode(iter) {
  let sum = 0

  const children = +iter.next().value
  const metadata = +iter.next().value

  console.log(children, metadata)

  for (let i = 0; i < children; i += 1) {
    sum += processNode(iter)
  }

  for (let i = 0; i < metadata; i += 1) {
    sum += +iter.next().value
  }

  return sum
}

const run = input => {
  const iter = iterate(input)
  const sum = processNode(iter)
  return sum
}

// PART 2
// = 25981

let label = 0

const process = iter => {
  const name = label++
  let children = []
  let pointers = []

  const childrenQty = +iter.next().value
  const metadataQty = +iter.next().value

  for (let i = 0; i < childrenQty; i += 1) {
    children = [...children, process(iter)]
  }

  for (let i = 0; i < metadataQty; i += 1) {
    pointers = [...pointers, +iter.next().value]
  }

  if (children.length < 1) return pointers.reduce((a, c) => a + c, 0)

  pointers = pointers.filter(v => v <= childrenQty)

  if (pointers.length < 1) return 0

  console.log(name, children, pointers)

  return pointers.reduce((a, c) => a + children[c - 1], 0)
}

const iter = iterate(input)
const tree = process(iter)

console.log(tree)
