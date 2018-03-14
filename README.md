# Knuckle

## Sample use case

I want to create a project, and I'm sooooo tired to do the same things again, and again, and again...

So I use _Knuckle!_

```
$ npx knuckle init
```

That command asks me:

1. The name of the project
2. Its Licence (multiple choices: MIT, BSD, etc.)
3. The URL of the remote repository
4. The language I want to use (multiple choices: JavaScript, Java, PHP, etc.)


I answer:

1. Stuff
2. MIT
3. https://my-gitlab.net
4. JavaScript


As I answered JavaScript, _Knuckle_ asks me some details:

* Do I want to use `create-react-app`?
* What kind of ESLint configuration I want to use? (extends, plugins, etc.)
* What version of Node.js do I want to use?
* Do I want to use Prettier?
* etc.


After answering to those questions, _Knuckle_ automatically:

* creates a directory called _stuff_
* `git init`
* `git remote add origin https://my-gitlab.net`
* creates a `README.md` file with `# Stuff` as title
* creates a `LICENCE.md` file with the MIT content in it
* create all the configuration file needed for a proper JavaScript project
  * `package.json`
  * `.nvmrc`
  * `.eslintrc`
  * `.prettierrc`
  * etc.


After that, _Knuckle_ asks me about the remote configuration:

* Do I want to protect some branches?
* Do I want to protect some tags?
* Do I want to configure the CI?
* Do I want to configure the CD?
* etc.


## Other commands/behaviors

_Knuckle_ could/should:

* Propose all the wizzard questions in specific commands:
  * `$ npx knuckle create licence`
  * `$ npx knuckle configure ci`
  * `$ npx knuckle configure eslint`
* Create backups of the previous configurations before doing anything (including remote configs)
* Compare its template files checksum with the current repo config files to know if they are pristine
* Store the choices and the executed commands to be able to automatically know what files are handled by it and upgrade them
* Propose some commands to:
  * display dashboards about the remote pipelines
  * handle actions on issues, PR/MR, etc.
