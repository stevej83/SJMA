import { Meteor } from 'meteor/meteor';

export default function () {
  /*try {
    for (let i = 0; i < weatherXmlSources.length; i++) {
      let result = Meteor.http.call('GET', weatherXmlSources[i]);

      if (result.statusCode === 200 && result.content) {
        weatherXmlContent += result.content;
      }
    }
  } catch (e) {
    // TODO: Logging
    console.log(e);
  }*/

  //let kioskId = Meteor.connection._lastSessionId;
  let kioskId = '123test';

  /*let list = new Array(3);
  list[0] = weatherId;
  list[1] = temperature;
  list[2] = humidity;*/

  return kioskId;
}