const INPUT = 1364

// 2016
// Day 13: A Maze of Twisty Little Cubicles
//  1. 86
//  2.

const eq = (x, y) => x * x + 3 * x + 2 * x * y + y + y * y + INPUT
const toBin = n => n.toString(2)
const countBits = str => str.replace(/0/g, '').length
const isOpen = (x, y) => countBits(toBin(eq(x, y))) % 2 === 0

const C = (x, y) => ({ x, y })

const GOAL = C(31, 39)

const manhattanDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
const distance = (a, b) => a.x - b.x + (a.y - b.y)

const leastValue = (open, map) => {
  let min = Infinity
  let co
  for (let c of open.values()) {
    const v = map.get(c) || Infinity
    if (v <= min) {
      min = v
      co = c
    }
  }
  return C(...co.split(' ').map(v => +v))
}

const adjacent = ({ x, y }) =>
  [C(x + 1, y), C(x, y + 1), C(x - 1, y), C(x, y - 1)].filter(
    ({ x, y }) => isOpen(x, y) && x >= 0 && y >= 0
  )

const reconstructPath = (cameFrom, current) => {
  let total = [current]
  while (cameFrom.has(S(current))) {
    current = cameFrom.get(S(current))
    total = [...total, current]
  }
  return total
}

const S = ({ x, y }) => `${x} ${y}`

const grid = Array.from({ length: 50 }, (_, y) =>
  Array.from({ length: 50 }, (_, x) => (isOpen(x, y) ? ' ' : '#'))
)

const aStar = (start, goal) => {
  // The set of nodes already evaluated
  let closedSet = new Set()

  // The set of currently discovered nodes that are not evaluated yet.
  // Initially, only the start node is known.
  let openSet = new Set([S(start)])

  // For each node, which node it can most efficiently be reached from.
  // If a node can be reached from many nodes, cameFrom will eventually contain the
  // most efficient previous step.
  let cameFrom = new Map()

  // For each node, the cost of getting from the start node to that node.
  let gScore = new Map() // with default value of Infinity

  // The cost of going from start to start is zero.
  gScore.set(S(start), 0)

  // For each node, the total cost of getting from the start node to the goal
  // by passing by that node. That value is partly known, partly heuristic.
  let fScore = new Map() // with default value of Infinity

  // For the first node, that value is completely heuristic.
  fScore.set(S(start), manhattanDistance(start, goal))

  while (openSet.size > 0) {
    let current = leastValue(openSet, fScore)

    if (S(current) === S(goal)) return reconstructPath(cameFrom, current)
    if (reconstructPath(cameFrom, current).length > 50) break

    openSet.delete(S(current))
    closedSet.add(S(current))

    for (let adj of adjacent(current)) {
      if (closedSet.has(S(adj))) continue // Ignore the neighbor which is already evaluated.

      // The distance from start to a neighbor
      let tentativeGScore = gScore.get(S(current)) + distance(current, adj)

      if (!openSet.has(S(adj))) openSet.add(S(adj))
      // Discover a new node
      else if (tentativeGScore >= gScore.get(S(adj))) continue

      // This path is the best until now. Record it!
      cameFrom.set(S(adj), current)
      gScore.set(S(adj), tentativeGScore)
      fScore.set(S(adj), gScore.get(S(adj)) + manhattanDistance(adj, goal))
    }
  }
}

// const result = aStar(C(1, 1), GOAL)
// result.forEach(({ x, y }) => (grid[y][x] = 'O'))
// console.log(grid.map(r => r.join('')).join('\n'))
// console.log(result.length)
// console.log(
//   grid
//     .map(r => r.join(''))
//     .join('')
//     .replace(/[ #X]/g, '').length
// )

// Part Two

const coords = Array.from({ length: 100 }, (_, y) =>
  Array.from({ length: 100 }, (_, x) => (isOpen(x, y) ? { x, y } : null))
)
  .flat()
  .filter(Boolean)

const set = new Set()
console.log(
  coords
    .map(c => {
      const path = aStar(C(1, 1), c) || [0]
      const length = path.length - 1
      if (path[0] !== 0) set.add(S(path.slice(0, 1)[0]))
      return [path.slice(0, 1)[0], length]
    })
    .filter(([p, l]) => l > 0)
)
console.log(set, set.size)
