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
