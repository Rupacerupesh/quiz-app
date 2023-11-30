export const isValidColorCode = (color: string) => {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

  // Array of basic color names
  const basicColorNames = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown', 'pink', 'gray', 'black']

  // Regular expression for basic color names
  const basicColorNameRegex = new RegExp(`^(${basicColorNames.join('|')})$`, 'i')

  return hexRegex.test(color) || basicColorNameRegex.test(color)
}

export const isTextColorWhite = (color: string) =>
  color === '#fff' || color === '#ffffff' || color.toLowerCase() === 'white'
