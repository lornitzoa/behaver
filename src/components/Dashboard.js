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

  changeView = (childID) => {
    console.log('clicked');
    if(childID === null) {
      this.setState({
        viewDashboard: true
      })
    } else {
      this.setState({
        viewDashboard: false,
        childID: childID
      })
    }
  }

  componentDidMount() {
    console.log(this.props.children)
  }

  render() {
    return (
      this.state.viewDashboard ?
      <Overview children={this.props.children} changeView={this.changeView}/>
      :
      <Child />
    )
  }
}

export default Dashboard
