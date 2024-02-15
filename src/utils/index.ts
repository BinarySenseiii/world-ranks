export function formatNumberWithThousandSeparator(value: string | number) {
  const userValue = typeof value === 'number' ? value : Number(value);
  return userValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
