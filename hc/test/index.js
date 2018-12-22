const test = require('tape');
const Container = require('@holochain/holochain-nodejs');

const app = Container.loadAndInstantiate('dist/bundle.json');

app.start();

test('Can create a user', (t) => {
  const create_result = app.call('user', 'main', 'create_user', {id: 'myuser1', name: 'My User 1'});
  console.log(create_result);
  t.deepEqual(create_result.address.length, 46);
  t.end();
});

test('Can create another user', (t) => {
  const create_result = app.call('user', 'main', 'create_user', {id: 'myuser2', name: 'My User 2'});
  console.log(create_result);
  t.deepEqual(create_result.address.length, 46);
  t.end();
});
