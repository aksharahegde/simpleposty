export const useRandomValue = (array: any[]) => {
  if (!Array.isArray(array) || array.length === 0) {
    console.error("Invalid array provided");
    return;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
