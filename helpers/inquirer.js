const inquirer = require('inquirer');
require('colors');

const askOpt = [
  {
    type: 'list',
    name: 'opt',
    message: 'Que desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1'.green}. Buscan ciudad`,
      },
      {
        value: 2,
        name: `${'2'.green}. Historial`,
      },
      {
        value: 0,
        name: `${'0'.green}. Salir`,
      },
    ],
  },
];
const inquirerMenu = async () => {
  console.clear();
  console.log('========================'.green);
  console.log(' Seleccione una Opcion  '.white);
  console.log('========================\n'.green);

  const { opt } = await inquirer.prompt(askOpt);
  return opt;
};

const pause = async () => {
  question = [
    {
      type: 'input',
      name: 'inputOpt',
      message: `Presione ${'ENTER'.green} para continuar`,
    },
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) return 'Por favor ingrese una opción';
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    };
  });
  choices.unshift({
    value: '0',
    name: '0'.green + ' Cancelar',
  });
  const question = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione lugar',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(question);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completeIn ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  confirm,
  listPlaces,
  inquirerMenu,
  pause,
  readInput,
  showListChecklist,
};
