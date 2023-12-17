# SimplePosty
##### Create beautiful social media image with just a few clicks for free.

#### Features
##### A. Google Authentication using Supabase
##### B. Image generator 
1. Change background
    - Color
    - Gradient
    - Image
        - Random using API (keyword)
        - Upload file from local
2. Option to enter text
    - Title
    - Description
3. Text color & Font size
4. Platform specific image sizes
    - Facebook
    - X
    - Instagram
    - Linkedin
    - Pinterest
    - Youtube
5. Download image
6. Save configuration (only for color and gradients for now)

### Todo
[ ] Add Pexels API as image provider.
[ ] Text to image for background.
[ ] Support for image background in saved configurations.
[ ] Aspect ratio issue.
[ ] Card type selection
    [ ] Style (Gradient, Glassy, with image, With icon, Border styles)
    [ ] Dark/light mode

### Local Setup
1. Clone the repo
2. Run `pnpm install`
3. Copy and rename .env.example to .env. Setup Supabase account on [Supabase](https://supabase.com/)
  ```
    SUPABASE_URL=
    SUPABASE_KEY=
```
3. Run `pnpm run dev`

### Deploy for production
Nuxt is superflexible regarding deployment. Refer https://nuxt.com/deploy for deployment options.
