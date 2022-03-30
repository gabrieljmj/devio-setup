const fs = require('fs');
const path = require('path');

module.exports.hasInitializedGit = function hasInitializedGit() {
  const filePath = path.join(process.cwd(), '.git');

  return fs.existsSync(filePath);
};
