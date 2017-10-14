import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import QrReader from 'react-qr-reader';
import TextField from 'material-ui/TextField';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class SeedMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scanQR: false,
      pasteSeed: false,
      delay: 100,
      result: 'no result',
      found: false,
    }
  }

  handleClose() {
    this.setState({
      scanQR: false,
      pasteSeed: false,
      found: false,
    });
  };


  paste() {
    this.setState({
      pasteSeed: true,
      found: false,
    });
  }

  scanQR() {
    this.setState({
      scanQR: true,
      found: false,
    });
  }

  handleScan(data) {
    if (data !== undefined && data !== null && data !== '') {
      if (typeof data === 'string') {
        this.setState({
          result: data,
          found: true,
        });
      }
    }
  }

  updateSeed() {
    this.setState({
      scanQR: false,
      pasteSeed: false,
    })
    this.props.changeWords(this.state.result);
  }

  handleError(err) {
    this.setState({
      result: err.message,
      found: false,
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={() => { this.handleClose() }}
      />,
      <RaisedButton
        label="Use"
        primary={true}
        keyboardFocused={true}
        disabled={!this.state.found}
        onClick={() => { this.updateSeed() }} />,
    ];

    const previewStyle = {
      width: '100%',
      maxHeight: 200,
    }

    return (
      <div>
        <Dialog
          title="Scan QR"
          modal={false}
          actions={actions}
          open={this.state.scanQR}>

          <div>
            <QrReader
              delay={this.state.delay}
              style={previewStyle}
              onError={(err) => { this.handleError(err) }}
              onScan={(data) => { this.handleScan(data) }}/>

            <p style={{wordWrap: 'break-word'}}>{this.state.result}</p>
          </div>

        </Dialog>

        <Dialog
          title="Paste Seed"
          modal={false}
          actions={actions}
          open={this.state.pasteSeed}>

          <div>
            <TextField
              hintText="Paste seed here"
              fullWidth={true}
              onChange={(event, value) => { this.handleScan(value) }}/>
          </div>

        </Dialog>

        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon className="white" /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Paste" onClick={() => {this.paste()}}/>
          <MenuItem primaryText="Scan QR" onClick={() => {this.scanQR()}}/>
        </IconMenu>
      </div>
    )
  }
}

export default SeedMenu;
