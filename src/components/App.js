import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Snackbar from 'material-ui/Snackbar';

import './App.css';
import logo from '../logo.svg';
import Bip39 from '../utils/Bip39';
import AddressList from './AddressList';

if (process.env.NODE_ENV === 'production') {
  XMLHttpRequest.prototype.send = function() {
    return false;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.bip39 = new Bip39();
    this.networks = this.bip39.getNetworks();
    this.addresses = [];
    this.state = {
      open: true,
      slideIndex: 0,
      secureRandom: this.bip39.hasSecureRandom(),
      logo: logo,
      words: this.bip39.generate(3),
      // words: 'stumble offer wisdom',
      showAddressCount: 10,
      networkName: '',
      networkIndex: 0, // bitcoin
    };

  }

  handleToggle = () => this.setState({open: !this.state.open});

  chooseNetwork = (network) => {
    this.setState({
      open: false,
      networkName: network.name,
      networkIndex: this.networks.indexOf(network),
      logo: this.coinPath(network),
    });

    var extKey = this.bip39.calcBip32Seed(this.state.words, this.state.networkIndex);
    this.addresses = [];
    for (var i = 0; i < this.state.showAddressCount; i++) {
      this.addresses.push(this.bip39.getAddress(extKey, i, this.state.networkIndex));
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  coinPath = (network) => {
    return 'images/128x128/' + network.identifier + '.png';
  }

  render() {
    return (
      <div className="App">

        <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
          <List>
            {this.networks.map((network, i) =>
              <ListItem style={{textAlign: 'left'}} primaryText={network.name} key={network.name}
                onClick={() => this.chooseNetwork(network)} leftAvatar={<Avatar src={this.coinPath(network)} />}>
              </ListItem>
            )}
          </List>
        </Drawer>

        <img src={this.state.logo} className="App-logo" alt="logo" onClick={this.handleToggle}/>

        <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange}>

          <div className="App-header">
            <h2>Hodl {this.state.networkName}</h2>
            <h3>{this.state.words}</h3>
          </div>

          <AddressList addresses={this.addresses}/>
        </SwipeableViews>

        <Snackbar
          open={!this.state.secureRandom}
          message="No Secure Random"/>

        <Tabs onChange={this.handleChange} value={this.state.slideIndex} className="push-bottom">
          <Tab label="Mnemonic" value={0} />
          <Tab label="Addresses" value={1} />
        </Tabs>
      </div>
    );
  }
}

export default App;
