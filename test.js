import { HashMap } from './hashMap.js';

let passed = 0;
let failed = 0;

function assertEqual(actual, expected, label) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a === e) passed++;
    else {
        failed++;
        console.error(`[Error] ${label}\n   expected: ${e}\n   actual:   ${a}`);
    }
}

{
    const m = new HashMap();
    assertEqual(m.length(), 0, 'empty length');
    assertEqual(m.get('x'), undefined, 'empty get');
    assertEqual(m.has('x'), false, 'empty has');
    assertEqual(m.remove('x'), false, 'empty remove');
    assertEqual(m.keys(), [], 'empty keys');
    assertEqual(m.values(), [], 'empty values');
    assertEqual(m.entries(), [], 'empty entries');
    assertEqual(m.capacity, 16, 'default capacity');
}

{
    const m = new HashMap();
    m.set('a', 1);
    m.set('a', 2);
    assertEqual(m.length(), 1, 'set same key updates, not adds');
    assertEqual(m.get('a'), 2, 'set same key overwrites value');

    const m2 = new HashMap(0.75, 4);
    const buckets = new Map();
    let collided = false;
    for (let i = 0; i < 100 && !collided; i++) {
        const k = `k${i}`;
        const idx = m2.hash(k);
        if (buckets.has(idx) && buckets.get(idx) !== k) {
            const other = buckets.get(idx);
            m2.set(other, 'first');
            m2.set(k, 'second');
            assertEqual(m2.length(), 2, 'collision stores two entries');
            assertEqual(m2.get(other), 'first', 'collision preserves first');
            assertEqual(m2.get(k), 'second', 'collision preserves second');
            collided = true;
        } else {
            buckets.set(idx, k);
        }
    }
    if (!collided) console.warn('[Warning]  could not force a collision to test');
}

{
    const m = new HashMap();
    for (let i = 0; i < 12; i++) m.set(`k${i}`, i);
    assertEqual(m.capacity, 16, 'no growth at exactly 0.75');
    m.set('trigger', 'boom');
    assertEqual(m.capacity, 32, 'growth doubles capacity');
    assertEqual(m.length(), 13, 'growth preserves count');
    for (let i = 0; i < 12; i++) {
        assertEqual(m.get(`k${i}`), i, `post-growth get k${i}`);
    }
}

{
    const m = new HashMap();
    m.set('a', 1);
    m.set('b', 2);
    m.clear();
    assertEqual(m.length(), 0, 'clear resets length');
    assertEqual(m.get('a'), undefined, 'clear removes entries');
    assertEqual(m.keys(), [], 'clear keys empty');
}

{
    const m = new HashMap();
    m.set('u', undefined);
    assertEqual(m.has('u'), false, 'simple has treats undefined as absent');
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exitCode = 1;