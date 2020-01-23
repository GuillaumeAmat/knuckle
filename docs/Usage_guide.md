[prettier-url]: https://prettier.io
[knuckle-issues-url]: https://github.com/GuillaumeAmat/knuckle/issues

# Usage guide

Knuckle is the link between your source code and your dev tools. It gives you some great configurations and CLI options for the dev tools of your projects, out of the box.

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
  - [Merge strategy](#merge-strategy)
  - [Help](#help)

## Installation

All the following steps have to only be ran once.

First, we install Knuckle:

```shell
$ npm install --save-dev knuckle
```

Then, we tell to Knuckle to handle some tools:

```shell
$ npx knuckle add prettier eslint lint-staged husky
or
$ npx knuckle add # To get interactive
```

Finally, Knuckle generates the related configurations at the root of your project:

```shell
$ npx knuckle up
```

It installs the tools dependencies and generates the related configuration files.

Add the generated configuration files to your versionning system, like before, and your done!

It is really important to `knuckle up` every time you upgrade Knuckle or want to overwrite its configurations.

In the early stages of Knuckle no files were created in your project. It seems handy at first but the big caveat is that your IDE can't see the tools configuration... More informations in the [FAQ](./FAQ.md).

## Usage

Now that all the configurations are available, all you need to do is to call the tools within Knuckle:

```shell
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

Note that even if the final generated configuration file is named `.prettierrc`, you can choose any of the common filenames for your overwrite file (eg: `.prettierrc.js`). Knuckle will figure it on its own.

### Merge strategy

By default, the configuration extension is done by doing a _deep merge_.

If a configuration from Knuckle is like that:

```json
{
  "a_string": "a value",
  "an_object": {
    "some_key": {
      "another_key": true,
      "another_one": false
    }
  }
}
```

And the custom extension is like that:

```json
{
  "a_number": 123,
  "an_object": {
    "some_key": {
      "another_one": true,
      "an_array": [1, 2, 3]
    }
  }
}
```

The result will be:

```json
{
  "a_string": "a value",
  "a_number": 123,
  "an_object": {
    "some_key": {
      "another_key": true,
      "another_one": true,
      "an_array": [1, 2, 3]
    }
  }
}
```

But that behavior might not be ideal for your use case. So Knuckle comes with two other behaviors: `replace` and `spread`.

_Replace_ remove the whole configuration from the default Knuckle output and replace it with the custom extension.

_Spread_ acts like the ES6 spread operator. It replaces the first level of configuration items. So the final output for the previous example would be:

```json
{
  "a_string": "a value",
  "a_number": 123,
  "an_object": {
    "some_key": {
      "another_one": true,
      "an_array": [1, 2, 3]
    }
  }
}
```

... as `an_object` would be entirely replaced by the custom configuration item.

To define which strategy to use for each tool, use the `set-merge-strategy` command:

```shell
$ yarn knuckle set-merge-strategy default replace
$ yarn knuckle set-merge-strategy eslint spread
$ yarn knuckle set-merge-strategy husky deep
```

In the sample above, we chose to define the default behavior to `replace` instead of `deep`, _ESLint_ uses now the `spread` behavior and _Husky_ sticks with the `deep` behavior. As _Lint-Staged_ is not mentionned, it uses the default behavior, which is now `replace`. Obviously, you don't have to set the `default` item if you want to use the `deep` behavior by default.

### Help

Use the `--help` option in front of any command:

```shell
$ npx knuckle --help
$ npx knuckle --help up
```

If you need more explanations about the Knuckle or its usage, feel free to ask questions on the [repository issues][knuckle-issues-url].
