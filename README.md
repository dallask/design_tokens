# Basic Style Dictionary

### Requirements

* node.js (https://nodejs.org/)
* npm (https://www.npmjs.com/)
* nvm (https://github.com/nvm-sh/nvm)

This example code is bare-bones to show you what this framework can do. If you have the style-dictionary module installed globally, you can `cd` into this directory and run:
```bash
nvm use
npm install
npm run style:build (optional)
npm run build:all
```

You should see something like this output:
```
Copying starter files...

Source style dictionary starter files created!

Running `style-dictionary build` for the first time to generate build artifacts.

css
✔︎  build/css/root.css

scss
✔︎  build/scss/_variables.scss
```

Good for you! You have now built your first style dictionary! Moving on, take a look at what we have built. This should have created a build directory and it should look like this:
```
├── README.md
├── figma.tokens.json
├── tokens.config.json
├── tokensTransform.js
├── tokens/
│   ├── sd.tokens.json
├── build/
│   ├── css/
│      ├── root.css
│   ├── scss/
│      ├── _variables.scss
```

If you open `tokens.config.json` you will see there are 2 platforms defined: scss, css. Each platform has a transformGroup, buildPath, and files. The buildPath and files of the platform should match up to the files what were built. The files built should look like these:

**CSS**
```css
:root {
    --dimension-scale: 0.125rem;
    --dimension-xs: 0.25rem;
    --dimension-sm: 0.5rem;
    --dimension-md: 1rem;
    --dimension-lg: 2rem;
    --dimension-xl: 4rem;
    --dimension-xxl: 8rem;
    --spacing-0: 0rem;
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    --spacing-xl: 4rem;
}
```

**SCSS**
```scss
// variables.scss
$color-base-gray-light: #cccccc;
$color-base-gray-medium: #999999;
$color-base-gray-dark: #111111;
$color-base-red: #ff0000;
$color-base-green: #00ff00;
$color-font-base: #ff0000;
$color-font-secondary: #00ff00;
$color-font-tertiary: #cccccc;
$size-font-small: 0.75rem;
$size-font-medium: 1rem;
$size-font-large: 2rem;
$size-font-base: 1rem;
```

Pretty nifty! This shows a few things happening:
1. The build system does a deep merge of all the token JSON files defined in the `source` attribute of `tokens.config.json`. This allows you to split up the token JSON files however you want. There are 2 JSON files with `color` as the top level key, but they get merged properly.
1. The build system resolves references to other design tokens. `{size.font.medium.value}` gets resolved properly.
1. The build system handles references to token values in other files as well as you can see in `tokens/color/font.json`.

Now let's make a change and see how that affects things. Open up `tokens/color/base.json` and change `"#111111"` to `"#000000"`. After you make that change, save the file and re-run the build command `style:build`. Open up the build files and take a look.

**Huzzah!**

Now go forth and create! Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).
