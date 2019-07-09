import { readFileSync } from 'fs'

const input = readFileSync('./input/day.4.input.txt', 'utf-8').split(/\r?\n/)

// PART 1
// = 106710

const parseEntry = entry => {
  const reTime = /\[(?<year>\d\d\d\d)-(?<month>\d\d)-(?<day>\d\d) (?<hour>\d\d):(?<min>\d\d)\] (?<value>.*)/
  const { month, day, hour, min } = {
    ...reTime.exec(entry).groups,
  }

  const code = month + day + hour + min
  const date = month + day

  const hasGuard = /#(\d+)/.exec(entry)
  return hasGuard ? { code, guard: hasGuard[1] } : { code, date, min }
}

const sortEntries = entries => entries.sort((a, b) => a.code - b.code)

function* groupIntervals(entries) {
  let interval = []
  for (let { guard, date, min } of entries) {
    if (guard) {
      yield { guard }
      continue
    }
    interval = [...interval, +min]
    if (interval.length === 2) {
      yield { interval }
      interval = []
    }
  }
}

function* groupDayGuards(entries) {
  let token = {}
  for (let { guard, interval } of entries) {
    if (guard) {
      if (token.id) yield token
      token = { id: guard, log: [] }
      continue
    }
    token.log = [...token.log, interval]
  }
}

const graphLogs = entries =>
  entries.map(({ id, log }) => ({
    id,
    log: log.reduce(
      (a, [x, y]) => a.map((v, i) => (i >= x && i < y ? 1 : v)),
      Array.from({ length: 60 }, () => 0)
    ),
    total: log.reduce((a, [x, y]) => a + Math.abs(x - y), 0),
  }))

const groupGuardLogs = entries =>
  entries.reduce(
    (a, { id, log, total }) =>
      a[id]
        ? {
            ...a,
            [id]: {
              log: a[id].log.map((v, i) => v + log[i]),
              total: a[id].total + total,
            },
          }
        : { ...a, [id]: { log, total } },
    {}
  )

const mostSlept = grouped =>
  Object.entries(grouped).reduce(
    (a, [id, { log, total }]) =>
      total > a.max
        ? {
            entry: { id, log, total },
            max: total,
          }
        : a,
    { max: 0 }
  ).entry

const parsed = sortEntries(input.map(parseEntry))
const intervals = [...groupIntervals(parsed)]
const groupedDay = [...groupDayGuards(intervals)]
const graphs = graphLogs(groupedDay)
const grouped = groupGuardLogs(graphs)
const sleepyHead = mostSlept(grouped)
const maxSleptMin = sleepyHead.log.reduce(
  (a, c, i) => (c > a.max ? { max: c, index: i } : a),
  { max: 0 }
).index

console.log(+sleepyHead.id * +maxSleptMin)

// Part 2
// = 10491

const minMostSlept = grouped =>
  Object.entries(grouped).map(([id, { log }]) => ({
    id,
    max: log.reduce((a, c, i) => (c > a[1] ? [i, c] : a), [null, 0]),
  }))

const guardWithMostSleptMin = entries =>
  entries.reduce((a, c) => (c.max[1] > a[1] ? [c, c.max] : a), [null, 0])

const groupedMinMostSlept = minMostSlept(grouped)
const [sleepGuard] = guardWithMostSleptMin(groupedMinMostSlept)

console.log(+sleepGuard.id * sleepGuard.max[0])
