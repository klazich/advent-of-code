import { readFileSync } from 'fs'

const input = readFileSync('./input/day.3.input.txt', 'utf-8').split(/\r?\n/)

// PART 1
// = 111485

const parseClaim = claim => {
  const re = /#(?<id>\d+) @ (?<x>\d+),(?<y>\d+): (?<w>\d+)x(?<h>\d+)/
  const { id, x, y, w, h } = { ...re.exec(claim).groups }
  return { id, x: +x, y: +y, w: +w, h: +h }
}

const claimPoints = ({ x, y, w, h }) => {
  const xs = Array.from({ length: w }, (_, n) => x + n)
  const ys = Array.from({ length: h }, (_, n) => y + n)
  return ys.map(i => xs.map(j => `${i},${j}`)).flat()
}

const markPoints = points => counts => {
  for (let p of points) counts[p] = (counts[p] || 0) + 1
  return counts
}

const countOverlaps = counts => {
  let overlaps = 0
  for (let c of Object.values(counts)) if (c > 1) overlaps += 1
  return overlaps
}

const asPoints = input.map(parseClaim).map(claimPoints)
const counts = asPoints.reduce((a, c) => markPoints(c)(a), {})
const answer1 = countOverlaps(counts)

console.log(answer1)

// PART 2
// = 113

const intersectRect = r1 => r2 =>
  !(
    r2.x > r1.x + r1.w ||
    r2.x + r2.w < r1.x ||
    r2.y > r1.y + r1.h ||
    r2.y + r2.h < r1.y
  )

const noOverlap = claims =>
  claims[
    claims.findIndex((claim, i) =>
      claims.every((v, j) => (i === j ? true : !intersectRect(claim)(v)))
    )
  ]

const claims = input.map(parseClaim)
const answer2 = noOverlap(claims).id

console.log(answer2)
