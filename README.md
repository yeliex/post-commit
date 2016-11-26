# post-commit

[![Version npm][version]](http://browsenpm.org/package/post-commit)[![Build Status][build]](https://travis-ci.org/yeliex/post-commit)[![Dependencies][david]](https://david-dm.org/yeliex/post-commit)[![Coverage Status][cover]](https://coveralls.io/r/yeliex/post-commit?branch=master)

[version]: http://img.shields.io/npm/v/post-commit.svg?style=flat-square
[build]: http://img.shields.io/travis/yeliex/post-commit/master.svg?style=flat-square
[david]: https://img.shields.io/david/yeliex/post-commit.svg?style=flat-square
[cover]: http://img.shields.io/coveralls/yeliex/post-commit/master.svg?style=flat-square

**post-commit** is a post-commit hook installer for `git`. This all conveniently configured in your `package.json`.

### Installation

It's advised to install the **post-commit** module as a `devDependencies` in your
`package.json` as you only need this for development purposes. To install the
module simply run:

```
npm install --save-dev post-commit
```

To install it as `devDependency`. When this module is installed it will override
the existing `post-commit` file in your `.git/hooks` folder. Existing
`post-commit` hooks will be backed up as `post-commit.old` in the same repository.

### Configuration

`post-commit` will not run any command by default;

`post-commit` is capable of running every other script that you've
specified in your `package.json` "scripts" field. So after people commit you
could ensure that:

- Publish to release.
- Make a notification.

The only thing you need to do is add a `post-commit` array to your `package.json`
that specifies which scripts you want to have ran and in which order:

```js
{
  "name": "437464d0899504fb6b7b",
  "version": "0.0.0",
  "description": "ERROR: No README.md file found!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: I SHOULD FAIL LOLOLOLOLOL \" && exit 1",
    "foo": "echo \"fooo\" && exit 0",
    "bar": "echo \"bar\" && exit 0"
  },
  "post-commit": [
    "foo",
    "bar",
    "test"
  ]
}
```

In the example above, it will first run: `npm run foo` then `npm run bar` and
finally `npm run test` but will not make the commit fail as it returns the error
code `1` because the hook would run after commit success.  If you prefer strings over arrays or `postcommit` without a middle
dash, that also works:

```js
{
  "postcommit": "foo, bar, test"
  "post-commit": "foo, bar, test"
  "post-commit": ["foo", "bar", "test"]
  "postcommit": ["foo", "bar", "test"],
  "postcommit": {
    "run": "foo, bar, test",
  },
  "post-commit": {
    "run": ["foo", "bar", "test"],
  },
  "postcommit": {
    "run": ["foo", "bar", "test"],
  },
  "post-commit": {
    "run": "foo, bar, test",
  }
}
```

The examples above are all the same. In addition to configuring which scripts
should be ran you can also configure the following options:

- **silent** Don't output the prefixed `post-commit:` messages when things fail
  or when we have nothing to run. Should be a boolean.
- **colors** Don't output colors when we write messages. Should be a boolean.

These options can either be added in the `post-commit`/`postcommit` object as keys
or as `"post-commit.{key}` key properties in the `package.json`:

```js
{
  "postcommit.silent": true,
  "post-commit": {
    "silent": true
  }
}
```

It's all the same. Different styles so use what matches your project. To learn
more about the scripts, please read the official `npm` documentation:

https://npmjs.org/doc/scripts.html

And to learn more about git hooks read:

http://githooks.com

### Forked
This project is forked from `pre-commit`(https://github.com/observing/pre-commit) and edit to fit `post-commit` as the first version.

## About Beta
This project is still in a very early version just for myself use.

Welcome PR to make it better.

### License

MIT
