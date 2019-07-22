import { readFileSync } from 'fs'

const INPUT = readFileSync('./input/2018/day.24.input.txt', 'utf-8')

// 2018
// Day 24: Immune System Simulator 20XX
//  1.
//  2.

// Damage Types: bludgeoning, slashing, fire, cold, radiation
const BLG = 'bludgeoning'
const SLS = 'slashing'
const FIR = 'fire'
const CLD = 'cold'
const RAD = 'radiation'

const army = (
  units,
  hitPoints,
  attack,
  type,
  initiative,
  immune,
  weakness
) => ({ units, hitPoints, attack, type, initiative, immune, weakness })

const IMMUNE_SYSTEM = [
  army(790, 3941, 48, BLG, 5, [], []),
  army(624, 2987, 46, BLG, 16, [], []),
  army(5724, 9633, 16, SLS, 9, [BLG, SLS, FIR], []),
  army(1033, 10664, 89, SLS, 1, [], []),
  army(6691, 9773, 13, BLG, 12, [], [SLS]),
  army(325, 11916, 276, SLS, 8, [], [BLG]),
  army(1517, 6424, 35, BLG, 13, [], []),
  army(1368, 9039, 53, SLS, 4, [BLG], []),
  army(3712, 5377, 14, SLS, 14, [CLD, RAD], [FIR]),
  army(3165, 8703, 26, RAD, 11, [], [SLS, BLG]),
]

const INFECTION = [
  army(1113, 44169, 57, FIR, 7, [BLG], [RAD]),
  army(3949, 20615, 9, BLG, 6, [], [RAD, CLD]),
  army(602, 35167, 93, RAD, 20, [BLG, CLD], [FIR]),
  army(1209, 34572, 55, BLG, 3, [], []),
  army(902, 12983, 28, FIR, 19, [FIR], []),
  army(1132, 51353, 66, RAD, 15, [], []),
  army(7966, 49894, 9, CLD, 10, [BLG], []),
  army(3471, 18326, 8, FIR, 18, [], [RAD]),
  army(110, 38473, 640, SLS, 2, [FIR], [BLG]),
  army(713, 42679, 102, BLG, 17, [], [SLS]),
]
