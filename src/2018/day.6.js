import { readFileSync } from 'fs'

const input = readFileSync('./input/day.6.input.txt', 'utf-8')

// PART 1
// = 4887

const parseInput = input =>
  input.split('\n').map(e => e.split(', ').map(c => +c))

const labelCentroids = centroids =>
  centroids.map((centroid, label) => ({ label, centroid }))

const manhattanDistance = a => b => {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  return Math.abs(dx) + Math.abs(dy)
}

const closestToPoint = distFn => centroids => point => {
  const distanceTo = distFn(point)
  return centroids.reduce(
    (a, { label, centroid }) => {
      const dist = distanceTo(centroid)
      return dist < a[0]
        ? [dist, [label]]
        : dist === a[0]
        ? [dist, [...a[1], label]]
        : a
    },
    [Infinity]
  )[1]
}

const maxX = centroids => Math.max(...centroids.map(([x]) => x))
const maxY = centroids => Math.max(...centroids.map(([, y]) => y))

const makeArea = centroids => {
  const arr = centroids.map(e => e.centroid || e)
  const X = maxX(arr)
  const Y = maxY(arr)
  return Array.from({ length: Y }, (_, i) =>
    Array.from({ length: X }, (_, j) => ({
      point: [j, i],
      centroid: null,
    }))
  ).flat()
}

const markPoints = area => closestFn => {
  for (let i in area) {
    const point = area[i]
    const closest = closestFn(point.point)
    point.centroid = closest.length === 1 ? closest[0] : null
    area[i] = point
  }
  return area
}

const disregardBlocks = area => centroids => {
  const X = maxX(centroids)
  const Y = maxY(centroids)
  const borders = area.filter(
    ({ point: [x, y] }) => x === 0 || x === X || y === 0 || y === Y
  )
  let infinites = new Set()
  for (let { centroid } of borders) if (centroid) infinites.add(centroid)
  return [...Array.from(infinites), null]
}

const stripArea = disregard => area =>
  area
    .map(({ centroid }) => centroid)
    .filter(centroid => !disregard.includes(centroid))

const countCentroids = area =>
  area.reduce(
    (a, c) => ({
      ...a,
      [c]: (a[c] || 0) + 1,
    }),
    {}
  )

const maxCount = counted =>
  Object.values(counted).reduce((a, c) => (c > a ? c : a), 0)

const centroidsInit = parseInput(input)
const centroidsLabeled = labelCentroids(centroidsInit)

const closestManhattanDistance = closestToPoint(manhattanDistance)
const closestCentroid = closestManhattanDistance(centroidsLabeled)

// const areaInit = makeArea(centroidsLabeled)
// const areaMarked = markPoints(areaInit)(closestCentroid)

// const centroidsDisregard = disregardBlocks(areaMarked)(centroidsLabeled)
// const areaStripped = stripArea(centroidsDisregard)(areaMarked)

// const counts = countCentroids(areaStripped)
// const maxArea = maxCount(counts)

// console.log(maxArea)

// PART 2
// = 34096

const MAX = 10000

const sumDistances = distFn => centroids => point => {
  const distanceTo = distFn(point)
  return centroids.reduce((a, c) => a + distanceTo(c), 0)
}

const safeAreaSize = max => area => sumFn => {
  let size = 0
  for (let i in area) {
    const { point } = area[i]
    const sum = sumFn(point)
    if (sum < max) size += 1
  }
  return size
}

const sumManhattanDistances = sumDistances(manhattanDistance)
const sumCentroidDistances = sumManhattanDistances(centroidsInit)

const areaInit = makeArea(centroidsInit)
const size = safeAreaSize(MAX)(areaInit)(sumCentroidDistances)

console.log(size)
