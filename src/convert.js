const sharp = require('sharp');
const fs = require('fs');
const directory = '../public/config/images';

fs.readdirSync(directory).forEach(file => {
  sharp(`${directory}/${file}`)
    // .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .resize({width: 1024}) // width, height
    .webp({ lossless: true })
    .toFile(`${directory}/converted/${file}-large`);
  });