import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Monitor } from '../../../api/monitor/monitorInfo.js';

import MonitorUi from '../../components/monitor/monitor.jsx';

class MonitorUiClass extends Component {
  renderMonitorInfo() {
    return this.props.monitorAppUiVar.map((monitorCollectionVar) => (
      <MonitorUi key={monitorCollectionVar._id} monitorUiProp={monitorCollectionVar} />
    ));
  }

  render() {
    return (
      <div>
        <table>
          <thead>
          <tr>
            <th>Kiosk Id</th>
            <th>Status</th>
          </tr>
          </thead>
          <tbody>
          {this.renderMonitorInfo()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default createContainer(() => {
  let handle = Meteor.subscribe('monitor.show');
  const r1 = Monitor.find().fetch();
  return {
    loading: !handle.ready(),
    path1: (handle.ready() && r1) ? r1.path1 : '',

    monitorAppUiVar: r1,
  };
}, MonitorUiClass);
