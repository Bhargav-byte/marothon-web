# Marathon Web

A modern website with a white frame layout and Supabase integration for fetching header and background images.

## Features

- Clean white frame design
- Supabase integration for dynamic image loading
- Responsive layout
- Header images from Supabase storage
- Background images from Supabase storage

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Open `config.js`
2. Replace `YOUR_SUPABASE_URL` with your Supabase project URL
3. Replace `YOUR_SUPABASE_ANON_KEY` with your Supabase anonymous/public key

You can find these values in your Supabase project dashboard under Settings > API.

### 3. Set Up Supabase Storage Buckets

You need to create two storage buckets in your Supabase project:

1. **header-images** - For header images
2. **background-images** - For background images

#### Steps to create buckets:

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Click "New bucket"
4. Create a bucket named `header-images` (make it public)
5. Create another bucket named `background-images` (make it public)

#### Upload images:

1. Click on the bucket
2. Click "Upload file"
3. Upload your images

### 4. Run the Website

```bash
npm start
```

Or use any local server:
- Python: `python -m http.server 8000`
- Node: `npx serve .`
- VS Code: Use Live Server extension

## File Structure

```
marathon-web/
├── index.html          # Main HTML structure
├── styles.css          # Styling for white frame and layout
├── config.js           # Supabase configuration
├── app.js              # JavaScript for fetching images from Supabase
├── package.json        # Project dependencies
└── README.md           # This file
```

## Customization

- Modify `styles.css` to change the appearance
- Update `app.js` to change how images are fetched and displayed
- Adjust bucket names in `app.js` if you use different bucket names

## Notes

- Make sure your Supabase storage buckets are set to public
- The code fetches the most recent image from each bucket
- Header images are displayed in the header section
- Background images are applied as a subtle overlay on the white frame

