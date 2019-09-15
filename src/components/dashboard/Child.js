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
    console.log(this.props.scores);
  }


  render() {
    return (
      <div className='child-dashboard'>
        <div className='child-header'>
          <h1>{this.props.childName}</h1>
          <button onClick={() => this.props.changeView(null)}>Back</button>
        </div>
        <div className='score-board'>
          <table>
            <thead>
              <tr>
                <td>Tasks Completed</td>
                <td>Bonus Tasks Completed</td>
                <td>Task Points Earned</td>
                <td>Behavior Points Earned</td>
                <td>Total Points Earned</td>
                <td>Stashed Cash</td>
              </tr>
            </thead>

          </table>
        </div>
      </div>
    )
  }
}

export default Child
