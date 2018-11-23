# xp-utils
A JavaScript utility library

## Installation

> npm i xp-utils --save

## Usage
* Fully use

```js
import _ from 'xp-utils'

const obj1 = { a: 1, b: { c: 2 } }
const obj2 = _.deepClone(obj1) // const obj2 = clone.deepClone(obj1)
obj2.a = 3
console.log(obj1) // { a: 1, b: { c: 2 } }
console.log(obj2) // { a: 3, b: { c: 2 } }
```

* On demand

```js
import { deepClone } from 'xp-utils'

const obj1 = { a: 1, b: { c: 2 } }
const obj2 = deepClone(obj1)
obj2.a = 3
console.log(obj1) // { a: 1, b: { c: 2 } }
console.log(obj2) // { a: 3, b: { c: 2 } }

```

## Methods
### clone.js
* deepClone

### array.js
* swap
* unique
* newArray

### throtte.js
* throtte
* debounce

### date.js
* formatDate
* duration
* ago

### url.js
* qs
* qsStringify

### string.js
* len
* subStr
* padStart
* padEnd

### ua.js
* isIOS
* isAndroid
* isMobile

### body-scroll.js
* lockScroll

### security.js
* decode
* encode
* escapeHtml
* escapeJs
