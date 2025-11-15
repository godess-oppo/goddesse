// utils/api.ts
export const mockFetch = async <T>(data: T, min = 200, max = 1800): Promise<T> =>
  new Promise((res) => setTimeout(() => res(data), Math.floor(Math.random()*(max-min)+min)));
