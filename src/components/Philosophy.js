import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

class Philosophy extends Component {
  state = {
    open: process.env.NODE_ENV === 'production',
    checked: false,
    disabled: false,
  };

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
  }

  handleClose() {
    this.setState({open: false});
  };

  handleOpen() {
    this.setState({open: true, checked: true, disabled: true });
  }

  render() {
    const actions = [
      <RaisedButton
        label={this.state.disabled === true ? "Ok" : "I know what I am doing"}
        primary={true}
        onClick={() => { this.handleClose() }}
        disabled={!this.state.checked} />
    ];

    return (
      <div>
        <Dialog
          title="Hodl Wallet"
          actions={actions}
          modal={true}
          autoScrollBodyContent={true}
          open={this.state.open}>

          <p><b>This is experimental software, use at your own risk</b></p>
          <p>Nothing is persisted</p>
          <p>All network connections are blocked</p>
          <p>Think of this as a multi-coin paper wallet generator</p>
          <p>You need another wallet to send transactions</p>
          <p>I recommend holding your seed in something like CryptoSteel</p>

          <div>
          { this.state.disabled ? null : <Checkbox
            label="I understand"
            checked={this.state.checked}
            disabled={this.state.disabled}
            onCheck={this.updateCheck.bind(this)}/>
          }
          </div>

        </Dialog>
      </div>
    )
  }
}

export default Philosophy;
