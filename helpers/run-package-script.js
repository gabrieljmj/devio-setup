const { execCommand } = require('./exec-command');

module.exports.runPackageScript = function runPackageScript(packageManager, scriptName, extraArgs = []) {
  let command = packageManager;
  const args = [];

  if (packageManager === 'npm') {
    command = `./node_modules/.bin/${scriptName}`;
  } else {
    args.push(scriptName);
  }

  return execCommand(command, args.concat(extraArgs));
};
