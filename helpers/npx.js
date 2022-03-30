const { execCommand } = require('./exec-command');

module.exports.installNpxPackage = function installNpxPackage(packageName) {
  const args = ['install-peerdeps', '--dev', packageName];
  const command = 'npx';

  return execCommand(command, args);
}
