# KPCB Fellows Application Challenge Question Submission

This repository represents my submission for the KPCB Fellows challenge question.

The challenge is as follows:

> Using only primitive types, implement a fixed-size hash map that associates string keys with arbitrary data object references (you don't need to copy the object). Your data structure should be optimized for algorithmic runtime and memory usage. You should not import any external libraries, and may not use primitive hash map or dictionary types in languages like Python or Ruby.
>
> The solution should be delivered in one class (or your language's equivalent) that provides the following functions:
> * __constructor(size)__: return an instance of the class with pre-allocated space for the given number of objects.
> * __boolean set(key, value)__: stores the given key/value pair in the hash map. Returns a boolean value indicating success / failure of the operation.
> * __get(key)__: return the value associated with the given key, or null if no value is set.
> * __delete(key)__: delete the value associated with the given key, returning the value on success or null if the key has no value.
> * __float load()__: return a float value representing the load factor (`(items in hash map)/(size of hash map)`) of the data structure. Since the size of the dat structure is fixed, this should never be greater than 1.
>
> If your language provides a built-in hashing function for strings (ex. `hashCode` in Java or `__hash__` in Python) you are welcome to use that. If not, you are welcome to do something naive, or use something you find online with proper attribution.

### How to test this code:
1. Install Node and npm. Up-to-date instructions can be found [here](https://nodejs.org/en/).
2. Run `npm install -g mocha` to install mocha (a JavaScript test framework).
3. Run `mocha` to run the tests.

### JSDoc Documentation
JSDoc-generated documentation can be viewed by opening `out/global.html` and `out/hashmap.js.html`.
