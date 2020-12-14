# hookify-object

Wrap an object with ES6 proxy to add hooks capabilities through an event emitter.

[![npm version](https://badge.fury.io/js/hookify-object.svg)](https://badge.fury.io/js/hookify-object)  [![codecov](https://codecov.io/gh/arkerone/hookify-object/branch/main/graph/badge.svg?token=oKiP9Xm6yv)](https://codecov.io/gh/arkerone/hookify-object)

## Installation

    $ npm install --save hookify-object  

## Usage

`Hookify-object` provides severals hooks for an object :

- Before/after call a method;
- After resolve/reject a promise;
- Before/after set a object property;
- Before/after delete a property.

### Example

Here is a basic usage to get the execution time of the object's methods :

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

Add hook capabilities to a target object.

#### Parameters

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `target`    |   `object`    |       `-`       | `The object on which we want to add the hook capabilities` |

#### Return value

| Type | Description |
|:---------------:|:---------------:|
| `Proxy` | `The hook wrapper of the target object` |

#### Example

    const hookify = require('hookify-object')  
      
    const obj = {}  
      
    const objWithHooks = hookify(obj)

### proxy.hooks.on(hookName, handler)

Attach a handler for the hook named `hookName`.

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `hookName`    |   `string`    |       `-`       | `The hook's name` |
|    `handler`    |   `Function`    |       `-`       | `The handler function for the specified hook (see bellow)` |

#### handler (context)

Check each hook to know the structure of the `context` object. | Name | Type | Default | Description | | :
---------------: | :-------------: | :-------------: | :---------------------------------------------- | |    `context`
|   `object`    |       `-`       | `Contains the context of the hook` |

### Hooks list

#### beforeCall[:methodName]

Called before calling a method. You can specify a unique method via the `methodName` option.

#### Example

    objWithHooks.hooks.on('beforeCall', (context) => {  
      /* Call before the call of any method */  
    })  
      
    objWithHooks.hooks.on('beforeCall:test', (context) => {  
      /* Call before the call of the "test" method */  
    })

#### context object

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `self`    |   `object`    |       `-`       | `The object wrapped by the hook proxy` |
|    `name`    |   `string`    |       `-`       | `The name of the called method` |
|    `params`    |   `Array`    |       `-`       | `The parameters of the called method` |

#### afterCall[:methodName]

Called after calling a method. You can specify a unique method via the `methodName` option.

#### Example

    objWithHooks.hooks.on('afterCall', (context) => {  
      /* Call after the call of any method */  
    })  
      
    objWithHooks.hooks.on('afterCall:test', (context) => {  
      /* Call after the call of the "test" method */  
    })

#### context object

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `self`    |   `object`    |       `-`       | `The object wrapped by the hook proxy` |
|    `name`    |   `string`    |       `-`       | `The name of the called method` |
|    `params`    |   `Array`    |       `-`       | `The parameters of the called method` |
|    `result`    |   `*`    |       `-`       | `The returned value of the called method` |

#### afterResolve[:methodName]

Called when the promise returned by the method has resolved. You can specify a unique method via the `methodName`
option.

#### Example

    objWithHooks.hooks.on('afterResolve', (context) => {  
      /* Call after resolve the promise of any method */  
    })  
      
    objWithHooks.hooks.on('afterResolve:testAsync', (context) => {  
      /* Call after resolve the promise of the "testAsync" method */  
    })

#### context object

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `self`    |   `object`    |       `-`       | `The object wrapped by the hook proxy` |
|    `name`    |   `string`    |       `-`       | `The name of the called method` |
|    `params`    |   `Array`    |       `-`       | `The parameters of the called method` |
|    `result`    |   `*`    |       `-`       | `The returned value of the promise` |

#### afterReject[:methodName]

Called when the promise returned by the method has rejected. You can specify a unique method via the `methodName`
option.

#### Example

    objWithHooks.hooks.on('afterReject', (context) => {  
      /* Call after reject the promise of any method */  
    })  
      
    objWithHooks.hooks.on('afterReject:testAsync', (context) => {  
      /* Call after reject the promise of the "testAsync" method */  
    })

#### context object

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `self`    |   `object`    |       `-`       | `The object wrapped by the hook proxy` |
|    `name`    |   `string`    |       `-`       | `The name of the called method` |
|    `params`    |   `Array`    |       `-`       | `The parameters of the called method` |
|    `errors`    |   `Array`    |       `-`       | `The returned errors of the promise` |

#### beforeSet[:propertyName]

Called before setting a property value. You can specify a unique property via the `propertyName` option.

#### Example

    objWithHooks.hooks.on('beforeSet', (context) => {  
      /* Call before set any property */  
    })  
      
    objWithHooks.hooks.on('beforeSet:value', (context) => {  
      /* Call before set the property "value" */  
    })

#### context object

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `self`    |   `object`    |       `-`       | `The object wrapped by the hook proxy` |
|    `name`    |   `string`    |       `-`       | `The name of the property` |
|    `value`    |   `Array`    |       `-`       | `The new value of the property to set` |

#### afterSet:[propertyName]

Called after setting a property value. You can specify a unique property via the `propertyName` option.

#### Example

    objWithHooks.hooks.on('afterSet', (context) => {  
      /* Call after set any property */  
    })  
      
    objWithHooks.hooks.on('afterSet:value', (context) => {  
      /* Call after set the property "value" */  
    })

#### context object

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `self`    |   `object`    |       `-`       | `The object wrapped by the hook proxy` |
|    `name`    |   `string`    |       `-`       | `The name of the property` |
|    `value`    |   `Array`    |       `-`       | `The new value of the property to set` |

#### beforeDelete[:propertyName]

Called before deleting a property via the `delete` instruction. You can specify a unique property via the `propertyName`
option.

#### Example

    objWithHooks.hooks.on('beforeDelete', (context) => {  
      /* Call before delete any property */  
    })  
      
    objWithHooks.hooks.on('beforeDelete:value', (context) => {  
      /* Call before delete the property "value" */  
    })

#### context object

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `self`    |   `object`    |       `-`       | `The object wrapped by the hook proxy` |
|    `name`    |   `string`    |       `-`       | `The name of the property` |

#### afterDelete[:propertyName]

Called after deleting a property via the `delete` instruction. You can specify a unique property via the `propertyName`
option.

#### Example

    objWithHooks.hooks.on('afterDelete', (context) => {  
      /* Call after delete any property */  
    })  
      
    objWithHooks.hooks.on('afterDelete:value', (context) => {  
      /* Call after delete the property "value" */  
    })

#### context object

|       Name        |      Type       |     Default     | Description                                     |
| :---------------: | :-------------: | :-------------: | :---------------------------------------------- |
|    `self`    |   `object`    |       `-`       | `The object wrapped by the hook proxy` |
|    `name`    |   `string`    |       `-`       | `The name of the property` |
