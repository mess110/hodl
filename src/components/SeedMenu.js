import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import QrReader from 'react-qr-reader';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class SeedMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scanQR: false,
      delay: 100,
      result: 'no result',
    }
  }

  handleClose() {
    this.setState({scanQR: false});
  };


  paste() {
    // var words = window.clipboardData.getData('Text');
    this.props.changeWords('pizza pizza pizza');
  }

  scanQR() {
    this.setState({
      scanQR: true
    });
  }

  handleScan(data) {
    this.setState({
      result: data,
    });
    // this.props.changeWords(data);
  }

  handleError(err) {
    this.setState({
      result: err.message
    });
  }

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onClick={() => { this.handleClose() }}
      />
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
