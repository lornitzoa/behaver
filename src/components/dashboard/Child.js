import React, { Component } from 'react'

class Child extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasksassignments: [],
      behaviorsassignments:[],
      reinforcementsassignments: [],
      scores: [],
    }
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className='child-dashboard'>
        <div className='child-header'>
          <h1>{this.props.childName}</h1>
          <button onClick={() => this.props.changeView(null)}>Back</button>
        </div>
        <div className='score-board'>

        </div>
      </div>
    )
  }
}

export default Child
