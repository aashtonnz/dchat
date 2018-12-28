const test = require('tape');
const Container = require('@holochain/holochain-nodejs');

const app = Container.loadAndInstantiate('dist/bundle.json');

app.start();

test('Can create a user', (t) => {
  const params = {
      id: 'myuser1',
      name: ''
  };
  let result = app.call('user', 'main', 'create_user', params);
  result.entry = JSON.parse(result.entry);
  t.assert(isHash(result.address), 'Hash');
  t.equal(result.entry.id, params.id, 'Id');
  t.equal(result.entry.name, params.name, 'Name');
  t.end(); // Also need to check creation date and agent id
});

test('Can create a user with a name', (t) => {
  const params = {
    id: 'myuser2',
    name: 'My User 2'
  };
  let result = app.call('user', 'main', 'create_user', params);
  result.entry = JSON.parse(result.entry);
  t.assert(isHash(result.address), 'Hash');
  t.deepEqual(result.entry.id, params.id, 'Id');
  t.deepEqual(result.entry.name, params.name, 'Name');
  t.end(); // Also need to check creation date and agent id
});

// test('Cannot create an existing user', (t) => {
//   const params = {
//     id: 'myuser1',
//     name: 'My User 1'
//   };
//   const result = app.call('user', 'main', 'create_user', params);
//   t.end(); // Also need to check creation date and agent id
// });

test('Can list my users', (t) => {
    const params = {};
    let result = app.call('user', 'main', 'get_my_users', params);
    result = result.map(user => user.id);
    result.sort();
    t.deepEqual(result, ['myuser1', 'myuser2'], 'Users');
    t.end();
  });

function isHash(string) {
    const matches = string.match(/[0-9a-zA-Z]{46}/);
    return matches.length > 0;
}
