import React from 'react';
import { Link } from 'react-router';
import WeatherContainer from '../containers/weather/WeatherContainer.jsx';
import MonitorContainer from '../containers/monitor/MonitorContainer.jsx';

export default MainLayout = () => {
  return (
    <div id='devBlock'>
      <WeatherContainer />
      <MonitorContainer />
    </div>
  );
};
