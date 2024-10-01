export const getUniqueValues = <T, K extends keyof T>(items: T[], field: K) => {
  const uniqueValues = new Set<string>();
  items.forEach((item) => {
    uniqueValues.add(String(item[field]));
  });
  return Array.from(uniqueValues);
};
