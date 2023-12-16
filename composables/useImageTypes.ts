import { SOCIAL_MEDIA_IMAGE_SIZES } from "~/constants/image";

export const useImageTypes = (postSpecs: any) => {
    const selectedOption: string = postSpecs.platform;
    const aspectRatios = SOCIAL_MEDIA_IMAGE_SIZES[selectedOption];
    return Object.keys(aspectRatios).map((val) => {
      return {
        label: val.replaceAll("_", " "),
        value: val,
      };
    });
  };
  