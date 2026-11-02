'use strict';
const Homey = require('homey');
const calculations = require('./lib/calculations');

class App extends Homey.App {
  async onInit() {
    this.homey.flow.getActionCard('calculate_dew_point')
      .registerRunListener(async args => calculations.dewPoint(args.room_temp_c, args.humidity_percent));
    this.homey.flow.getActionCard('check_surface_margin')
      .registerRunListener(async args => calculations.moistureContext(args.room_temp_c, args.humidity_percent, args.surface_temp_c));
    this.homey.flow.getConditionCard('condensation_risk')
      .registerRunListener(async args => calculations.condensationRisk(args.room_temp_c, args.humidity_percent, args.surface_temp_c, args.minimum_margin_c));
    this.homey.flow.getConditionCard('humidity_above')
      .registerRunListener(async args => calculations.humidityAbove(args.humidity_percent, args.threshold_percent));
  }
}

module.exports = App;
