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

        debug() {
            console.log(buckets);
        }
    };
}

const map = createHashMap();

map.set("dog", "bark");
map.set("cat", "meow");

console.log(map.has("dog"));
console.log(map.has("cat"));
console.log(map.has("fox"));
