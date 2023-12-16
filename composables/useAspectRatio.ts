export const useAspectRatio = (
  originalSize: ImageSize,
  containerSize?: ImageSize
): ImageSize => {
  if (!containerSize) {
    return originalSize;
  }

  const widthScale = containerSize.width / originalSize.width;
  const heightScale = containerSize.height / originalSize.height;

  // Use the smaller scaling factor to maintain the aspect ratio
  const scale = Math.min(widthScale, heightScale);

  // Apply the scaled dimensions to the image
  const scaledWidth = containerSize.width * scale;
  const scaledHeight = containerSize.height * scale;

  return { width: scaledWidth, height: scaledHeight };
};
