const { execSync } = require('child_process');

module.exports.getPkgManager = function getPkgManager() {
  try {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
      if (userAgent.startsWith('yarn')) {
        return 'yarn';
      }
      if (userAgent.startsWith('pnpm')) {
        return 'pnpm';
      }
    }
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      return 'yarn';
    } catch {
      execSync('pnpm --version', { stdio: 'ignore' });
      return 'pnpm';
    }
  } catch {
    return 'npm';
  }
}
