# Usage guide

Knuckle is the link between your source code and your dev tools. It gives you some great configurations and CLI options for the dev tools of your projects, out of the box.

In other words, you don't need to write and maintain the configurations of your dev tools anymore (eg: [ESLint][eslint-url]). Knuckle does that for you.

Let's say you want to format your code. You probably already use [Prettier][prettier-url] to do that but you had to create your own configuration file.

Instead, Knuckle does it for you. You only need to:

- Tell to Knuckle which tools you want him to handle
- Ask him to automatically:
  - Generate the related configuration files
  - Install the dependencies
- And you're done!

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Configurations](#configurations)
  - [Extend configurations](#extend-configurations)
  - [Help](#help)

## Installation

All the following steps have to only be ran once.

First, we install Knuckle:

```bash
$ npm install --save-dev knuckle
```

Then, we tell to Knuckle to handle some tools:

```bash
$ npx knuckle add prettier eslint lint-staged husky
or
$ npx knuckle add # To get interactive
```

Finally, Knuckle generates the related configurations at the root of your project:

```bash
$ npx knuckle up
```

It installs the tools dependencies and generates the related configuration files.

Add the generated configuration files to your versionning system, like before, and your done!

It is really important to `knuckle up` every time you upgrade Knuckle or want to overwrite its configurations.

In the early stages of Knuckle no files were created in your project. It seems handy at first but the big caveat is that your IDE can't see the tools configuration... More informations in the [FAQ](./FAQ.md).

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

### Configurations

The configurations are generated from a base file, located in the `config` directory of Knuckle, and some plugins/configurations related to the dependendencies of your project (eg: React ESLint plugin).

### Extend configurations

If the configuration of a tool does not perfectly suit your needs, you can extend it very easily.

Just create a `.knuckle` folder at the root of your project and put some configuration files in it. Knuckle will detect and apply them over its configurations.

For exemple, Knuckle's Prettier configuration includes semicolons (which is the default Prettier behavior) but maybe you don't want them in your code. All you need to do is to create a Prettier configuration file in a `.knuckle` folder at the root of your project (eg: `.knuckle/.prettierrc`) and to put the following configuration in it:

```json
{
  "semi": false
}
```

Then, `knuckle up --no-install` to re-generate the configuration files and your done!

You can see that `semi` is set to `false` in the root `.prettierrc`.

### Help

Use the `--help` option in front of any command:

```bash
$ npx knuckle --help
$ npx knuckle --help up
```

If you need more explanations about the Knuckle or its usage, feel free to ask questions on the [repository issues][knuckle-url].
