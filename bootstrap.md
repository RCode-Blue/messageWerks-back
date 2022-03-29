# Node from Scratch

## Contents

- [Node from Scratch](#node-from-scratch)

- [Contents](#contents)

  - [Part 1: Basic Node Setup](#part-1-basic-node-setup)
    - [Step 1: Use this template](#step-1-use-this-template)
    - [Step 2: Install and Configure Babel and Other Libraries](#step-2-install-and-configure-babel-and-other-libraries)
  - [Part 2: Incorporate Webpack Into your Project](#part-2-incorporate-webpack-into-your-project)
    - [Step 1: Install and Configure Webpack](#step-1-install-and-configure-webpack)
    - [Step 2: Update node scripts](#step-2-update-node-scripts)
  - [Part 3: Configure Dev and Prod builds](#part-3-configure-dev-and-prod-builds)
    - [Step 1: Create Dev and Prod Webpack config files](#step-1-create-dev-and-prod-webpack-config-files)
    - [Step 2: Add node scripts to load different configs](#step-2-add-node-scripts-to-load-different-configs)
    - [Step 3: Set up environment variables for Dev and Prod](#step-3-set-up-environment-variables-for-dev-and-prod)

<br/><br/><br/>

# Part 1: Basic Node Setup

## Step 1: Use this template

<br/>

### 1. Initialise NPM

<br/>

```
npm init
```

Answer all questions, or use `npm init --y` to take all defaults

It has config files for Editor Config, ESLint and Prettier
<br/><br/>

### 2. Install the eslint plugin

<br/>

```bash
npm install -–save-dev eslint
```

where:

| Library              | Description / Link                      |
| -------------------- | --------------------------------------- |
| eslint:              | Linting                                 |
|                      | _[homepage](https://eslint.org/)_       |

<br/><br/>

### 3. Edit ESLint Configuration

- Add the following in the `.eslintrc.json` file:

<br/>

```json
{
  "extends": "eslint: recommended"
}
```

<br/><br/>

## Step 2: Install and Configure Babel and Other Libraries

<br/>

### 1. Install Babel core and loader

```
npm install --save-dev @babel/core@7.11.6 babel-loader@8.1.0
```

where:
| Library | Description / Link |
| ------------- | ------------ |
| @babel-core: | Babel core library (does nothing on its own) |
| | _[link](https://babeljs.io/docs/en/6.26.3/babel-core)_ |
| babel-loader: | Lets Webpack talk to Babel |
| | _[homepage](https://github.com/babel/babel-loader)_ |

<br/>

### 2. Install Babel presets

```
npm install --save-dev @babel/preset-env@7.11.5
```

where:
| Library | Description / Link |
| -------------------- | ------------ |
| @babel-preset-env: | Babel preset for all ES6 plugins |
| | _[link](https://babeljs.io/docs/en/6.26.3/babel-preset-env)_ |

<br/><br/>

### 3. Configure Babel

- Create `.babelrc` file at project root.

- Add babel presets:

`.babelrc:`

```
{
  "presets": "@babel/preset-env"
}
```

- You should end up with the following folder structure:

```
<project_root>
|-- .babelrc
|-- .eslintrc.json
|-- package.json

```

### 4. Install the HTML Loader

```bash
npm install --save-dev html-webpack-plugin
```


<br/><br/>

## Step 3: Setup Express

### 1. Install and configure Express

```bash
npm install --save express
```

`package.json`
```json
"scripts:" {
  start": "node ./src/server.js"
},
```

### 2. Create a basic express server setup

- Create a server file

`./src/server.js:`
```js
const path = require("path");
const express = require("express")

const app = express(), DIST_DIR=__dirname, HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR))

app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
  console.log(`App listening to ${PORT}...`);
  console.log("Press Ctrl+C to quit")
})

```

- Create a HTML file
  
`./src/index.html:`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Node</h1>
    <p>Boilerplate</p>
  </body>
</html>
```

- Test the setup

start the server:
```bash
npm start
```

Browse to the webpage: `http://localhost:8080`

<br/><br/>
# Part 2: Incorporate Webpack Into your Project

<br/><br/>
## Step 1: Install and Configure Webpack

<br/>

### 1. Install Webpack

```
npm install --save-dev 
            webpack@4.44.1 
            webpack-cli@3.3.12 
            webpack-dev-server@3.11.0 
            webpack-node-externals@2.5.2 
            rimraf
```

where:
| Library | Description / Link |
| ------------------- | ------------ |
| webpack: | Webpack core library |
| | _[homepage](https://webpack.js.org/)_ `|` _[npm](https://www.npmjs.com/package/webpack)_ |
| webpack-cli: | Webpack utility that a set of tools to improve the setup of custom webpack configuration |
| | _[home](https://webpack.js.org/api/cli/)_ `|` _[npm](https://webpack.js.org/api/cli/)_ |
| webpack-dev-server: | Development server for Webpack that provides live reloading and other utilities |
| | _[npm](https://www.npmjs.com/package/webpack-dev-server)_ |
| webpack-node-externals: | Defines modules that are to be ignored when building |
| | _[npm](https://www.npmjs.com/package/webpack-node-externals)_ |
|rimraf:|A Node. js module that provides asynchronous deep- deletion of files and directories.|
|| _[github](https://github.com/isaacs/rimraf)_ `|` _[npm](https://www.npmjs.com/package/rimraf)_|

<br/><br/>

### 2. Configure Webpack

- Create `webpack.config.js` at project root.

- Specify the entry point and the output, node configurations:

`webpack.config.js:`

```js
const path = require("path");
const nodeExternals = require("webpack-node-externals");

var config = {
  entry: {
    server: "./src/server.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: '/',
    filename: "[name].js",
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
};

module.exports = config;
```
<br/>

### 3. Add Babel configuration:

`webpack.config.js:`

```js
  module: {
    rules: [
      {
      use: "babel-loader",
      test: /\.js$/,
      exclude: /node_modules/
      }
    ]
  }
}
```

### 4. Configure HtmlWebpackPlugin

`webpack.config.js:`

```js
var HtmlWebpackPlugin = require("html-webpack-plugin");

...

var config = {

...

plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      excludeChunks: ['server']
    }),
  ],

...

}
```



<br/>



- You should end up with the following folder structure:

```
<project_root>
|-- .babelrc
|-- package.json
|-- webpack.config.js

```

## Step 2: Update node scripts

### 1. Edit Script section of `package.json`

`package.json`
```json
"scripts": { 
  "build": "rimraf dist && webpack --mode development",
  "start": "node ./dist/server.js"
},
```

### 2. Test the new setup

```bash
npm run build
npm run start
```

- Browse to `http://localhost:8080`


<br/><br/>

# Part 3: Configure Dev and Prod builds

## Step 1: Create Dev and Prod Webpack config files

1. Make a copy of `webpack.config.js` in project root and rename it `webpack.base.config.js`
2. Create 2 new files in the same folder and name them `webpack.dev.config.js` and `webpack.prod.config.js`
3. Edit the two new files above as below:

<br/>

`webpack.dev.config.js`
```js
const commonConfig = require("./webpack.base.config");

console.log("Building dev config...");

var devConfig = {};

var config = Object.assign(devConfig, commonConfig);

module.exports = config;
```

<br/>

`webpack.prod.config.js`
```js
const commonConfig = require("./webpack.base.config");

console.log("Building production config...");

var prodConfig = {};

var config = Object.assign(prodConfig, commonConfig);

module.exports = config;
```

## Step 2: Add node scripts to load different configs 

`package.json`
```json
"scripts": {
    "build:dev":"rimraf dist &&
                webpack --config=webpack.dev.config.js --mode development",
    "build:prod":"rimraf dist &&
                webpack --config=webpack.prod.config.js --mode production",
  },
  ```

[Reference](https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334)


## Step 3: Set up environment variables for Dev and Prod

1. Install `dotenv`

```bash
npm install --save dotenv
```

where:
| Library | Description / Link |
| ------------------- | ------------ |
| dotenv: | A module that loads environment variables from an `.env` file into `process.env` |
| | _[homepage](https://github.com/motdotla/dotenv#readme)_ `|` _[npm](https://www.npmjs.com/package/dotenv)_ |

<br/>


2. Create `.env` file

Create `.env` file at project root. Fill it with variables. Example below:

```
NODE_ENV=development
API_KEY_1=cjgasl_o9080234hbt-osdas
PASSWORD=mypassword
```


3. Create configuration loader script

In project root. create new file named `dotenvConfig.js`, with contents as below:

```js
const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error) {
  throw result.error;
}
```

4. Create node script

`package.json`
```json
"scripts":{
  "serve": "node -r dotenv/config dotenvConfig.js dotenv_config_path=.env && nodemon ./src/server.js",
}
```

5. Load configuration in your project

`src/server.js`
```js
const path = require("path");
const fs = require("fs");

...

// Check if .env file exists
const rootDir = path.dirname(__dirname);
if (fs.existsSync(path.join(rootDir) + "/.env")) {
  require("dotenv").config();
}
```

# Part 4: Configure Testing

## Step 1: Setup and configuration

1. Install Jest and Jest-Mongodb

```bash
npm install --save-dev jest @shelf/jest-mongodb
```
where:
| Library | Description / Link |
| ------------------- | ------------ |
| jest: | A javascript testing framework |
| | _[homepage](https://jestjs.io/)_ `|` _[npm](https://www.npmjs.com/package/jest)_ `|` _[github](https://github.com/facebook/jest)_ |
| jest-mongodb: | A Jest preset to run MongoDB memory server |
| | _[homepage](https://github.com/shelfio/jest-mongodb#readme)_ `|` _[npm](https://www.npmjs.com/package/@shelf/jest-mongodb)_ `|` _[github](https://github.com/shelfio/jest-mongodb)_ |

<br/>

2. Create configuration files at project root

`jest.config.js`
```js
module exports = {
  preset: "@shelf/jest-mongodb",
}
```

`jest-mongodb-config.js`
```js
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.0.3",
      skipMD5: true,
    },
    instance: {
      dbName: "jest",
    },
    autoStart: false,
  },
};
```

note: open node_modules/@shelf/jest-mongodb/readme.md for configuration details

