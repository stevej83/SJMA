import React, { Component } from 'react';

export default class MonitorUiClass extends Component {
  render() {
    let kioskId = this.props.monitorUiProp.kioskId;
    let status = this.props.monitorUiProp.status;
    let kioskIdHd = 'Kiosk ID';
    let statusHd = 'Status';

    let item;
    item = <tr><td>{kioskId}</td><td>{status}</td></tr>;

    return (
      item
    );

  }
}