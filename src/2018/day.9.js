import { readFileSync } from 'fs'

const input = readFileSync('./input/day.9.input.txt', 'utf-8')

const parseInput = input => {
  const re = /(?<players>\d+) players; last marble is worth (?<n>\d+) points/gm
  return { ...re.exec(input).groups }
}

const rotatePlayers = function*(players) {
  while (true) {
    for (let i = 0; i < players; i += 1) yield i
  }
}

const iterMarbles = function*(n) {
  for (let i = 0; i <= n; i += 1) yield i
}

const iterTurns = function*(rotation, marbles) {
  for (let marble of marbles) {
    const player = rotation.next().value
    yield { player, marble }
  }
}

const { players, n } = parseInput(input)

// PART 1
// = 375465

class Node {
  constructor(left, right, value) {
    this.left = left
    this.right = right
    this.value = value
  }
}

const right1 = node => node.right
const left6 = node => node.left.left.left.left.left.left
const left7 = node => left6(node).left

const addRight = value => node => {
  const newNode = new Node(node, node.right, value)
  node.right.left = newNode
  node.right = newNode
  return newNode
}

const removeLeft = node => {
  node.left = node.left.left
  node.left.right = node
  return node
}

const scoringTurn = node => [left6, removeLeft].reduce((n, f) => f(n), node)
const normalTurn = node => value =>
  [right1, addRight(value)].reduce((n, f) => f(n), node)

const runGame = (players, n) => {
  const turns = iterTurns(rotatePlayers(players), iterMarbles(n))
  const scores = Array.from({ length: players }, () => 0)

  turns.next()

  let current = new Node(null, null, 0)
  current.right = current
  current.left = current

  for (let { player, marble } of turns) {
    if (marble % 23 === 0) {
      scores[player] += marble + left7(current).value
      current = scoringTurn(current)
    } else {
      current = normalTurn(current)(marble)
    }
  }

  return scores
}

// const scores = runGame(players, n)
// const largest = Math.max(...scores)
// console.log(largest)

// PART 2
// = 3037741441

const scores = runGame(players, n * 100)
const largest = Math.max(...scores)
console.log(largest)
