import { Meteor } from 'meteor/meteor';

import { Monitor } from '../../../api/monitor/monitorInfo.js';

import { default as getKioskId } from './getKioskId.js';

// import { default as getWeatherInfo } from './fetchWeatherInfo.js';

Meteor.setInterval((function () {
  console.log(getKioskId());

  // let checkResult = getCheckResult();  // not yet finished
  // let kioskId = getKioskId();  // not yet finished
  // let status = getStatus();  // not yet finished test
  let checkResult = 1;
  let kioskId = 12345;
  let status = 1;

  if (checkResult !== 0) {
    status = checkResult;
  }


  // method from client check if this kiosk id in the collection, if not insert record
  if (kioskId) {
    Monitor.upsert({ kioskId: 'test123' }, { $set: { status: 0 } },
      function (error) {
        if (error) {
          console.log(error);
        }
      });
  }
}), Meteor.settings.private.MONITORINFO_INTERVAL);