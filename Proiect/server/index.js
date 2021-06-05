var api = require('./src/api.js').app;
const fs = require('fs');
const componentsFilepath = './src/components.json';

api.get('/', function (request, response) {
  response.json('NodeJS REST API');
});

api.get('/components', function (request, response) {
  response.json(getcomponents());
});

api.get('/components/:id', function (request, response) {
  let component = getcomponentById(request.params.id);
  if (component) response.json(component);
  response.json('not found');
});

api.put('/components', function (request, response) {
  savecomponent(request.body);
  response.json('User was saved succesfully');
});

api.post('/components', function (request, response) {
  let component = request.body;
  let components = getcomponents();
  for (let i = 0; i < components.length; i++) {
    if (components[i].id === component.id) {
      components[i] = component;
    }
  }

  try {
    fs.writeFileSync(componentsFilepath, JSON.stringify(components));
  } catch (err) {
    console.error(err);
  }
  response.json('The component was saved succesfully');
});

api.delete('/components/:index', function (request, response) {
  let components = getcomponents();

  components.splice(findInArray(request.params.index), 1);

  try {
    fs.writeFileSync(componentsFilepath, JSON.stringify(components));
  } catch (err) {
    console.error(err);
  }
  response.json('component with id ' + request.params.index + ' was deleted');
});

api.listen(3000, function () {
  console.log('Server running @ localhost:3000');
});

function getcomponents() {
  let components = [];
  try {
    components = JSON.parse(fs.readFileSync(componentsFilepath, 'utf8'));
  } catch (err) {
    console.error(err);
    return false;
  }
  return components;
}

function savecomponent(component) {
  let components = getcomponents();// citire json din fisier
  let maxId = getMaxId(components);  // get maximum id form components array
  component.id = maxId+1;// generare id unic
  components.push(component);// adaugare masina noua in array
  try {
    fs.writeFileSync(componentsFilepath, JSON.stringify(components));// salvare json array in fisier
  } catch (err) {
    console.error(err)
  }
}

function getMaxId(components) {
  let max = 0;
  for (var i=0; i<components.length;i++) {
    if(max < components[i].id) {
      max = components[i].id;
    }
  }
  return max;
}

function getcomponentById(id){
  let components = getcomponents();// citire json din fisier
  let selectedcomponent = null;
  for(var i=0; i<components.length; i++) {
    if(id == components[i].id) selectedcomponent = components[i];
  }
  return selectedcomponent;
}

function findIdInArray(id) {
  let components = getcomponents();
  for (var i = 0; i < components.length; i++) {
    if (id == components[i].id) return i;
  }
  return -1;
}