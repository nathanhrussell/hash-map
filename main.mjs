function createHashMap(size = 16) {
    let buckets = new Array(size).fill(null).map(() => []);
    let count = 0;
    const loadFactor = 0.75;

    function hashforResize(key, newSize) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % newSize;
        }

        return hashCode;
    }

    function resize() {
        const newSize = buckets.length * 2;
        const newBuckets = new Array(newSize).fill(null).map(() => []);

        for (const bucket of buckets) {
            for (const [key, value] of bucket) {
                const index = hashforResize(key, newSize);
                newBuckets[index].push([key, value]);
            }
        }

        buckets = newBuckets;
    }


    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
        }

        return hashCode;
    }

    return {
        set(key, value) {
            const index = hash(key);
            const bucket = buckets[index];

            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket[i][1] = value;
                    return
                }
            }

            bucket.push([key, value]);
            count++;

            if (count / buckets.length > loadFactor) {
                resize();
            }
        },

        get(key) {
            const index = hash(key);
            const bucket = buckets[index];

            for (let i = 0; i < bucket.length; i++) {
                const [k, v] = bucket[i];
                if (k === key) {
                    return v;
                }
                }
            return null;
            },

        has(key) {
            const index = hash(key);
            const bucket = buckets[index];

            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    return true;
                }
            }

            return false;
        },

        remove(key) {
            const index = hash(key);
            const bucket = buckets[index];

            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    bucket.splice(i, 1);
                    count--;
                    return true
                }
            }

            return false;
        },

        length() {
            return count;
        },

        clear() {
            buckets = new Array(size).fill(null).map(() => []);
            count = 0;
        },

        keys() {
            const allKeys = [];

            for (const bucket of buckets) {
                for (const [key, _] of bucket) {
                    allKeys.push(key);
                }
            }

            return allKeys;
        },

        values() {
            const allValues = [];
        
            for (const bucket of buckets) {
              for (const [_, value] of bucket) {
                allValues.push(value);
              }
            }
        
            return allValues;
          },

          entries() {
            const allEntries = [];
          
            for (const bucket of buckets) {
              for (const [key, value] of bucket) {
                allEntries.push([key, value]);
              }
            }
          
            return allEntries;
          },

          load() {
            return count / buckets.length;
          },

        debug() {
            console.log(buckets);
        },

    };
}

export default createHashMap;