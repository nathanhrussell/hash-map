function createHashMap(size = 101) {
    const buckets = new Array(size).fill(null).map(() => []);


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
        },

        debug() {
            console.log(buckets);
        }
    };
}

const map = createHashMap();

map.set("apple", 100);
map.set("banana", 200);
map.set("apple", 150);

map.debug();
