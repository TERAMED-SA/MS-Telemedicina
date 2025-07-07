export function generateZipCode(): string {
  const part1 = Math.floor(Math.random() * 90000) + 10000; 
  const part2 = Math.floor(Math.random() * 900) + 100;
  return `${part1}-${part2}`;
}