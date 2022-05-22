const operations = require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await operations.listContacts();
      console.log('getAll', data);
      break;

    case "get":
      const product = await operations.getContactById(id);
      console.log('getById', product);
      break;

    case "add":
      await operations.addContact(name, email, phone);

      break;

    case "remove":
      await operations.removeContact(id);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);