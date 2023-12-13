export const useOrientation = (
  originalSize: ImageSize
): "landscape" | "portrait" | "square" => {
  if (originalSize.width > originalSize.height) {
    return "landscape";
  } else if (originalSize.width < originalSize.height) {
    return "portrait";
  } else {
    return "square";
  }
};
