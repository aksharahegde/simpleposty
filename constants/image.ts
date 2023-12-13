const SOCIAL_MEDIA_IMAGE_SIZES: any = {
  facebook: {
    profile_picture: { width: 180, height: 180 },
    cover_photo: { width: 820, height: 312 },
    shared_image: { width: 1200, height: 630 },
    shared_link: { width: 1200, height: 627 },
    highlighted_image: { width: 1200, height: 717 },
  },
  twitter: {
    profile_picture: { width: 400, height: 400 },
    header_image: { width: 1500, height: 500 },
    stream_image: { width: 1200, height: 675 },
  },
  instagram: {
    profile_picture: { width: 110, height: 110 },
    photo_thumbnails: { width: 161, height: 161 },
    photo_size: { width: 1080, height: 1080 },
    story_size: { width: 1080, height: 1920 },
  },
  linkedin: {
    personal_profile: {
      background_image: { width: 1584, height: 396 },
      profile_picture: { width: 400, height: 400 },
    },
    company_page: {
      logo: { width: 300, height: 300 },
      cover_image: { width: 1128, height: 191 },
    },
  },
  pinterest: {
    profile_picture: { width: 165, height: 165 },
    pin_size: { width: 1000, height: 1500 },
  },
  youtube: {
    channel_profile_picture: { width: 800, height: 800 },
    channel_art: { width: 2560, height: 1440 },
    video_thumbnail: { width: 1280, height: 720 },
  },
};

const IMAGE_TYPES = ['basic']

const ORIENTATION_IMAGE_SIZES: any = {
  landscape: {
    width: '100%',
    height: '600px',
  },
  portrait: {
    width: '600px',
    height: '800px',
  },
  square: {
    width: '600px',
    height: '600px',
  },
}

export { SOCIAL_MEDIA_IMAGE_SIZES, IMAGE_TYPES, ORIENTATION_IMAGE_SIZES };
