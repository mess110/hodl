import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class SeedMenu extends Component {

  paste() {
    // var words = window.clipboardData.getData('Text');
    this.props.changeWords('pizza pizza pizza');
  }

  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon className="white" /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Paste" onClick={() => {this.paste()}}/>
        <MenuItem primaryText="Scan QR" disabled={true}/>
      </IconMenu>
    )
  }
}

export default SeedMenu;
