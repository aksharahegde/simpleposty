const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const useRandomGradient = (numberOfColors: number): any => {
  if (numberOfColors < 2 || numberOfColors > 3) {
    console.error(
      "Invalid number of colors provided. Number of colors must be 2 or 3."
    );
    return;
  }

  let colors = [];
  for (let i = 0; i < numberOfColors; i++) {
    colors.push(getRandomColor());
  }

  const [from, via, to] = colors;
  if (numberOfColors === 2) {
    return { from, to: via || to };
  }
  return { from, via, to };
};
