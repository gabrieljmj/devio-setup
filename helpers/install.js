const { execCommand } = require('./exec-command');

function getYarnArgs(packages, isDev = true) {
  const args = ['add'];

  if (isDev) {
    args.push('-D');
  }

  args.push(...packages);

  return args;
}

function getNpmArgs(packages, isDev = true) {
  const args = ['install'];

  if (isDev) {
    args.push('-D');
  }

  args.push(...packages);

  return args;
}

module.exports.installPackages = function installPackages(packageManager, packages, isDev = true) {
  const command = packageManager;
  let args = [];

  if (packageManager === 'yarn') {
    args = getYarnArgs(packages, isDev);
  } else if (packageManager === 'npm') {
    args = getNpmArgs(packages, isDev);
  }

  return execCommand(command, args);
}
