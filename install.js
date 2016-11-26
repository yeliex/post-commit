'use strict';

//
// Compatibility with older node.js as path.exists got moved to `fs`.
//
var fs = require('fs')
  , path = require('path')
  , spawn = require('cross-spawn')
  , hook = path.join(__dirname, 'hook')
  , root = path.resolve(__dirname, '..', '..')
  , exists = fs.existsSync || path.existsSync;

//
// Gather the location of the possible hidden .git directory, the hooks
// directory which contains all git hooks and the absolute location of the
// `post-commit` file. The path needs to be absolute in order for the symlinking
// to work correctly.
//
var git = path.resolve(root, '.git')
  , hooks = path.resolve(git, 'hooks')
  , postcommit = path.resolve(hooks, 'post-commit');

//
// Bail out if we don't have an `.git` directory as the hooks will not get
// triggered. If we do have directory create a hooks folder if it doesn't exist.
//
if (!exists(git) || !fs.lstatSync(git).isDirectory()) return;
if (!exists(hooks)) fs.mkdirSync(hooks);

//
// If there's an existing `post-commit` hook we want to back it up instead of
// overriding it and losing it completely as it might contain something
// important.
//
if (exists(postcommit) && !fs.lstatSync(postcommit).isSymbolicLink()) {
  console.log('post-commit:');
  console.log('post-commit: Detected an existing git post-commit hook');
  fs.writeFileSync(postcommit +'.old', fs.readFileSync(postcommit));
  console.log('post-commit: Old post-commit hook backuped to post-commit.old');
  console.log('post-commit:');
}

//
// We cannot create a symlink over an existing file so make sure it's gone and
// finish the installation process.
//
try { fs.unlinkSync(postcommit); }
catch (e) {}

//
// It could be that we do not have rights to this folder which could cause the
// installation of this module to completely fail. We should just output the
// error instead destroying the whole npm install process.
//
try { fs.symlinkSync(path.relative(hooks, hook), postcommit, 'file'); }
catch (e) {
  console.error('post-commit:');
  console.error('post-commit: Failed to symlink the hook file in your .git/hooks folder because:');
  console.error('post-commit: '+ e.message);
  console.error('post-commit: The hook was not installed.');
  console.error('post-commit:');
}
