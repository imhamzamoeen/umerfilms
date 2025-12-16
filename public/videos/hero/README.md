# Hero Showreel Video

This directory contains the hero showreel video displayed on the homepage.

## Required Files

1. `showreel.webm` - Hero video in WebM format (VP9 codec, smaller file size)
2. `showreel.mp4` - Hero video in MP4 format (H.264 codec, better compatibility)
3. `showreel-poster.jpg` - Poster/thumbnail image (displayed before video loads)

**Note:** The VideoPlayer component automatically serves both formats, allowing the browser to choose the most efficient one.

## Video Specifications

- **Duration:** 10-15 seconds (looping)
- **Resolution:** 1920x1080 (1080p) or 1280x720 (720p)
- **File Size:** <5MB (optimized for web)
- **Format:** MP4 (H.264 codec)
- **Aspect Ratio:** 16:9
- **Bitrate:** 3000-5000 kbps (video), 128 kbps (audio if included)

## Poster Image Specifications

- **Format:** JPG or PNG
- **Resolution:** 1920x1080 (same as video)
- **File Size:** <500KB
- **Aspect Ratio:** 16:9

## Usage

The hero video:
- Autoplays muted on page load
- Loops continuously
- Can be unmuted via button in bottom-right
- Fills full viewport height (100vh)
- Uses object-fit: cover for responsive scaling

## Optimization Tips

Use FFmpeg to optimize videos:

**Generate MP4 (H.264):**
\`\`\`bash
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -vf scale=1920:1080 -an showreel.mp4
\`\`\`

**Generate WebM (VP9) - typically 30-50% smaller:**
\`\`\`bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1920:1080 -an showreel.webm
\`\`\`

**Generate poster image from video:**
\`\`\`bash
ffmpeg -i showreel.mp4 -ss 00:00:01 -vframes 1 showreel-poster.jpg
\`\`\`
