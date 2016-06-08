import React, { Component } from 'react';

export default class WeatherUiClass extends Component {
  render() {
    let temperature = this.props.weatherUiProp.temperature;
    let humidity = this.props.weatherUiProp.humidity;
    let imgLink = this.props.weatherUiProp.img;
    let img = <img src={imgLink} width="30px" height="30px" />;

    let item;
    item = <span>{temperature}'C, {humidity}%, {img}</span>;

    return (
      item
    );

  }
}