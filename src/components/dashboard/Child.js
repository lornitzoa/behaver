import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom'

import Tasks_Bx from './Tasks_Bx'
import Cashins from './Cashins'

class Child extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opts: null
    }
  }

  componentDidMount() {
    if(localStorage.childState) {
      let childState = JSON.parse(localStorage.childState)
      for(let key in childState) {
        this.setState({
          [key]: childState[key]
        })
      }
    }
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      this.props.preserveState('childState', this.state)
    })
    localStorage.removeItem('childState')
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', (e) => {
      e.preventDefault()
      this.props.preserveState('childState', this.state)
    })
  }

  optsSelect = (opts) => {
    this.setState({
      opts: opts
    })
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
            <tbody>
              <tr>
                <td>{this.props.scores[0].req_tasks_complete}</td>
                <td>{this.props.scores[0].bonus_tasks_complete}</td>
                <td>{this.props.scores[0].task_points_earned}</td>
                <td>{this.props.scores[0].bx_points_earned}</td>
                <td>{this.props.scores[0].total_points_earned}</td>
                <td>{this.props.scores[0].stashed_cash}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className='opts-header'>
            <h2 onClick={() => {
              this.optsSelect('tasks-&-bx')
            }}>Tasks & Behaviors</h2>
            <h2 onClick={() => {
              this.optsSelect('cashins')
            }}>Cash Ins</h2>
          </div>
          {
            this.state.opts === 'tasks-&-bx' ?
            <Tasks_Bx/>
            :
            <div></div>
          }
          {
            this.state.opts === 'cashins' ?
            <Cashins/>
            :
            <div></div>
          }
        </div>
      </div>
    )
  }
}

export default Child
