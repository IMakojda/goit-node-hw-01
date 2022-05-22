const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json')
// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код
  const dataStr = await fs.readFile(contactsPath, 'utf-8');
  const dataParse = JSON.parse(dataStr);
  return dataParse;
}

async function getContactById(id) {
  // ...твій код
  const allContacts = await listContacts();
  const productById = allContacts.find(product => product.id === id);
  return productById ? productById : null;
}

async function removeContact(id) {
  // ...твій код
  const allContacts = await listContacts();
  const productById = allContacts.find(product => product.id === id);
  console.log(productById);
  if (productById) {
    const newArray = allContacts.filter((contacts) => { return contacts.id !== id })
    await fs.writeFile(contactsPath, JSON.stringify(newArray));
    console.log(`Contacts whith id-${id} was deleted!`);
  }
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();

  if (
    allContacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) ||
    allContacts.find(contact => contact.phone === phone)
  ) {
    return console.log('This name or number already exists');
  }

  const newProduct = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  }

  allContacts.push(newProduct);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  console.log(`Contacts ${name} -- ${phone} -- ${email} was added!`);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact
}