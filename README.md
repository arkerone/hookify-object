# hookify-object

Wrap an object with ES6 proxy to add hooks capabilities with an event emitter

[![npm version](https://badge.fury.io/js/hookify-object.svg)](https://badge.fury.io/js/hookify-object)  
[![codecov](https://codecov.io/gh/arkerone/hookify-object/branch/main/graph/badge.svg?token=oKiP9Xm6yv)](https://codecov.io/gh/arkerone/hookify-object)

## Installation

```  
$ npm install --save hookify-object  
```  

## Usage

`Hookify-object` provides severals hooks for an object :

- Before/after call a method
- After resolve/reject a promise
- Before/after set a object property
- Before/after delete a property

### Example

Following a basic usage to get the execution time of the object methods :

    const hookify = require('hookify-object')  
      
    const obj = {  
      process () {  
        /* ... */  
      },  
    }  
      
    const objWithHooks = hookify(obj)  
      
    objWithHooks.hooks.on('beforeCall', (context) => {  
      const { name } = context  
      console.time(name)  
    })  
      
    objWithHooks.hooks.on('afterCall', (context) => {  
      const { name } = context  
      console.timeEnd(name)  
    })  
      
    objWithHooks.process()

## API

### hookify(target)

Add hook capabilities to a target object :

#### Parameters

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `target`    |   `object`    |       `-`       | `The object on which we want to add the hook capabilities` |

#### Return value

| Type | Description |
|:---------------:|:---------------:|
| `Proxy` | The hook wrapper of the target object |

#### Example

    const hookify = require('hookify-object')  
      
    const obj = {}  
      
    const objWithHooks = hookify(obj)

### proxy.hooks.on(hookName, handler)

Attach a handler for the hook named `hookName`.

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `hookName`    |   `string`    |       `-`       | `The hook's name (see below)` |
|    `handler`    |   `Function`    |       `-`       | `The handler function for the specified hook` |

### Hooks list

#### beforeCall

#### beforeCall:[methodName]

#### afterCall

#### afterCall:[methodName]

#### afterResolve

#### afterResolve:[methodName]

#### afterReject

#### afterReject:[methodName]

#### beforeSet

#### beforeSet:[propertyName]

#### afterSet

#### afterSet:[propertyName]

#### beforeDelete

#### beforeDelete:[propertyName]

#### afterDelete

#### afterDelete:[propertyName]
