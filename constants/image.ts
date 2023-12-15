const SOCIAL_MEDIA_IMAGE_SIZES: any = {
  x: {
    // profile_picture: { width: 400, height: 400 },
    post: { width: 1200, height: 675 },
    banner: { width: 1500, height: 500 },
  },
  linkedin: {
    banner: { width: 1584, height: 396 },
    post: { width: 1200, height: 627 },
  },
  facebook: {
    // profile_picture: { width: 180, height: 180 },
    cover_photo: { width: 820, height: 312 },
    shared_image: { width: 1200, height: 630 },
    shared_link: { width: 1200, height: 627 },
    highlighted_image: { width: 1200, height: 717 },
  },
  instagram: {
    // profile_picture: { width: 110, height: 110 },
    // photo_thumbnails: { width: 161, height: 161 },
    post: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
  },

  pinterest: {
    // profile_picture: { width: 165, height: 165 },
    pin_size: { width: 1000, height: 1500 },
  },
  youtube: {
    channel_profile_picture: { width: 800, height: 800 },
    channel_art: { width: 2560, height: 1440 },
    video_thumbnail: { width: 1280, height: 720 },
  },
};

const IMAGE_TYPES = ["basic"];

const ORIENTATION_IMAGE_SIZES: any = {
  landscape: {
    width: "100%",
    height: "600px",
  },
  portrait: {
    width: "600px",
    height: "800px",
  },
  square: {
    width: "600px",
    height: "600px",
  },
};

const GRADIENT_TYPES = ["linear", "radial", "conic"];

const IMAGE_PROVIDERS = [
  {
    name: "Unsplash",
    id: "https://source.unsplash.com/1600x900/",
  },
];

export {
  SOCIAL_MEDIA_IMAGE_SIZES,
  IMAGE_TYPES,
  ORIENTATION_IMAGE_SIZES,
  GRADIENT_TYPES,
  IMAGE_PROVIDERS,
};
