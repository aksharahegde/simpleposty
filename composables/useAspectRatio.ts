export const useAspectRatio = (originalSize: ImageSize, containerSize?: ImageSize): ImageSize => {
  if (!containerSize) {
    return originalSize; // If no container size is specified, return the original size
  }

  const aspectRatio = originalSize.width / originalSize.height;

  // Calculate new dimensions based on container size while maintaining the aspect ratio
  const maxWidth = containerSize.width;
  const maxHeight = containerSize.height;

  let newWidth = maxWidth;
  let newHeight = maxWidth / aspectRatio;

  if (newHeight > maxHeight) {
    // If the calculated height exceeds the container height, adjust both height and width
    newHeight = maxHeight;
    newWidth = maxHeight * aspectRatio;
  }

  return {
    width: newWidth,
    height: newHeight,
  };
}