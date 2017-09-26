import React, { Component } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import QRCode from 'qrcode.react';

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popOpen: false,
      qrOpen: false,
      qr: '',
      qrTitle: '',
      qrPublic: true,
    }
  }

  handleOpen = (address) => {
    this.setState({
      qrOpen: true,
      qr: address.address,
    });
  };

  handleClose = () => {
    this.setState({qrOpen: false});
  };

  handleTouchTap = (event, address) => {
    event.preventDefault();
    this.setState({
      popOpen: true,
      anchorEl: event.currentTarget,
    });
    this.address = address;
  };

  handleRequestClose = () => {
    this.setState({
      popOpen: false,
    });
  };

  render() {
    return (
      <div>
        <Dialog title={this.state.qrTitle} modal={false} open={this.state.qrOpen} onRequestClose={this.handleClose} bodyStyle={{textAlign: 'center'}} titleStyle={{textAlign: 'center'}}>
          <QRCode value={this.state.qr} />
          <p style={{wordWrap: 'break-word'}}>{this.state.qr}</p>
        </Dialog>

        <Popover
          open={this.state.popOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}>
            <Menu>
              <MenuItem primaryText="Public Key" onClick={() => this.setState({qrOpen: true, popOpen: false, qrTitle: 'Public Key', qr: this.address.address})}/>
              <MenuItem primaryText="Private Key" onClick={() => this.setState({qrOpen: true, popOpen: false, qrTitle: 'Private Key', qr: this.address.privKey})}/>
            </Menu>
          </Popover>

        <List style={{paddingBottom: 64}}>
          {this.props.addresses.length === 0 &&
            <ListItem primaryText="Tap the logo to choose a coin">
            </ListItem>
          }
          {this.props.addresses.map((address, i) =>
            <div key={address.address}>
              <Divider />
              <ListItem primaryText={address.address} style={{wordWrap: 'break-word'}}  onClick={(event) => this.handleTouchTap(event, address)}>
              </ListItem>
            </div>
          )}
        </List>
      </div>
    );
  }
}

export default AddressList;
