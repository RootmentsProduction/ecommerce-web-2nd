/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const videosDirectory = path.join(__dirname, '../public/videos');
const outputFile = path.join(__dirname, '../src/data/videos.json');

try {
  let videoFiles = [];
  if (fs.existsSync(videosDirectory)) {
    videoFiles = fs.readdirSync(videosDirectory)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        // Support common video formats, exclude system/hidden files
        return ['.mp4', '.webm', '.ogg', '.mov'].includes(ext) && !file.startsWith('.');
      })
      // Sort alphabetically/numerically
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  }

  // Ensure output directory exists
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write file list to JSON
  fs.writeFileSync(outputFile, JSON.stringify(videoFiles, null, 2));
  console.log(`[Reels Generator] Successfully cataloged ${videoFiles.length} videos into ${outputFile}`);
} catch (error) {
  console.error('[Reels Generator] Failed to generate videos list:', error);
  process.exit(1);
}
