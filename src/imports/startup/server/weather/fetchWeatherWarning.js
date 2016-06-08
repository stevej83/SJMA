import { Meteor } from 'meteor/meteor';
import { http } from 'http';
import stringHelper from 'string';

export default function () {
  const warnHtmlSources = Meteor.settings.private.WEATHER_WARNING_URL;
  // const warnHtmlSources = Meteor.settings.private.WEATHER_WARNING_URL_TEST;

  let warnHtmlObject;
  let warnHtmlString = '';
  let warnHelpStr = '';
  let warnId = '';
  let warnIduri = '';
  let warnLength = 0;
  let strCurrWarnId = '';
  let strNextWarnId = '';
  let intCurrWarnId = 0;
  let intNextWarnId = 0;

  warnHtmlObject = stringHelper(Meteor.http.call('GET', warnHtmlSources).content);
  warnHtmlString = warnHtmlObject.toString();

  warnHelpStr = warnHtmlString.substring(warnHtmlString.indexOf('<!--Warning Codes') + 17);

  warnId = warnHelpStr.substr(0, warnHelpStr.indexOf('-->')).trim();
  if (warnId === 'NaN' || warnId === '' || warnId === null) {
    warnIduri = '0';
  } else {
    warnIduri = encodeURI(warnId);
  }

  let i = warnIduri.indexOf('%0A');

  if (i > -1) {
    strCurrWarnId = warnIduri.substr(0, warnIduri.indexOf('%0A')).trim();
  } else {
    strCurrWarnId = warnIduri;
  }

  intCurrWarnId = parseInt(strCurrWarnId, 10);

  if (intCurrWarnId > 11 || intCurrWarnId === 0) {
    intCurrWarnId = 0;
  }

  try {
    while (i >= 0) {
      intNextWarnId = parseInt(warnIduri.substr(warnIduri.indexOf('%0A') + 3).trim(), 10);
      // If the current warning code is within the warning range
      if (intCurrWarnId > 0) {
        // HKO warning code grouping - ref: http://www.hko.gov.hk/textonly/v2/explain/intro.htm
        // Check if current warning code is T8, T9 or T10
        if (intCurrWarnId > 2 && intCurrWarnId < 9) {
          intCurrWarnId = intCurrWarnId;
          // Check if next warning code if it is T8, T9 or T10
        } else if (intNextWarnId > 2 && intNextWarnId < 9) {
          intCurrWarnId = intNextWarnId;
          // Check if current warning code is black rain
        } else if (intCurrWarnId === 11) {
          intCurrWarnId = intCurrWarnId;
          // Check if next warning code is black rain
        } else if (intNextWarnId === 11) {
          intCurrWarnId = intNextWarnId;
          // Check if current warning code is T3
        } else if (intCurrWarnId === 2) {
          intCurrWarnId = intCurrWarnId;
          // Check if next warning code is T3
        } else if (intNextWarnId === 2) {
          intCurrWarnId = intNextWarnId;
          // Check if current warning code is red or yellow rain
        } else if (intCurrWarnId === 9 || intCurrWarnId === 10) {
          intCurrWarnId = intCurrWarnId;
          // Check if next warning code is red or yellow rain
        } else if (intNextWarnId === 9 || intNextWarnId === 10) {
          intCurrWarnId = intNextWarnId;
        } else {
          // No warning code in red or yellow rain
          // current warning code is T1
          intCurrWarnId = 1;
        }
        // Check if next warning code is within the warning range
      } else if (intNextWarnId > 0 && intNextWarnId < 12) {
        intCurrWarnId = intNextWarnId;
      } else {
        // If both current and next warning code out of warning range disable the warning code
        intCurrWarnId = 0;
      }

      strNextWarnId = intNextWarnId.toString();
      warnLength = warnIduri.indexOf(strNextWarnId) + strNextWarnId.length;
      warnIduri = warnIduri.substr(warnLength);
      if (warnIduri.trim() !== '') {
        i = warnIduri.indexOf('%0A');
      } else {
        i = -1;
      }
    }
    let weatherWarningId = intCurrWarnId;
    return weatherWarningId;
  } catch (e) {
    // TODO Logging
    console.log(e);
  }
}