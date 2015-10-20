/**
 * Creates fixed-size hashmap with pre-allocated space for the given number of objects.
 * @param {number} size - The size of the fixed-size hashmap to be created
 */
var Hashmap = function(size) {

    /**
     * Stores the given key/value pair in the hash map. 
     * @param {string} key - The key of the data to be stored in the hashmap
     * @param {object} value - The object value to be stored in the hashmap
     * @returns {boolean} Success indicator
     */
    this.set = function(key, value) {
    };

    /**
     * Generate hash from given string. Based on http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/.
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
    };
};

module.exports = Hashmap;
