export const truncate = (source: string, size: number) =>
  source.length > size ? source.slice(0, size - 1) + '…' : source;
