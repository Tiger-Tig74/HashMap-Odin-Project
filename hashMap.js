const INITIAL_CAPACITY = 16;
const LOAD_FACTOR = 0.75;

export class HashMap {
    constructor(loadFactor = LOAD_FACTOR, capacity = INITIAL_CAPACITY) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(capacity).fill(null).map(() => []);
        this.count = 0;
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    #checkIndex(index) {
        if (index < 0 || index >= this.buckets.length) {
            throw new Error('Trying to access index out of bounds');
        }
    }

    #bucketAt(key) {
        const index = this.hash(key);
        this.#checkIndex(index);
        return this.buckets[index];
    }

    set(key, value) {
        const bucket = this.#bucketAt(key);

        for (const entry of bucket) {
            if (entry[0] === key) {
                entry[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.count++;

        if (this.count > this.capacity * this.loadFactor) {
            this.#grow();
        }
    }

    get(key) {
        const bucket = this.#bucketAt(key);
        for (const [k, v] of bucket) {
            if (k === key) return v;
        }
        return undefined;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    remove(key) {
        const bucket = this.#bucketAt(key);
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.count;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.count = 0;
    }

    keys() {
        return this.buckets.flat().map(([k]) => k);
    }

    values() {
        return this.buckets.flat().map(([, v]) => v);
    }

    entries() {
        return this.buckets.flat().map(([k, v]) => [k, v]);
    }

    #grow() {
        const oldEntries = this.entries();
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.count = 0;

        for (const [key, value] of oldEntries) {
            this.set(key, value);
        }
    }
}