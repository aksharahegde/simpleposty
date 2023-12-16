export const usePostStyle = async (postData: any) => {
  if (postData.backgroundType === "color") {
    return {
      "background-color": postData.bgColor,
      color: postData.textColor,
    };
  } else if (postData.backgroundType === "gradient") {
    return {
      background: postData.gradient,
      color: postData.textColor,
    };
  } else {
    if (!postData.bgImage) {
      postData.bgImage = await useFetchImage(
        "https://source.unsplash.com/1600x900/?black"
      );
    }
    return {
      "background-image": `url(${postData.bgImage})`,
      "background-size": "cover",
      "background-repeat": "no-repeat",
      "background-position": "center",
    };
  }
};
