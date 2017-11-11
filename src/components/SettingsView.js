import React, { Component } from 'react';

import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';

const styles = {
  block: {
      maxWidth: 250,
    },
  toggle: {
      marginBottom: 16,
    },
  thumbOff: {
      backgroundColor: '#ffcccc',
    },
  trackOff: {
      backgroundColor: '#ff9d9d',
    },
  thumbSwitched: {
      backgroundColor: 'red',
    },
  trackSwitched: {
      backgroundColor: '#ff9d9d',
    },
  labelStyle: {
      color: 'red',
    },
};

class SettingsView extends Component {
  render() {
    return (
      <List>
        <ListItem primaryText="Danger" rightToggle={
          <Toggle
            onToggle={this.props.toggleDanger}
            toggled={this.props.danger}
            thumbStyle={styles.thumbOff}
            trackStyle={styles.trackOff}
            thumbSwitchedStyle={styles.thumbSwitched}
            trackSwitchedStyle={styles.trackSwitched}
            labelStyle={styles.labelStyle}/>
          } />
      </List>
    );
  }
}

export default SettingsView;
