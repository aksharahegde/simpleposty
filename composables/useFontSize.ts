export const useFontSize = (resizedSize: ImageSize): any => {
  const currentWidth = resizedSize.width;
  const currentHeight = resizedSize.width;

  // You can adjust this formula based on your requirements
  const newSize = Math.min(currentWidth, currentHeight) / 30;

  // Calculate font sizes using the scaling factor
  const headingFontSize = `${newSize}px`;
  const paragraphFontSize = `${newSize/1.5}px`;

  return {
    heading: {
      fontSize: headingFontSize,
    },
    paragraph: {
      fontSize: paragraphFontSize,
    }
  };
};
