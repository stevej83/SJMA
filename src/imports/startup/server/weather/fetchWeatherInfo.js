import { Meteor } from 'meteor/meteor';
import { http } from 'http';
import stringHelper from 'string';
import xml2js from 'xml2js';

export default function () {
  const weatherXmlSources = [Meteor.settings.private.WEATHER_INFO_URL];
  let parser = new xml2js.Parser();
  let parsedXml = [];
  let weatherXmlContent = '';

  try {
    for (let i = 0; i < weatherXmlSources.length; i++) {
      let result = Meteor.http.call('GET', weatherXmlSources[i]);

      if (result.statusCode === 200 && result.content) {
        weatherXmlContent += result.content;
      }
    }
  } catch (e) {
    // TODO: Logging
    console.log(e);
  }

  let weatherXmlObject;
  let weatherXmlString = '';
  let weatherHelpStr = '';
  let weatherIdResult = '';
  let temperatureResult = '';
  let humidityResult = '';

  try {
    parser.parseString(weatherXmlContent, function (error, result) {
      if (error) {
        // TODO: Logging
        console.log(error);
      } else if (result && result.rss) {
        weatherXmlObject = stringHelper(result.rss.channel[0].item[0].description[0]);
        weatherXmlString = weatherXmlObject.toString();
        weatherHelpStr = weatherXmlString.substring(weatherXmlString.indexOf('rss.weather.gov.hk/img/') + 26);
        weatherIdResult = weatherHelpStr.substr(0, weatherHelpStr.indexOf('.')).trim();
        weatherHelpStr = weatherXmlString.substring(weatherXmlString.indexOf('Air temperature :') + 18);
        temperatureResult = weatherHelpStr.substr(0, weatherHelpStr.indexOf('d')).trim();
        weatherHelpStr = weatherXmlString.substring(weatherXmlString.indexOf('Relative Humidity :') + 19);
        humidityResult = weatherHelpStr.substr(0, weatherHelpStr.indexOf('p')).trim();
      }
    });
  } catch (e) {
    // TODO: Logging
    console.log(e);
  }

  let weatherId = parseInt(weatherIdResult, 10);
  let temperature = parseInt(temperatureResult, 10);
  let humidity = parseInt(humidityResult, 10);

  let list = new Array(3);
  list[0] = weatherId;
  list[1] = temperature;
  list[2] = humidity;

  return list;
}