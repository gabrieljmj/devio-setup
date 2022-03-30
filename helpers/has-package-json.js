const fs = require('fs');
const path = require('path');

module.exports.hasPackageJsonExists = function hasPackageJsonExists() {
  const filePath = path.join(process.cwd(), 'package.json');

  return fs.existsSync(filePath);
}
