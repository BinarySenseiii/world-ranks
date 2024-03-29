export const formatNumberWithThousandSeparator = (value: string | number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const addEllipsis = (word: string, length: number) =>
  word.length > length ? `${word.slice(0, length)}...` : word;

export const sleep = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
