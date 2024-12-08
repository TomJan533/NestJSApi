export function cleanName(name: string): string {
  return name.replace(/[\r\n\t]+/g, ' ').trim(); // Replace control chars with space, trim extra spaces
}
