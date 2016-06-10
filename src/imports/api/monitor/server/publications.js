import { Meteor } from 'meteor/meteor';

import { Monitor } from '../monitorInfo.js';

// TODO piblish only path from a particular Kiosk
Meteor.publish('monitor.show', function () {
  return Monitor.find({}, {
    fields: {
      kioskId: true,
      status: true
    }
  });
});