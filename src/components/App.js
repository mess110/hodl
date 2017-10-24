import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List/List';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Spa from 'material-ui/svg-icons/places/spa';
import Settings from 'material-ui/svg-icons/action/settings';
import Help from 'material-ui/svg-icons/action/help';

import Bip39 from '../utils/Bip39';
import Philosophy from './Philosophy';
import SeedView from './SeedView';
import SeedMenu from './SeedMenu';
import AddressView from './AddressView';
import SettingsView from './SettingsView';

window.DEFAULT_WORD_COUNT = 12;

if (process.env.NODE_ENV === 'production') {
  XMLHttpRequest.prototype.open = function() {
    return false;
  }
  XMLHttpRequest.prototype.send = function() {
    return false;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.bip39 = new Bip39();
    var networks = this.bip39.getNetworks();
    this.state = {
      open: false,
      slideIndex: 0,
      secureRandom: this.bip39.hasSecureRandom(),
      // words: this.bip39.generate(window.DEFAULT_WORD_COUNT),
      words: 'stumble offer wisdom',
      networks: networks,
      passphrase: '',
    };


    this.changeWords = this.changeWords.bind(this);
    this.changePassphrase = this.changePassphrase.bind(this);
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  changeWords(words) {
    this.setState({
      words: words,
    });
  }

  changePassphrase(passphrase) {
    this.setState({
      passphrase: passphrase,
    });
  }

  chooseNetwork(network) {
    this.setState({
      open: false,
      slideIndex: 0,
    });
    this.addressView.chooseNetwork(network);
  }

  handleChange(value) {
    this.setState({
      slideIndex: value,
    });
  };

  openDrawer() {
    this.setState({
      open: true,
    });
  }

  coinPath(network) {
    return 'images/logos/' + network.identifier + '.png';
  }

  paste() {
    console.log('hello')
    this.setState({
      words: 'pizza pizza pizza'
    })
  }

  render() {
    return (
      <div className="App">
        <AppBar title="Hodl Wallet"
          onLeftIconButtonTouchTap={() => this.openDrawer()}
          iconElementRight={this.state.slideIndex === 1 ? <SeedMenu changeWords={this.changeWords}/> : undefined }
          style={{position: 'fixed'}}
        />

        <Philosophy ref={instance => { this.philosophy = instance; }}/>

        <Drawer
          open={this.state.open}
          docked={false}
          onRequestChange={(open) => this.setState({open})}>

          <List>
            {this.state.networks.map((network, i) =>
              <MenuItem
                key={network.name}
                onClick={() => { this.chooseNetwork(network); }}
                leftIcon={<Avatar src={this.coinPath(network)} style={{height: 24, width: 24}}/>}
                primaryText={network.name} />
            )}
            <Divider />
            <MenuItem
              onClick={() => this.setState({slideIndex: 1, open: false})}
              leftIcon={<Spa />}
              primaryText="Seed" />
            <MenuItem
              onClick={() => this.setState({slideIndex: 2, open: false})}
              leftIcon={<Settings />}
              primaryText="Settings" />
            <MenuItem
              onClick={() => this.philosophy.handleOpen() }
              leftIcon={<Help />}
              primaryText="About" />
          </List>

        </Drawer>

        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
          style={{paddingTop: 64}}
          animateHeight={true}
          disabled={true}>

          <AddressView
            words={this.state.words}
            passphrase={this.state.passphrase}
            ref={instance => { this.addressView = instance; }} />

          <SeedView
            words={this.state.words}
            changeWords={this.changeWords}
            changePassphrase={this.changePassphrase}/>

          <SettingsView />

        </SwipeableViews>

        <Snackbar open={!this.state.secureRandom} message="No Secure Random"/>
      </div>
    );
  }
}

export default App;
