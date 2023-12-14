export const useFetchImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    console.log(dataUrl);
    return dataUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
