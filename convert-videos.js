const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const dir = path.join(__dirname, 'public', 'videos');

const files = [
  { input: '100088-video-720.mp4',                                                                      outBase: '100088' },
  { input: 'mixkit-laptop-with-a-green-screen-slide-in-48285-hd-ready.mp4',                            outBase: 'mixkit-laptop' },
  { input: 'vecteezy_artificial-intelligence-a-i-technology-machine-learning_20060759.mov',             outBase: 'ai-tech' },
  { input: 'vecteezy_brain-circuit-digital-computer-graphic-background-ai_7237608.mov',                outBase: 'brain-circuit' },
  { input: 'vecteezy_isometric-desktop-computer-coding-programming-technology_22328336.mov',            outBase: 'isometric-desktop' },
];

function convertToMp4(file) {
  return new Promise((resolve, reject) => {
    const input  = path.join(dir, file.input);
    const output = path.join(dir, file.outBase + '-opt.mp4');
    console.log(`[MP4]  ${file.outBase} ...`);
    ffmpeg(input)
      .noAudio()
      .videoCodec('libx264')
      .outputOptions(['-crf 28', '-preset slow', '-movflags +faststart', '-vf scale=1280:-2'])
      .output(output)
      .on('end', () => {
        const size = Math.round(fs.statSync(output).size / (1024 * 1024) * 10) / 10;
        console.log(`[MP4]  ${file.outBase}-opt.mp4 → ${size} Mo ✓`);
        resolve();
      })
      .on('error', (err) => { console.error(`[MP4]  ${file.outBase} ERREUR:`, err.message); reject(err); })
      .run();
  });
}

function convertToWebm(file) {
  return new Promise((resolve, reject) => {
    const input  = path.join(dir, file.input);
    const output = path.join(dir, file.outBase + '-opt.webm');
    console.log(`[WEBM] ${file.outBase} ...`);
    ffmpeg(input)
      .noAudio()
      .videoCodec('libvpx-vp9')
      .outputOptions(['-crf 35', '-b:v 0', '-vf scale=1280:-2'])
      .output(output)
      .on('end', () => {
        const size = Math.round(fs.statSync(output).size / (1024 * 1024) * 10) / 10;
        console.log(`[WEBM] ${file.outBase}-opt.webm → ${size} Mo ✓`);
        resolve();
      })
      .on('error', (err) => { console.error(`[WEBM] ${file.outBase} ERREUR:`, err.message); reject(err); })
      .run();
  });
}

// Convertir séquentiellement pour ne pas surcharger le CPU
(async () => {
  console.log('=== Début conversion vidéos ===');
  for (const file of files) {
    await convertToMp4(file);
    await convertToWebm(file);
  }
  console.log('=== Toutes les conversions sont terminées ===');
})();
