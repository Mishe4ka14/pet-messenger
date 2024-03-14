/* eslint-disable */

function getLocalStorage<T>(key: string): T | null {
  try {
    const storedItem = localStorage.getItem(key);
    if (storedItem) {
      return JSON.parse(storedItem) as T;
    }
    return null;
  } catch (error) {
    console.error(`Failed to parse item from localStorage for key: ${key}`, error);
    return null;
  }
}

export default getLocalStorage;
