[![License][license-image]][license-url]
[![NPM version][npm-version-image]][npm-version-url]
[![All Contributors][all-contributors-image]](#contributors)
[![code style: prettier][prettier-image]][prettier-url]
[![config: knuckle][knuckle-image]][knuckle-url]

[license-image]: https://img.shields.io/github/license/GuillaumeAmat/knuckle.svg?style=flat-square
[license-url]: https://github.com/GuillaumeAmat/knuckle/blob/master/LICENSE
[npm-version-image]: https://img.shields.io/npm/v/knuckle.svg?style=flat-square&colorB=yellow
[npm-version-url]: https://npm.im/knuckle
[all-contributors-image]: https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[knuckle-image]: https://img.shields.io/badge/config-knuckle-ff5c00.svg?style=flat-square
[knuckle-url]: https://github.com/GuillaumeAmat/knuckle
[cosmiconfig-url]: https://github.com/davidtheclark/cosmiconfig
[tslint-url]: https://github.com/palantir/tslint
[commitlint-url]: https://github.com/marionebl/commitlint
[stylelint-url]: https://github.com/stylelint/stylelint
[jest-url]: https://github.com/facebook/jest

# 👊 Knuckle

Knuckle is the link between your source code and your dev tools. It gives you the base configuration for your project, out of the box.

All you need to do is to call Knuckle and to ask him the smaller thing as possible. All the configuration and best practices are handled by him.

Let's say you want to format your code. You probably already use [Prettier][prettier-url] to do that but you had to create your own configuration file.

Instead, Knuckle only ask you path and action. That's it!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Default configurations](#default-configurations)
  - [Extend configurations](#extend-configurations)
- [Available tools](#available-tools)
  - [Tools versions](#tools-versions)
- [Badge](#badge)
- [Frequently Asked Questions](#frequently-asked-questions)
  - [Why generating the configuration files rather than hiding them?](#why-generating-the-configuration-files-rather-than-hiding-them)
  - [Why versionning the generated files?](#why-versionning-the-generated-files)
  - [Where is the .knuckle folder?](#where-is-the-knuckle-folder)
  - [Can I modify the generated files?](#can-i-modify-the-generated-files)
  - [Why not to use abstract commands?](#why-not-to-use-abstract-commands)
- [Contributors](#contributors)

## Installation

All the following steps have to only be ran once.

First, we install Knuckle:

```bash
$ npm install --save-dev knuckle
```

Then, we tell to Knuckle to handle some tools:

```bash
$ npx knuckle add prettier eslint lint-staged
```

Finally, Knuckle generates the related configurations at the root of your project:

```bash
$ npx knuckle up
```

Add the generated configuration files to your versionning system, like before, and your done!

It is really important to `knuckle up` every time you upgrade Knuckle or want to overwrite its default configurations.

In the early stages of Knuckle no files were created in your project. It seems handy at first but the big caveat is that your IDE can't see the tools configuration... More informations in the [FAQ section](#frequently-asked-questions).

## Usage

Now that all the configurations are available, all you need to do is to call the tools within Knuckle:

```bash
$ npx knuckle prettier 'src/**/*.{js,jsx,json}' --write
```

Of course, you can write your own NPM scripts with the same commands:

```json
"scripts": {
  "format": "knuckle prettier 'src/**/*.{js,jsx,json}' --write"
}
```

Under the hood, Knuckle calls the tools by adding some options in order to have the best usage of each tool.

### Default configurations

Knuckle dogfoods itself, so you can find all the default configurations at the root of the project:

```
knuckle
├── .eslintignore
├── .eslintrc.js
├── .lintstagedrc
├── .prettierignore
└── .prettierrc
```

### Extend configurations

If the default configuration of a tool does not perfectly suit your needs, you can extend it very easily.

Just create a `.knuckle` folder at the root of your project and put some configuration files in it. Knuckle will detect and apply them over its default configurations.

For exemple, Knuckle's Prettier configuration includes semicolons (which is the default Prettier behavior) but maybe you don't want them in your code. All you need to do is to create a Prettier configuration file in a `.knuckle` folder at the root of your project (eg: `.knuckle/.prettierrc`) and to put the following configuration in it:

```json
{
  "semi": false
}
```

Then, `knuckle up` to re-generate the configuration files and your done!

You can see that `semi` is set to `false` in the root `.prettierrc`.

## Available tools

For now, the available tools are:

- [Prettier](tree/develop/src/tools/prettier)
- [ESLint](tree/develop/src/tools/eslint)
- [Lint-Staged](tree/develop/src/tools/lint-staged)

But many others will follow (PRs are welcome by the way ;) ):

- [TSLint][tslint-url]
- [Commitlint][commitlint-url]
- [Stylelint][stylelint-url]
- [Jest][jest-url]
- Etc.

They are all available by typing `knuckle`, followed by their own name. But remember to `add` them and `knuckle up` to generate and use the configurations:

```bash
$ npx knuckle prettier 'src/**/*' --list-different
$ npx knuckle eslint src
$ npx knuckle lint-staged
```

### Tools versions

You can easily see the different versions of Knuckle and the tools by using the `version` command:

```bash
$ npx knuckle version
$ npx knuckle version eslint
```

## Badge

[![config: knuckle](https://img.shields.io/badge/config-knuckle-ff5c00.svg?style=flat-square)](https://github.com/GuillaumeAmat/knuckle)

```
[![config: knuckle](https://img.shields.io/badge/config-knuckle-ff5c00.svg?style=flat-square)](https://github.com/GuillaumeAmat/knuckle)
```

## Frequently Asked Questions

### Why generating the configuration files rather than hiding them?

At the early stage of the Knuckle conception (0.2.x and earlier), the configuration files were completely hidden from the developer and his project.

The configuration overwrite mechanism was implemented so it felt like a good paradigm: less files for more clarity.

But, the next step came through and a big issue popped: IDE/code editor integration.

Long story short, if the editor can't reach the configuration files, it can't use the dev tools and display their feedbacks.

We studied some options like proposing PR to editors and plugins, or creating our own plugin, but it felt like lost match right away. So we handled that particular case by using the current paradigm: files auto-generation!

It even comes with some benefits after all:

- No black magic
- Possibility to version the generated files
- No incomplete configuration files at the root of your project

### Why versionning the generated files?

For the same reasons that make you version your former configuration files.

### Where is the .knuckle folder?

The `.knuckle` folder is used to modify the behavior of Knuckle. In other words, it is not the main purpose of the tool.

So it does not make sense to automatically create it, you have to do it on your own if you want to use it.

### Can I modify the generated files?

Sure! But Knuckle will replace your modifications at the next `knuckle up`...

Instead, use the `.knuckle` folder to set some configuration overwrites. It is the normal way to extend the configurations.

More informations in the [Extend configurations](#extend-configurations) section.

### Why not to use abstract commands?

`prettier` should be named `format`, `eslint` should be named `lint`, etc. But in the future Prettier, ESLint and the other tools will probably disappear to be replaced by other tools. It happens.

Furthermore, we want to be able to support two (or more) different tools for the same usage at the same time. So how will we call the second one, `knuckle format-2`?

Also, we try to use the same API namings as the tools, to make things easier and non confusing. So it makes sense to have the full signature (name + options).

## Contributors

Thanks goes to these people :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/31624379?v=4" width="100px;"/><br /><sub><b>François Rosato</b></sub>](https://github.com/frosato-ekino)<br />[🐛](https://github.com/knuckle/knuckle/issues?q=author%3Afrosato-ekino "Bug reports") [💻](https://github.com/knuckle/knuckle/commits?author=frosato-ekino "Code") [📖](https://github.com/knuckle/knuckle/commits?author=frosato-ekino "Documentation") [💡](#example-frosato-ekino "Examples") [🤔](#ideas-frosato-ekino "Ideas, Planning, & Feedback") [👀](#review-frosato-ekino "Reviewed Pull Requests") [⚠️](https://github.com/knuckle/knuckle/commits?author=frosato-ekino "Tests") [🔧](#tool-frosato-ekino "Tools") [✅](#tutorial-frosato-ekino "Tutorials") | [<img src="https://avatars3.githubusercontent.com/u/1179174?v=4" width="100px;"/><br /><sub><b>Guillaume AMAT</b></sub>](https://github.com/GuillaumeAmat)<br />[🐛](https://github.com/knuckle/knuckle/issues?q=author%3AGuillaumeAmat "Bug reports") [💻](https://github.com/knuckle/knuckle/commits?author=GuillaumeAmat "Code") [📖](https://github.com/knuckle/knuckle/commits?author=GuillaumeAmat "Documentation") [💡](#example-GuillaumeAmat "Examples") [🤔](#ideas-GuillaumeAmat "Ideas, Planning, & Feedback") [📦](#platform-GuillaumeAmat "Packaging/porting to new platform") [👀](#review-GuillaumeAmat "Reviewed Pull Requests") [📢](#talk-GuillaumeAmat "Talks") [⚠️](https://github.com/knuckle/knuckle/commits?author=GuillaumeAmat "Tests") [🔧](#tool-GuillaumeAmat "Tools") [✅](#tutorial-GuillaumeAmat "Tutorials") | [<img src="https://avatars1.githubusercontent.com/u/6979207?v=4" width="100px;"/><br /><sub><b>Julien Viala</b></sub>](https://github.com/mr-wildcard)<br />[🤔](#ideas-mr-wildcard "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind are welcome!
