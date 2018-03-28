[![License][license-image]][license-url]
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![styled with prettier][prettier-image]][prettier-url]
[![js-standard-style][eslint-image]][eslint-url]



[license-image]: https://img.shields.io/github/license/frosato-ekino/react-sketch-book.svg?style=flat-square
[license-url]: https://github.com/GuillaumeAmat/knuckle/blob/master/LICENSE
[prettier-image]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square
[prettier-url]: https://github.com/prettier/prettier
[eslint-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[eslint-url]: http://standardjs.com

[prettier-config-path]: /src/configs/prettierrc.js
[eslint-config-path]: /src/configs/eslintrc.js


# Knuckle


## How to use scripts

```json
"scripts": {
    "format": "knuckle prettier 'src/**/*.{js,json}' --write",
    "lint": "knuckle eslint src",
    "lint:fix": "knuckle eslint src --fix"
}
```

### How to extends configurations

#### prettier.config.js
Prettier configuration can be extended or replaced by writing your own `prettier.config.js` in your project root folder.
```js
const baseConfig = require('knuckle/dist/configs/prettierrc')

module.exports = {
    ...baseConfig,
    bracketSpacing: true, // overriding rules
    jsxBracketSameLine: true, // overriding rules
}
```
check the base configuration [here][prettier-config-path].

:warning: `prettier.config.js` is the only prettier configuration file format supported so far.

## Development commands

* Run tests: `$ npm run test`
* Format code: `$ npm run format`
* Lint code: `$ npm run lint`
* Build: `$ npm run build`
* Add contributor: `$ npm run contributor add <github-username> <contribution-type>`
* Deploy: `$ npm run deploy`


## Contributors

Thanks goes to these people :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/31624379?v=4" width="100px;"/><br /><sub><b>François Rosato</b></sub>](https://github.com/frosato-ekino)<br />[💻](https://github.com/knuckle/knuckle/commits?author=frosato-ekino "Code") [📖](https://github.com/knuckle/knuckle/commits?author=frosato-ekino "Documentation") [🤔](#ideas-frosato-ekino "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/1179174?v=4" width="100px;"/><br /><sub><b>Guillaume AMAT</b></sub>](https://github.com/GuillaumeAmat)<br />[💻](https://github.com/knuckle/knuckle/commits?author=GuillaumeAmat "Code") [📖](https://github.com/knuckle/knuckle/commits?author=GuillaumeAmat "Documentation") [🤔](#ideas-GuillaumeAmat "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/6979207?v=4" width="100px;"/><br /><sub><b>Julien Viala</b></sub>](https://github.com/mr-wildcard)<br />[🤔](#ideas-mr-wildcard "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind are welcome!
