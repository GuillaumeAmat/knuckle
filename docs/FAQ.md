# Frequently Asked Questions

## Why generating the configuration files rather than hiding them?

At the early stage of the Knuckle conception (0.2.x and earlier), the configuration files were completely hidden from the developer and his project.

The configuration overwrite mechanism was implemented so it felt like a good paradigm: less files for more clarity.

But, the next step came through and a big issue popped: IDE/code editor integration.

Long story short, if the editor can't reach the configuration files, it can't use the dev tools and display their feedbacks.

We studied some options like proposing PR to editors and plugins, or creating our own plugin, but it felt like lost match right away. So we handled that particular case by using the current paradigm: files auto-generation!

It even comes with some benefits after all:

- No black magic
- Possibility to version the generated files
- No incomplete configuration files at the root of your project

## Why versionning the generated files?

For the same reasons that make you version your former configuration files.

## Where is the .knuckle folder?

The `.knuckle` folder is used to modify the behavior of Knuckle. In other words, it is not the main purpose of the tool.

So it does not make sense to automatically create it, you have to do it on your own if you want to use it.

## Can I modify the generated files?

Sure! But Knuckle will replace your modifications at the next `knuckle up`...

Instead, use the `.knuckle` folder to set some configuration overwrites. It is the normal way to extend the configurations.

More informations in the [Extend configurations](./Usage_guide.md#extend-configurations) usage guide section.

## How do I stop using Knuckle?

As Knuckle generates regular configuration files, all you need to do is remove the Knuckle package and its own configuration files:

```shell
$ npm uninstall knuckle && rm -rf ./.knuckle*
```

## Why not to use abstract commands?

`prettier` should be named `format`, `eslint` should be named `lint`, etc. But in the future Prettier, ESLint and the other tools will probably disappear to be replaced by other tools. It happens.

Furthermore, we want to be able to support two (or more) different tools for the same usage at the same time. So how will we call the second one, `knuckle format-2`?

Also, we try to use the same API namings as the tools, to make things easier and non confusing. So it makes sense to have the full signature (name + options).
