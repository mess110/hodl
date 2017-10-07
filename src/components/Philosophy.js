import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

class Philosophy extends Component {
  state = {
    open: true,
    checked: false
  };

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [
      <RaisedButton
        label="I know what I am doing"
        primary={true}
        onClick={this.handleClose}
        disabled={!this.state.checked}
      />
    ];

    return (
      <div>
        <Dialog
          title="Hodl Wallet"
          actions={actions}
          modal={true}
          open={this.state.open}>

          <p>Think of this as a multi-coin paper wallet generator.</p>
          <p>You need another wallet to send transactions.</p>
          <p>I recommend holding your seed in something like CryptoSteel</p>
      <div>
      <Checkbox
                label="I understand"
                checked={this.state.checked}
                onCheck={this.updateCheck.bind(this)}
              />
      </div>
        </Dialog>
      </div>
    )
  }
}

export default Philosophy;
