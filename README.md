# Scaffolding

Scripts and templates we use to enforce standards and get a running start. These require
[Google ZX][1] and can be installed with:

```
npm install -g zx
```

## Gallery

New Flutter project:

```
zx https://raw.githubusercontent.com/OneSheep/scaffolding/main/flutter/init.mjs
```

Documentation site for project handbook:

```
svn export https://github.com/OneSheep/scaffolding.git/trunk/docs
```

Documentation folder for a single repo project:

```
svn export https://github.com/OneSheep/scaffolding.git/trunk/docs/docs
```

Prettier config for a project:

```
 curl https://raw.githubusercontent.com/OneSheep/scaffolding/main/.prettierrc > .prettierrc
```

Changelog version configuration for a project:

```
 curl https://raw.githubusercontent.com/OneSheep/scaffolding/main/.versionrc > .versionrc
```


Grab the commit lint configuration for a project:

```
 curl https://raw.githubusercontent.com/OneSheep/scaffolding/main/commitlint.config.js > commitlint.config.js
```

[1]: https://github.com/google/zx
