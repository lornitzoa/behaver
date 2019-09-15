import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect
} from 'react-router-dom'


import Overview from './dashboard/Overview'
import Child from './dashboard/Child'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewDashboard: true,
      childID: null,
      childName: null,
    }
  }

  // changes view bewteen dashboard overview and child view
  changeView = (child) => {
    if(child === null) {
      this.setState({
        viewDashboard: true,
        childID: null,
        childName: null
      })
    } else {
      this.setState({
        viewDashboard: false,
        childID: child.member_id,
        childName: child.name
      })
    }
  }



  componentDidMount() {

    if(localStorage.dashState) {
      let dashState = JSON.parse(localStorage.dashState)
      for(let key in dashState) {
        this.setState({
          [key]: dashState[key]
        })
      }
    }
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      this.props.preserveState('dashState', this.state)
    })
    localStorage.removeItem('dashState')

  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', (e) => {
      e.preventDefault()
      this.props.preserveState('dashState', this.state)
    })
  }


  render() {
    return (
      <Router>
        <div>
          {
            this.state.viewDashboard ?
            <Redirect to='/dashboard'/>
            :
            <Redirect to={'/dashboard/' + this.state.childName}/>
          }
          <Route
            path={'/dashboard/' + this.state.childName}
            render={() =>
              <Child
                changeView={this.changeView}
                childID={this.state.childID}
                childName={this.state.childName}
                dataManagement={this.props.dataManagement}

              />
            }
          />
          <Route
            path='/dashboard'
            render={() =>
              <Overview
                children={this.props.children}
                changeView={this.changeView}
                scores={this.props.scores}
              />
            }
           />
        </div>
      </Router>
    )
  }
}

export default Dashboard
