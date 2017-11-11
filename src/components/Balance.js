import React, { Component } from 'react';

class Balance extends Component {
  state = {
    enabled: false
  }

  estimateFee(network) {
    this.setState({
      enabled: network.feeEstimation,
    })

    if (network.feeEstimation) {
    }
  }

  render() {
    return (
      <div>
        { this.state.enabled ? "loading" : "no fee estimation" }
      </div>
    );
  }
}

export default Balance;
