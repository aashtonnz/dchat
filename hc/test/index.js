const test = require('tape');
const Container = require('@holochain/holochain-nodejs');

const app = Container.loadAndInstantiate('dist/bundle.json');

app.start();

test('Can create a user', (t) => {
  const create_result = app.call('user', 'main', 'create_user', {id: 'myuser1', name: 'My User'});
  console.log(create_result);
  t.equal(create_result.success, true);
  t.end();
});
