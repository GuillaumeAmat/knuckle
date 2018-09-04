[![License][license-image]][license-url]
[![All Contributors][all-contributors-image]](#contributors)
[![code style: prettier][prettier-image]][prettier-url]

[license-image]: https://img.shields.io/github/license/frosato-ekino/react-sketch-book.svg?style=flat-square
[license-url]: https://github.com/GuillaumeAmat/knuckle/blob/master/LICENSE
[all-contributors-image]: https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[eslint-url]: https://github.com/eslint/eslint
[cosmiconfig-url]: https://github.com/davidtheclark/cosmiconfig
[lint-staged-url]: https://github.com/okonet/lint-staged
[tslint-url]: https://github.com/palantir/tslint
[commitlint-url]: https://github.com/marionebl/commitlint
[stylelint-url]: https://github.com/stylelint/stylelint
[jest-url]: https://github.com/facebook/jest

# 👊 Knuckle

Knuckle is the link between your source code and your dev tools. It gives you the base configuration for your project, out of the box.

All you need to do is to call Knuckle and to ask him the smaller thing as possible. All the configuration and best practices are handled by him.

Let's say you want to format your code. You probably already use [Prettier][prettier-url] to do that but you had to create your own configuration file.

Instead, Knuckle only ask you path and action. That's it!

## Installation

All the following steps have to only be ran once.

First, we install Knuckle:

```bash
$ npm install --save-dev knuckle
```

Then, we have to tell to Knuckle which tools he must handle:

```bash
$ npx knuckle add prettier eslint lint-staged
```

Finally, Knuckle must generate the related configurations at the root of your project:

```bash
$ npx knuckle up
```

It is really important to `knuckle up` every time you upgrade Knuckle or you want to overwrite its default configurations. In the early stages of Knuckle no files were created in your project. It seems handy at first but the big caveat is that your IDE can't see the tools configuration...

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

Just create a `.knuckle` folder at the root of your project and put some configuration files in it. Knuckle will detect and apply them on its default configurations.

For exemple, Knuckle's Prettier configuration includes semicolons but maybe you don't want them in your code. All you need to do is to create a Prettier configuration file in a `.knuckle` folder at the root of your project (eg: `.knuckle/.prettierrc`) and to put the following configuration in it:

```json
{
  "semi": false
}
```

## Available tools

For now, the available tools are:

- [Prettier][prettier-url]
- [ESLint][eslint-url]
- [Lint-Staged][lint-staged-url]

But many others will follow:

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

### Why not to use abstract commands?

`prettier` should be named `format`, `eslint` should be named `lint`, etc. But in the future Prettier, ESLint and the other tools will probably disappear to be replaced by other tools. It happens.

Furthermore, we want to be able to support two (or more) different tools for the same usage at the same time. So how will we call the second one, `knuckle format-2`?

Also, we try to use the same API namings as the tools, to make things easier and non confusing. So it makes sense to have the full signature (name + options).

### Tools versions

You can easily see the different versions of Knuckle and the tools by using the `version` command:

```bash
$ npx knuckle version
$ npx knuckle version eslint
```

## Contributors

Thanks goes to these people :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/31624379?v=4" width="100px;"/><br /><sub><b>François Rosato</b></sub>](https://github.com/frosato-ekino)<br />[💻](https://github.com/knuckle/knuckle/commits?author=frosato-ekino "Code") [📖](https://github.com/knuckle/knuckle/commits?author=frosato-ekino "Documentation") [🤔](#ideas-frosato-ekino "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/1179174?v=4" width="100px;"/><br /><sub><b>Guillaume AMAT</b></sub>](https://github.com/GuillaumeAmat)<br />[💻](https://github.com/knuckle/knuckle/commits?author=GuillaumeAmat "Code") [📖](https://github.com/knuckle/knuckle/commits?author=GuillaumeAmat "Documentation") [🤔](#ideas-GuillaumeAmat "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/6979207?v=4" width="100px;"/><br /><sub><b>Julien Viala</b></sub>](https://github.com/mr-wildcard)<br />[🤔](#ideas-mr-wildcard "Ideas, Planning, & Feedback") |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind are welcome!
