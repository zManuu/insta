function isNumber(input: string, allowDescendants = false): boolean {
  const regex = allowDescendants ? /^-?\d+(\.\d+)?$/ : /^-?\d+(\.\d+)?$/
  return regex.test(input)
}

function toLevel(input: boolean) {
  return input
    ? 1
    : -1
}

export {
  isNumber,
  toLevel
}
