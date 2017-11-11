import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton';

import Address from './Address.js';
import Bip39 from '../utils/Bip39';
import Balance from './Balance';

import './AddressView.css';

class AddressView extends Component {
  constructor(props) {
    super(props);
    this.bip39 = new Bip39();
    this.state = {
      addressIndex: 0,
      address: this.bip39.blankKey(),
      networks: this.bip39.getNetworks(),
      slideIndex: 0,
    };
  }

  componentDidMount() {
    this.chooseNetwork(this.state.networks[0]);
  }

  chooseNetwork(network) {
    this.setState({
      open: false,
      network: network,
    });
    this.updateAddress(undefined, 0, network);
    if (this.balance) {
      this.balance.estimateFee(network);
    }
  }

  updateAddress(event, inputValue, network) {
    if (network === undefined) {
      network = this.state.network;
    }

    var value = parseInt(inputValue, 0);
    if (!Number.isInteger(value)) {
      console.error('NaN');
      return;
    }

    var extKey = this.bip39.calcBip32Seed(this.props.words, this.props.passphrase, network);
    var address = this.bip39.getAddress(extKey, value, network);

    this.setState({
      addressIndex: value,
      address: address,
    })
  }

  handlePrev() {
    var prev = this.state.addressIndex - 1;
    this.updateAddress(undefined, prev);
  }

  handleNext() {
    var next = this.state.addressIndex + 1;
    this.updateAddress(undefined, next);
  }

  copyText() {
    return this.state.address.pubKey;
  }

  render() {
    return (
      <div>
        <div style={{paddingTop: 6, paddingLeft: 12, paddingRight: 12}}>
          <SwipeableViews index={this.state.slideIndex}>

            <Balance ref={instance => { this.balance = instance; }}/>

            <div style={{textAlign: 'center'}}>
              <Address text={this.state.address.pubKey} />

              <div style={{marginTop: 12, textAlign: 'center'}}>
                <RaisedButton
                  className="prev"
                  disabled={this.state.addressIndex === 0}
                  label="Prev"
                  primary={true}
                  onClick={() => { this.handlePrev() }}/>

                <TextField
                  className="addressIndex"
                  type="number"
                  hintText="Index"
                  fullWidth={false}
                  onChange={(event, value) => { this.updateAddress(event, value) } }
                  value={this.state.addressIndex}/>

                <RaisedButton
                  className="next"
                  label="Next"
                  primary={true}
                  onClick={() => { this.handleNext() }}/>

              </div>
            </div>

            <Address text={this.state.address.privKey}/>

          </SwipeableViews>
        </div>
      </div>
    );
  }
}

export default AddressView;
