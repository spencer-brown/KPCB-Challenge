var assert = require ('assert');
var hashmap = require('../hashmap');

// duplicated hashString function from hashmap.js; don't want to expose from hashmap.js
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

function getMapIndex(mapSize, key) {
    return Math.abs(hashString(key) % mapSize);
}

describe('hashmap', function() {
    describe('hashmap', function() {
        it('should not be undefined when created', function() {
            var SIZE = 5;
            var map = new hashmap(SIZE);
            assert.notEqual(typeof map, 'undefined');
        });
    });

    describe('set', function() {
        it('should set values correctly', function() {
            var SIZE = 5;
            var map = new hashmap(SIZE);

            // set >5 things to force list creation via pigeon hole principle
            assert.equal(map.set('elephant', 'orange'), true);
            assert.equal(map.set('giraffe', 'purple'), true);
            assert.equal(map.set('ostrich', 'grey'), true);
            assert.equal(map.set('silver', 'surfer'), true);
            assert.equal(map.set('fork', 'process'), true);
            assert.equal(map.set('san', 'francisco'), true);

            var mapArr = map.getMap();

            assert.equal(mapArr[getMapIndex(SIZE, 'elephant')].value, 'orange');
            assert.equal(mapArr[getMapIndex(SIZE, 'giraffe')].value, 'purple');
            assert.equal(mapArr[getMapIndex(SIZE, 'ostrich')].value, 'grey');
            assert.equal(mapArr[getMapIndex(SIZE, 'silver')].next.value, 'surfer'); // this one is in a list
            assert.equal(mapArr[getMapIndex(SIZE, 'fork')].value, 'process');
            assert.equal(mapArr[getMapIndex(SIZE, 'san')].next.value, 'francisco'); // this one is also in a list
        });

        it('should return false with an empty key value', function() {
            var SIZE = 5;
            var map = new hashmap(SIZE);
            assert.equal(map.set('', 'foo'), false);
        });

        it('should return false with a non-string key value', function() {
            var SIZE = 5;
            var map = new hashmap(SIZE);
            assert.equal(map.set(5, 'foo'), false);
        });
    });

    describe('get', function() {
        var SIZE = 5;
        var map = new hashmap(SIZE);

        map.set('elephant', 'orange');
        map.set('giraffe', 'purple');
        map.set('ostrich', 'grey');
        map.set('silver', 'surfer');
        map.set('fork', 'process');
        map.set('san', 'francisco');

        it('should get values correctly', function() {
            assert.equal(map.get('elephant'), 'orange');
            assert.equal(map.get('giraffe'), 'purple');
            assert.equal(map.get('ostrich'), 'grey');
            assert.equal(map.get('silver'), 'surfer');
            assert.equal(map.get('fork'), 'process');
            assert.equal(map.get('san'), 'francisco');
        });

        it('should return `undefined` when given an empty key value', function() {
            assert.equal(typeof map.get(''), 'undefined');
        });

        it('should retun `undefined` when given a non-string key value', function() {
            assert.equal(typeof map.get(5), 'undefined');
        });

        it('should return `undefined` when given a key not present in the hashmap', function() {
            assert.equal(typeof map.get('spencer'), 'undefined');
        });
    });

    describe('delete', function() {
        var SIZE = 5;
        var map = new hashmap(SIZE);

        map.set('elephant', 'orange');
        map.set('giraffe', 'purple');
        map.set('ostrich', 'grey');
        map.set('silver', 'surfer');
        map.set('fork', 'process');
        map.set('san', 'francisco');

        // delete nodes one at a time and check that they delete successfully

        assert.equal(map.get('elephant'), 'orange');
        map.delete('elephant');
        assert.equal(typeof map.get('elephant'), 'undefined');

        assert.equal(map.get('giraffe'), 'purple');
        map.delete('giraffe');
        assert.equal(typeof map.get('giraffe'), 'undefined');

        assert.equal(map.get('ostrich'), 'grey');
        map.delete('ostrich');
        assert.equal(typeof map.get('ostrich'), 'undefined');

        assert.equal(map.get('silver'), 'surfer');
        map.delete('silver');
        assert.equal(typeof map.get('silver'), 'undefined');

        assert.equal(map.get('fork'), 'process');
        map.delete('fork');
        assert.equal(typeof map.get('fork'), 'undefined');

        assert.equal(map.get('san'), 'francisco');
        map.delete('san');
        assert.equal(typeof map.get('san'), 'undefined');
    });

    describe('load', function() {
        it('should return the correct load for a non-zero-sized hashmap', function() {
            var SIZE = 5;
            var map = new hashmap(SIZE);

            map.set('elephant', 'orange');
            map.set('giraffe', 'purple');
            map.set('ostrich', 'grey');
            map.set('silver', 'surfer');
            map.set('fork', 'process');
            map.set('san', 'francisco');

            assert.equal((6/5), map.load());
        });

        it('should return `undefined` for a hashmap of size 0', function() {
            var SIZE = 0;
            var map = new hashmap(SIZE);
            assert.equal(map.load(), undefined);
        });
    });
});
