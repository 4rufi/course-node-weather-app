const fs = require('fs');
const axios = require('axios');

class Searches {
  historial = [];
  dbPath = './db/db.json';
  constructor() {
    this.readDB();
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MADBOX_KEY,
      limit: '6',
      language: 'es',
    };
  }

  get paramsWeather() {
    return {
      appid: '8d4d31707fca5482d1384d10306dae3e',
      units: 'metric',
      lang: 'es',
    };
  }

  get historialCapitize() {
    return this.historial.map((place) => {
      let words = place.split(' ');
      words = words.map((p) => p[0].toUpperCase() + p.substring(1));
      return words.join(' ');
    });
  }
  async citys(place = '') {
    try {
      // petición http
      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await intance.get();
      return resp.data.features.map((placeData) => ({
        id: placeData.id,
        name: placeData.place_name,
        lng: placeData.center[0],
        lat: placeData.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherPlace(lat = '', lon = '') {
    try {
      const intance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });

      const { data } = await intance.get();
      const { weather, main } = data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {}
  }

  addHistorial(place = '') {
    if (this.historial.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(5);
    this.historial.unshift(place.toLocaleLowerCase());
    this.saveDb();
  }

  saveDb() {
    const payload = {
      historia: this.historial,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) {
      return;
    }
    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
    const { historia } = JSON.parse(info);
    this.historial = historia;
  }
}

module.exports = Searches;
