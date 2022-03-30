const fs = require('fs');
const path = require('path');
const rd = require('rd');
const { fileURLToPath } = require('url');

const dirname = path.dirname(__filename);

module.exports.copyTemplate = function copyTemplate(templateName) {
  const templatePath = path.join(dirname, '..', 'templates', templateName);
  const targetPath = path.join(process.cwd());

  return new Promise((resolve, reject) => {
    rd.eachFileFilterSync(templatePath, /.*$/, (f, s) => {
      if (s === 1) {
        return;
      }

      const targetFile = path.join(targetPath, f.replace(templatePath, ''));

      if (fs.existsSync(targetFile)) {
        fs.unlinkSync(targetFile);
      }

      fs.copyFileSync(f, targetFile);
    });

    resolve();
  });
}
