const spawn = require('cross-spawn');

module.exports.execCommand = function execCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    });

    child.on('close', code => {
      if (code !== 0) {
        reject(new Error({ command: `${command} ${args.join(' ')}` }));
        return;
      }
      resolve();
    });
  });
}
