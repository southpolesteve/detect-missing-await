# detect-missing-await

This module helps you find missing `await` statements at runtime.

It is a runtime analog to the [eslint "no-floating-promises" rule](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md)

> 🚨 Do not use this module in production 🚨

It should be used for debugging only. It mutates the `Promise` global and does magic with proxies. This is dangerous

## Installation

`npm install detect-missing-await`

## Example usage

```js
require('detect-missing-await')

async function main() {
  const promise1 = await Promise.resolve()
  const promise2 = Promise.resolve() // Will log as missing an `await` statement
}

main()
```
