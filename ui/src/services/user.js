// const request = require('request-promise');
// const moment = require('moment');

// const config = require('../../config.json');

const zome = 'users';

module.exports = UserService;

function UserService(holoApp) {
  this.holoApp = holoApp;
}

UserService.prototype.createUser = async function createUser(id, name) {
  const params = {};
  params.user = {
    id: id.toLowerCase().trim(),
    name: name ? name.trim() : name
  };
  return this.holoApp.call(zome, 'main', 'create_user', params);
}

UserService.prototype.allUsers = async function allUsers() {
  const params = {
    user_addr: "blah blah"
  };
  return this.holoApp.call(zome, 'main', 'all_users', params);
}

// async function read(id) {
//   id = id.toLowerCase().trim();
//   return await requestRead(id);
// }

// async function update(id, name) {
//   id = id.toLowerCase().trim();
//   name = name ? name.trim() : name;
//   return await requestUpdate(id, name);
// }

// async function destroy(id) {
//   id = id.toLowerCase().trim();
//   return await requestDestroy(id);
// }

// async function list() {
//   return await requestList();
// }

// async function requestCreate(id, name) {
//   let result = await request.post({
//     url: `${baseUrl}/userCreate`,
//     json: true,
//     body: {
//       id,
//       name
//     }
//   });
//   return result;
// }

// async function requestRead(id) {
//   let result = await request.post({
//     url: `${baseUrl}/userRead`,
//     json: true,
//     body: {
//       id
//     }
//   });
//   return result;
// }

// async function requestUpdate(id, name) {
//   let result = await request.post({
//     url: `${baseUrl}/userUpdate`,
//     json: true,
//     body: {
//       id,
//       name
//     }
//   });
//   return result;
// }

// async function requestDestroy(id) {
//   let result = await request.post({
//     url: `${baseUrl}/userDestroy`,
//     json: true,
//     body: {
//       id
//     }
//   });
//   return result;
// }

// async function requestList() {
//   let result = await request.post({
//     url: `${baseUrl}/userList`,
//     json: true
//   });
//   return result;
// }

// async function requestAll() {
//   let result = await request.post({
//     url: `${baseUrl}/userAll`,
//     json: true
//   });
//   return result;
// }
