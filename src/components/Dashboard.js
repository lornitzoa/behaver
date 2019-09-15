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
      localStorage.setItem('childID', child.member_id)
      localStorage.setItem('childName', child.name)
    }
  }


  render() {
    return (
      <Router>
        <div>
          {
            this.state.viewDashboard ?
            <Redirect to='/dashboard'/>
            :
            <Redirect to={'/' + this.state.childName}/>
          }
          <Route
            path={'/' + this.state.childName}
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
