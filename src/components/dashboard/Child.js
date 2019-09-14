import React, { Component } from 'react'

class Child extends Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.changeView(null)}>Back</button>
        <h1>{this.props.childName}</h1>
      </div>
    )
  }
}

export default Child
