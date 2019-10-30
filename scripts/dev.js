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
const target = args._.length ? args._[0] : 'src'
const formats = args.formats || args.f

execa(
  'rollup',
  [
    '-wc',
    '--environment',
    [`TARGET:${target}`, `FORMATS:${formats || 'global'}`].join(',')
  ],
  {
    stdio: 'inherit'
  }
)
