export function generateCPF(withMask = true): string {
  const randomDigits = (): number => Math.floor(Math.random() * 9);

  const cpf = Array.from({ length: 9 }, randomDigits);

  const calcDigit = (base: number[]) => {
    const sum = base.reduce((acc, curr, index) => acc + curr * ((base.length + 1) - index), 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calcDigit(cpf);
  const digit2 = calcDigit([...cpf, digit1]);

  const fullCpf = [...cpf, digit1, digit2];

  if (!withMask) return fullCpf.join('');

  return `${fullCpf.slice(0, 3).join('')}${fullCpf.slice(3, 6).join('')}${fullCpf.slice(6, 9).join('')}${fullCpf.slice(9).join('')}`;
}
