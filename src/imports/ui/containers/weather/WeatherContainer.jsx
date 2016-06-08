import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Weathers } from '../../../api/weather/weatherInfo.js';

import GeneralUi from '../../components/weather/general.jsx';

class WeatherUiClass extends Component {
  renderGeneralWeather() {
    return this.props.weathersAppUiVar.map((weatherCollectionVar) => (
      <GeneralUi key={weatherCollectionVar._id} weatherUiProp={weatherCollectionVar} />
    ));
  }

  render() {
    return (
      <div>
        {this.renderGeneralWeather()}
      </div>
    );
  }
}

export default createContainer(() => {
  let handle = Meteor.subscribe('weather.show');
  const r1 = Weathers.find({city: 'Hong Kong'}).fetch();
  return {
    loading: !handle.ready(),
    path1: (handle.ready() && r1) ? r1.path1 : '',

    weathersAppUiVar: r1,
  };
}, WeatherUiClass);
