const BACKGROUND_TYPE_COLOR = "color";
const BACKGROUND_TYPE_GRADIENT = "gradient";
const BACKGROUND_TYPE_IMAGE = "photo";

const BACKGROUND_TYPES = [
  {
    value: BACKGROUND_TYPE_COLOR,
    label: "Color",
  },
  {
    value: BACKGROUND_TYPE_GRADIENT,
    label: "Gradient",
  },
  {
    value: BACKGROUND_TYPE_IMAGE,
    label: "Photo",
  },
];

const IMAGE_PROVIDERS = [
  {
    name: "Unsplash",
    id: "https://source.unsplash.com/1600x900/",
  },
];

export {
  BACKGROUND_TYPES,
  IMAGE_PROVIDERS,
  BACKGROUND_TYPE_COLOR,
  BACKGROUND_TYPE_GRADIENT,
  BACKGROUND_TYPE_IMAGE,
};
