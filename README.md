# xp-utils
A JavaScript utility library

### Installation

> npm i xp-utils --save

### Usage

- Fully use

```js
import _ from 'xp-utils' // import clone from 'xp-utils/dist/clone.js'

const obj1 = { a: 1, b: { c: 2 } }
const obj2 = _.deepClone(obj1) // const obj2 = clone.deepClone(obj1)
obj2.a = 3
console.log(obj1) // { a: 1, b: { c: 2 } }
console.log(obj2) // { a: 3, b: { c: 2 } }
```

- On demand

```js
import { deepClone } from 'xp-utils' // import { deepClone } from 'xp-utils/dist/clone.js'

const obj1 = { a: 1, b: { c: 2 } }
const obj2 = deepClone(obj1)
obj2.a = 3
console.log(obj1) // { a: 1, b: { c: 2 } }
console.log(obj2) // { a: 3, b: { c: 2 } }
```

### Methods

#### clone.js

- deepClone

#### array.js

- swap
- unique
- newArray

#### date.js

- formatDate
- duration
- ago

#### url.js

- query
- hash
- hostname
- domain
- sub
- pathname

