export const setStorageItem = (key: string, value: unknown): void => {
  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
};

export const getStorageitem = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    console.error("Error getting item in localStorage:", error);
  }
};

export const removeStorageItem = (key: string) =>{
    window.localStorage.removeItem(key);
}