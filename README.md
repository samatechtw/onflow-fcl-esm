<h2 align='center'>@samatech/onflow-fcl-esm</h2>

<p align='center'>@onflow/fcl built for ES Module consumption. Includes some typings.</p>

<p align='center'>
<a href='https://www.npmjs.com/package/@samatech/onflow-fcl-esm'>
  <img src='https://img.shields.io/npm/v/@samatech/onflow-fcl-esm?color=222&style=flat-square'>
</a>
</p>

<br>

### Installation

```bash
npm i -D @samatech/onflow-fcl-esm
```

### Usage

Use according to Flow [documentation](https://github.com/onflow/fcl-js/tree/master/packages/fcl)

### Development

#### Release

Currently, a custom release script is used to update the version and publish to NPM. This must be executed on the main branch, and `<version>` must not equal the current version on NPM.

```bash
node scripts/release.js <version>
```
