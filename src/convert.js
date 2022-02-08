const sharp = require('sharp');
const fs = require('fs');
const directory = '../public/config/images';

fs.readdirSync(directory).forEach(file => {
  sharp(`${directory}/${file}`)
    // .flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } })
    //small 480 large 1024
    .resize({width: 480}) // width, height
    .webp({ lossless: true })
    .toFile(`${directory}/converted/${file}-small`);
  });

// const toApng = require('gif-to-apng')
 
// toApng('loadingpage2.gif')
//   .then(() => console.log('Done 🎉'))
//   .catch(error => console.log('Something went wrong 💀', error))