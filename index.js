const {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
} = require('./helpers/inquirer');
const Searches = require('./models/searches');
require('dotenv').config();

const main = async () => {
  let opt;
  const searches = new Searches();
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const place = await readInput('Ciudad: ');
        const places = await searches.citys(place);
        const id = await listPlaces(places);

        if (id === 0) continue;

        const selectedPlace = places.find((p) => p.id === id);
        const { name, lat, lng } = selectedPlace;
        searches.addHistorial(name);
        const weatherPlace = await searches.weatherPlace(lat, lng);
        const { desc, min, max, temp } = weatherPlace;
        console.log('========================'.green);
        console.log('\nInformación de la ciudad\n'.white);
        console.log('========================\n'.green);
        console.log('Ciudad: ', name.green);
        console.log('Lat: ', lat);
        console.log('Lng: ', lng);
        console.log('Temperatura: ', temp);
        console.log('Mínima: ', min);
        console.log('Maxima: ', max);
        console.log('Como esta el clima: ', desc.green);
        break;

      case 2:
        searches.historialCapitize.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
