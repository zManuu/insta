function isNumber(input: string, allowDescendants = false): boolean {
  const regex = allowDescendants ? /^-?\d+(\.\d+)?$/ : /^-?\d+(\.\d+)?$/
  return regex.test(input)
}

export {
  isNumber
}
