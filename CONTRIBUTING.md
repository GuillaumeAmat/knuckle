# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_ series
[How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1. Fork and clone the repo
2. `$ npm install` to install dependencies
3. Create a branch for your PR

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream https://github.com/GuillaumeAmat/knuckle.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream,"
> Then fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`.
> Then you can make all of your pull request branches based on this `master`
> branch. Whenever you want to update your version of `master`, do a regular
> `git pull`.

## Add yourself as a contributor

This project follows the [all contributors][all-contributors] specification.
To add yourself to the table of contributors on the `README.md`, please use the
automated script as part of your PR:

```console
npm run contributor:add <github-account-name> <contribution-task>,<contribution-task>,...
```

### contribution-task list:

- blog: 📝
- bug: 🐛
- code: 💻
- design: 🎨
- doc: 📖
- eventOrganizing: 📋
- example: 💡
- financial: 💵
- fundingFinding: 🔍
- ideas: 🤔
- infra: 🚇
- platform: 📦
- plugin: 🔌
- question: 💬
- review: 👀
- talk: 📢
- test: ⚠️
- tool: 🔧
- translation: 🌍
- tutorial: ✅
- video: 📹

Follow the prompt and commit `.all-contributorsrc` and `README.md` in the PR.
If you've already added yourself to the list and are making
a new type of contribution, you can run it again and select the added
contribution type.

## Committing and Pushing changes

This project uses [`semantic-release`][semantic-release] to do automatic
releases and generate a changelog based on the commit history. So we follow
[a convention][convention] for commit messages. You don't have to follow this
convention if you don't want to. Just know that when we merge your commit, we'll
probably use "Squash and Merge" so we can change the commit message :)

Please make sure to run the tests before you commit your changes. You can run
`npm run test:update` which will update any snapshots that need updating.
Make sure to include those changes (if they exist) in your commit.

### git hooks

There are git hooks set up with this project that are automatically installed
when you install dependencies. They're really handy.

One of the things that the git hooks does is automatically format the files you
change. It does this by reformating the entire file and running `git add` on
the file after. This breaks workflows where you're trying to commit portions of
the file only. You can always run your commit with `--no-verify`.

## Making a release

```sh
$ npm version patch -m "chore: release %s"
$ npm publish
```

`npm version` tests the code and build it. Then it upgrades the package version number according to the used keyword (patch, minor or major) and commit the modifications in Git (with a proper version tag). Finally, it pushes it to repository with the tag.

## Help needed

Please checkout the [the open issues][issues]

Also, please watch the repo and respond to questions/bug reports/feature
requests! Thanks!

[egghead]: https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github
[semantic-release]: https://npmjs.com/package/semantic-release
[convention]: https://github.com/marionebl/commitlint/tree/788bb80fe29628a02fa79ff98a81ec095db70ebf/%40commitlint/config-conventional
[all-contributors]: https://github.com/kentcdodds/all-contributors
[issues]: https://github.com/GuillaumeAmat/knuckle/issues
