import { Meteor } from 'meteor/meteor';

import { Weathers } from '../../../api/weather/weatherInfo.js';

import { default as getWeatherWarningId } from './fetchWeatherWarning.js';

import { default as getWeatherInfo } from './fetchWeatherInfo.js';

Meteor.setInterval((function () {
  let weatherWarningId = getWeatherWarningId();
  let weatherInfo = getWeatherInfo();
  let weatherId = weatherInfo[0];
  let temperature = weatherInfo[1];
  let humidity = weatherInfo[2];

  let iconIdInt = 0;
  if (weatherWarningId !== 0) {
    // HKO warning code - ref: http://www.hko.gov.hk/textonly/v2/explain/intro.htm
    iconIdInt = weatherWarningId;
  } else {
    // HKO weather code grouping - ref: http://www.weather.gov.hk/textonly/explain/wxicon_e.htm
    switch (weatherId) {
      // 50 Sunny, 51 Sunny Periods, 52 Sunny Intervals into icon 12 - sunny icon
      case 50:
      case 51:
      case 52:
        iconIdInt = 12;
        break;
      // 60 Cloudy, 61 Overcast, 76 Mainly Cloudy, 83 Fog, 84 Mist, 85 Haze into icon 13 - cloudy
      case 60:
      case 61:
      case 76:
      case 83:
      case 84:
      case 85:
        iconIdInt = 13;
        break;
      // 53 Sunny Periods with A Few Showers, 54 Sunny Intervals with Showers into icon 14 - sunny with showers
      case 53:
      case 54:
        iconIdInt = 14;
        break;
      // 62 Light Rain, 63 Rain, 64 Heavy Rain into icon 15 - rain
      case 62:
      case 63:
      case 64:
        iconIdInt = 15;
        break;
      // 65 Thunderstorms into icon 16 - thunderstorms
      case 65:
        iconIdInt = 16;
        break;
      // 70, 71, 72, 73, 74, 75, 77 Fine During the Night into icon 17 - fine at night,
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      case 77:
        iconIdInt = 17;
        break;
      // 80  Windy into icon 18 - windy
      case 80:
        iconIdInt = 18;
        break;
      default:
        iconIdInt = 0;
      // ungroup icons include:
      // 81 Dry, 82 Humid, 90 Hot, 91 Warm, 92 Cool, 93 Cold
    }
  }

  let img = Meteor.settings.private.WEATHER_IMG_PATH + iconIdInt + Meteor.settings.private.IMG_FORMAT;

  if (temperature && humidity) {
    Weathers.upsert({ city: 'Hong Kong' }, { $set: { temperature: temperature, humidity: humidity, img: img } },
      function (error) {
        if (error) {
          console.log(error);
        }
      });
  }
}), Meteor.settings.private.WEATHERINFO_INTERVAL);