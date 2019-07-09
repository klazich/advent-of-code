import { readFileSync } from 'fs'

const input = readFileSync('./input/2016/day.7.input.txt', 'utf-8')

// 2016
// Day 7: Internet Protocol Version 7
//  1. 105
//  2.

const parseInput = input => input.split(/\r?\n/g)

const RE1 = /(\w)(\w)\2\1/g
const RE2 = /\[[a-z]*?(\w)(\w)\2\1[a-z]*?\]/g

// Part One

const IPs = parseInput(input)
const IPsFilter1 = IPs.filter(ip => !RE2.test(ip))
const IPsFilter2 = IPsFilter1.filter(ip => RE1.test(ip))

// console.log(IPsFilter2.length)

// IPsFilter2.forEach(e => console.log(e))

// Part Two

const REsn = /(?:^|\])[a-z]+?(?:$|\[)/gm
const REhn = /\[[a-z]+?\]/gm
const REaba = /([a-z])(?!\1)[a-z]\1/g

const supernets = ip => ip.match(REsn)
const hypernets = ip => ip.match(REhn)
const aba = net => net.match(REaba)

const clean = x => x.map(s => s.replace(/\[|\]/g, ''))
const cleanABA = x => x.flat().filter(Boolean)

const extractABA = ip => ({
  supernets: cleanABA(clean(supernets(ip)).map(aba)),
  hypernets: cleanABA(clean(hypernets(ip)).map(aba)),
})

const abaMatch = ({ supernets, hypernets }) => ({
  supernets: supernets.reduce(
    (a, c) =>
      hypernets.some(s => s.includes(c[0]) && s.includes(c[1]) && s !== c)
        ? [...a, c]
        : a,
    []
  ),
  hypernets: hypernets.reduce(
    (a, c) =>
      supernets.some(s => s.includes(c[0]) && s.includes(c[1]) && s !== c)
        ? [...a, c]
        : a,
    []
  ),
})

const tokens = IPs.map(extractABA).filter(
  ({ supernets, hypernets }) => supernets.length > 0 && hypernets.length > 0
)
console.log(
  tokens
    .map(abaMatch)
    .filter(
      ({ supernets, hypernets }) => supernets.length > 0 && hypernets.length > 0
    )
)
