export const generateId = (): string =>
  `f${(~~(Math.random() * 1e8)).toString(16)}`;
