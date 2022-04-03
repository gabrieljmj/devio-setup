#!/usr/bin/env node

const Commander = require('commander');
const chalk = require('chalk');
const { copyTemplate } = require('./helpers/copy-template');
const { getPkgManager } = require('./helpers/get-pkg-manager');
const { installPackages } = require('./helpers/install');
const { installNpxPackage } = require('./helpers/npx');
const { hasPackageJsonExists } = require('./helpers/has-package-json');
const { runPackageScript } = require('./helpers/run-package-script');
const packageJson = require('./package.json');
const { hasInitializedGit } = require('./helpers/git-initialized');

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .option('--jsx', 'Initialize as a JSX project.')
  .option('--use-npm', 'Use NPM by default.')
  .option('--use-yarn', 'Use Yarn by default.')
  .parse(process.argv);

function getHuskyCommitLintCommand(packageManager) {
  const commandRunPrefix = packageManager === 'yarn' ? 'yarn' : 'npm run';

  return `${commandRunPrefix} commitlint --edit $1`;
}

async function run(isJsxProject, defaultPackageManager) {
  const packageJsonExists = hasPackageJsonExists();
  const hasGit = hasInitializedGit();

  if (!packageJsonExists) {
    throw new Error('No package.json found. Exiting.');
  }

  if (!hasGit) {
    throw new Error('No git repository found. Exiting.');
  }

  const packageManager = defaultPackageManager || getPkgManager();
  const dependencies = [
    'typescript',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    '@commitlint/config-conventional',
    '@commitlint/cli',
    'husky',
  ];

  if (isJsxProject) {
    dependencies.push('@types/react');
  }

  console.log(chalk.cyan('Installing dependencies...'));
  console.log(chalk.grey('Using package manager:', packageManager));
  console.log();

  const template = isJsxProject ? 'jsx' : 'default';
  await copyTemplate(template);

  await installNpxPackage('eslint-config-airbnb');
  await installPackages(packageManager, dependencies, true);

  await runPackageScript(packageManager, 'husky', ['install']);
  await runPackageScript(packageManager, 'husky', [
    'add',
    '.husky/commit-msg',
    getHuskyCommitLintCommand(packageManager),
  ]);
}

const opts = program.opts();
const isJsxProject = opts.jsx;
let defaultPackageManager;

if (opts.useNpm || opts.useYarn) {
  defaultPackageManager = opts.useNpm ? 'npm' : 'yarn';
}

run(isJsxProject, defaultPackageManager)
  .then(() => {
    console.log();
    console.log(chalk.green('Done!'));
  })
  .catch(err => console.log(chalk.red(`Error: ${err.message}`)));
