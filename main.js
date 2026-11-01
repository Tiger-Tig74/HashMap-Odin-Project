import { HashMap } from './hashMap.js';

const test = new HashMap();

console.log('\n--- HashMap Tests ---');
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('After 12 sets:');
console.log('  length:', test.length());
console.log('  capacity:', test.capacity);
console.log('  load:', test.length() / test.capacity);

test.set('apple', 'green');
test.set('lion', 'tawny');

console.log('\nAfter overwrites:');
console.log('  length:', test.length());
console.log('  capacity:', test.capacity);
console.log('  apple:', test.get('apple'));
console.log('  lion:', test.get('lion'));

test.set('moon', 'silver');

console.log('\nAfter growth (set moon):');
console.log('  length:', test.length());
console.log('  capacity:', test.capacity);
console.log('  load:', test.length() / test.capacity);

test.set('moon', 'white');
console.log('\nAfter overwrite post-growth:');
console.log('  moon:', test.get('moon'));
console.log('  length:', test.length());
console.log('  capacity:', test.capacity);

console.log('\nhas("apple"):', test.has('apple'));
console.log('has("zebra"):', test.has('zebra'));
console.log('get("zebra"):', test.get('zebra'));
console.log('remove("hat"):', test.remove('hat'));
console.log('remove("hat"):', test.remove('hat'));
console.log('length after remove:', test.length());

console.log('\nkeys():', test.keys());
console.log('\nvalues():', test.values());
console.log('\nentries():', test.entries());

test.clear();
console.log('\nAfter clear:');
console.log('  length:', test.length());
console.log('  capacity:', test.capacity);
console.log('  entries():', test.entries());


import { HashSet } from './hashSet.js';

console.log('\n--- HashSet Tests ---');
const set = new HashSet();
set.add('apple');
set.add('apple');
console.log(set.length());
console.log(set.has('apple'));
set.remove('apple');
console.log(set.has('apple')); 