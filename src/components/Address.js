import React, { Component } from 'react';
import Clipboard from 'react-clipboard.js';
import QRCode from 'qrcode.react';

class Address extends Component {
  text() {
    return this.props.text;
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Clipboard component="p" style={{textAlign: 'center'}} option-text={() => { return this.props.text }}>
          <QRCode value={this.text()} />
        </Clipboard>
        <p style={{wordWrap: 'break-word'}}>
            {this.text()}
        </p>
      </div>
    )
  }
}
export default Address;
