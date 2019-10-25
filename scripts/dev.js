/*
Run Rollup in watch mode for development.

Simply pass the desired buildformats to watch (defaults to "global"):

```
# specify the format to output
yarn dev --formats cjs

# Can also drop all __DEV__ blocks with:
__DEV__=false yarn dev
```
*/

const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const formats = args.formats || args.f

execa('rollup', ['-wc', '--environment', `FORMATS:${formats || 'global'}`], {
  stdio: 'inherit'
})
