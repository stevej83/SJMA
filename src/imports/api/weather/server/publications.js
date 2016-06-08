import { Meteor } from 'meteor/meteor';

import { Weathers } from '../weatherInfo.js';

// TODO piblish only path from a particular Kiosk
Meteor.publish('weather.show', function () {
  return Weathers.find({}, {
    fields: {
      city: true,
      temperature: true,
      humidity: true,
      img: true
    }
  });
});