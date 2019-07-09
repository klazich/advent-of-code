import md5 from 'md5'

const input = 'ffykfhsq'

// 2016
// Day 5: How About a Nice Game of Chess?
//  1. c6697b55
//  2. 8c35d1ab

// Part One

const genPassword = function*(init) {
  let i = 0
  while (true) {
    const msg = init + i
    const hash = md5(msg)
    if (hash.startsWith('00000')) yield [hash[5], hash[6]]
    i += 1
  }
}

const makePassword1 = init => length => {
  const iter = genPassword(init)
  let password = ''
  for (let i = 0; i < length; i += 1) password += iter.next().value[0]
  return password
}

// console.log(makePassword1(input)(8))

// Part Two

const makePassword2 = init => length => {
  const iter = genPassword(init)
  let password = Array(length).fill('*')

  while (password.includes('*')) {
    const [pos, v] = iter.next().value
    if (/\d/.test(pos) && password[+pos] === '*' && +pos < length) {
      password[+pos] = v
      console.log(password)
    }
  }
  return password.join``
}

console.log(makePassword2(input)(8))
