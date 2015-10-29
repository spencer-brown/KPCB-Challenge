/**
 * Creates fixed-size hashmap with pre-allocated space for the given number of objects.
 * @param {number} size - The size of the fixed-size hashmap to be created
 */
var Hashmap = function(size) {

    var map = [];
    var itemCount = 0;

    /**
     * Stores the given key/value pair in the hash map. 
     * @param {string} key - The key of the data to be stored in the hashmap
     * @param {object} value - The object value to be stored in the hashmap
     * @returns {boolean} Success indicator
     */
    this.set = function(key, value) {
        // return false if key is not a string or is empty
        if (typeof key !== 'string' || key.length === 0) {
            return false;
        }

        var hash = hashString(key);
        var insertionIndex = hash % size;
        var newNode = {
            key: key,
            value: value,
            next: null
        };

        if (typeof map[insertionIndex] === 'undefined') {
            map[insertionIndex] = newNode;
            itemCount++;
        } else {
            // insert into sorted linked list

            var searchNode = map[insertionIndex];

            while (searchNode !== null) {
                if (searchNode.next === null) {
                    // we're either at the beginning or the end of the list

                    if (searchNode.key < newNode.key) {
                        searchNode.next = newNode;
                    } else if (searchNode.key > newNode.key) {
                        // insert at beginning of list
                        newNode.next = searchNode;
                        map[insertionIndex] = newNode;
                    } else {
                        searchNode.value = value;
                    }

                    itemCount++;
                    break;
                } else if (searchNode.next.key === newNode.key) {
                    // overwrite value
                    searchNode.next.value = value;
                    itemCount++;
                    break;
                } else if (searchNode.next.key > newNode.key) {
                    if (searchNode.key < newNode.key) {
                        // insert between the two nodes
                        newNode.next = searchNode.next;
                        searchNode.next = newNode.next;
                        itemCount++;
                        break;
                    } else {
                        // insert before searchNode - this will only happen when searchNode is the first node in the list
                        newNode.next = searchNode;
                        map[insertionIndex] = newNode;
                        itemCount++;
                        break;
                    }
                } else if (searchNode.next.key < newNode.key) {
                    // keep searching
                    searchNode = searchNode.next;
                }
            }
        }

        return true;
    };

    /**
     * Generate hash from given string. Based on http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/.
     *
     * A more complex hashing function would be used (like https://github.com/garycourt/murmurhash-js/blob/master/murmurhash3_gc.js) if external
     * libraries were able to be included.
     * @param {string} str = String from which hash should be generated
     * @returns {number} Hash
     */
    function hashString(str) {
        var hash = 0;

        if (str.length === 0) {
            return hash;
        }

        var char;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // convert to 32-bit integer
        }

        return hash;
    }

    /**
     * Returns the value of the value associated with the given key, or null if no value is set.
     * @param {string} key - The key to be looked up
     * @returns {object} Value associated with given key or null
     */
    this.get = function(key) {
        // return if key is not a string or is empty
        if (typeof key !== 'string' || key.length === 0) {
            return;
        }

        var hash = hashString(key);

        // if list exists in hashmap, look through it
        if (map[hash]) {
            var searchNode = map[hash];

            // find node w/ key
            while (searchNode.key !== key) {
                if (typeof searchNode.next === 'undefined') {
                    return;
                }
                searchNode = searchNode.next;
            }

            return searchNode;
        } else {
            // otherwise, key is not in the hashmap
            return;
        }
    };

    /**
     * Delete the value associated with the given key, returning the value on success or null if the key has no value.
     * @param {string} key - The key to be looked up
     * @returns {object} Deleted value or null
     */
    this.delete = function(key) {
    };

    /**
     * Returns the load factor of the hashmap.
     * @returns {number} Load factor
     */
    this.load = function() {
        if(size === 0) {
            return;
        }

        return itemCount/size;
    };
};

module.exports = Hashmap;
