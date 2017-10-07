import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';

import './App.css';
import Bip39 from '../utils/Bip39';
import AddressList from './AddressList';
import Philosophy from './Philosophy';
import Drapes from './Drapes';

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
      open: false,
      slideIndex: 0,
      secureRandom: this.bip39.hasSecureRandom(),
      logo: undefined,
      words: this.bip39.generate(3),
      // words: 'stumble offer wisdom',
      showAddressCount: 10,
    };
  }

  componentDidMount() {
    this.chooseNetwork(this.networks[0]);
  }

  handleToggle = () => this.setState({open: !this.state.open});

  chooseNetwork = (network) => {
    this.setState({
      open: false,
      logo: this.coinPath(network),
    });

    var extKey = this.bip39.calcBip32Seed(this.state.words, network);
    this.addresses = [];
    for (var i = 0; i < this.state.showAddressCount; i++) {
      this.addresses.push(this.bip39.getAddress(extKey, i, network));
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  openDrawer = () => {
    this.setState({
      open: true,
    });
  }

  coinPath = (network) => {
    return 'images/64x64/' + network.identifier + '.png';
  }

  render() {
    return (
      <div className="App">
        <AppBar title="Hodl Wallet" onLeftIconButtonTouchTap={() => this.openDrawer()}
          style={{position: 'fixed'}}
          iconElementRight={<img src={this.state.logo} className="App-logo" alt="logo" onClick={this.handleToggle}/>}/>

        <Philosophy />

        <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
          <List>
            <MenuItem onClick={() => this.setState({slideIndex: 0, open: false})}>Addresses</MenuItem>
            <MenuItem onClick={() => this.setState({slideIndex: 1, open: false})}>Seed</MenuItem>
            <MenuItem onClick={() => this.setState({slideIndex: 2, open: false})}>Info</MenuItem>
            <Divider />
            {this.networks.map((network, i) =>
              <ListItem primaryText={network.name} key={network.name}
                onClick={() => this.chooseNetwork(network)} leftAvatar={<Avatar src={this.coinPath(network)} />}>
              </ListItem>
            )}
          </List>
        </Drawer>

        <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChange} style={{paddingTop: 64}} animateHeight={true}>
          <AddressList addresses={this.addresses}/>

          <div style={{paddingTop: 6, paddingLeft: 12, paddingRight: 12}}>
            <h3>{this.state.words}</h3>
          </div>

          <div style={{paddingTop: 6, paddingLeft: 12, paddingRight: 12}}>
            <h3>About</h3>
          </div>
        </SwipeableViews>

        <Snackbar
          open={!this.state.secureRandom}
          message="No Secure Random"/>
      </div>
    );
  }
}

export default App;
