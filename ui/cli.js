#!/usr/bin/env node
const package = require('./package.json');
const UserService = require('./src/services/user');

const program = require('commander');
const Container = require('@holochain/holochain-nodejs');

const holoApp = Container.loadAndInstantiate("../hc/dist/bundle.json")
const userService = new UserService(holoApp);

program
  .version(package.version);

program
  .command('user [id] [name]')
  .option('-c, --create', 'Create a new user')
  .option('-r, --read', 'Read information about a user')
  .option('-u, --update', 'Update a user')
  .option('-d, --destroy', 'Destroy a user')
  .option('-l, --list', 'List my users')
  .option('-a, --all', 'List all users')
  .description('Switch to this user')
  .action(async (id, name, options) => {
    try {
      let result = null;
      if (options.create && id) {
        result = await userService.createUser(id, name);
      }
      //       if (options.read && id) {
      //         result = await userService.read(id);
      //       }
      //       if (options.update && id) {
      //         result = await userService.update(id, name);
      //       }
      //       if (options.destroy && id) {
      //         result = await userService.destroy(id);
      //       }
      //       if (options.list) {
      //         result = await userService.list();
      //       }
      if (options.all) {
        result = await userService.allUsers(id, name);
      }
      if (result !== null) {
        console.log(result);
      }
      process.exit(0);
    } catch (exception) {
      console.log(exception);
      process.exit(1);
    }
  });

holoApp.start();
program.parse(process.argv);
holoApp.stop();