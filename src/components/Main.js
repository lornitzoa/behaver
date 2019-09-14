import React, {Component} from 'react'
import {BrowserRouter as Router, Route, NavLink, Redirect, Switch, withRouter} from 'react-router-dom'
import history from '../history'
import axios from 'axios'


import '../App.css'
import AuthService from '../services/user.services'
import Dashboard from './Dashboard'

// api connection
const api_url = 'https://behaver-api.herokuapp.com'




class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // for dashboard header
      familyName: localStorage.username,
      redirectToReferrer: false,
      // data arrays
      behaviors: [],
      tasksassignments: [],
      behaviorsassignments:[],
      reinforcements: [],
      reinforcementsassignments: [],
      scores: [],
      members: []

    }
    this.Auth = new AuthService()
    this.familyID = parseInt(localStorage.getItem('family_id'))
  }

  //////////////////////////////////////////////
  //               GET DATA
  //////////////////////////////////////////////
  getData = (dataType) => {
    axios.get(`${api_url}/${dataType}/${this.familyID}`)
      .then(json => {
        return json.data
      })
      .then(data => {
        // let array = dataType.replace('/', '')
        this.setState({
          [dataType]: data
        })
      })
  }

  // triggers logout function and redirects to access page
  logout = (cb) => {
    this.Auth.logout()
    this.setState({
      redirectToReferrer: true
    })
  }

  componentDidMount() {
    this.getData('members')
  }


  render() {
    const { from } = this.props.location || { from: { pathname: '/' } }

    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    return(
      <Router>
        <div className='sub-header'>
          <h2> Family Dashboard</h2>
          <button
            onClick={() => {
              this.logout(history.push('/login'))
            }}
          >Sign out</button>
        </div>
        <div className='main-nav'>
          <NavLink
            className='main-nav-h1'
            activeClassName='main-nav-active'
            to='/dashboard'>
            <h1>Dashboard</h1>
          </NavLink>
          <NavLink
            className='main-nav-h1'
            activeClassName='main-nav-active'
            to='/tasksbehaviors'>
            <h1>Tasks & Behaviors</h1>
          </NavLink>
          <NavLink
            className='main-nav-h1'
            activeClassName='main-nav-active'
            to='/cashins'>
            <h1>Cash Ins</h1>
          </NavLink>
          <NavLink
            className='main-nav-h1'
            activeClassName='main-nav-active'
            to='/household'>
            <h1>Household</h1>
          </NavLink>
        </div>
        <Switch>
          <Route
            path='/dashboard'
            component={() =>
              <Dashboard children={this.state.members.filter(member => member.role.includes('child'))}/>
            }/>
          <Route path='/tasksbehaviors'/>
          <Route path='/cashins'/>
          <Route path='/household'/>
        </Switch>
      </Router>
    )
  }
}

export default Main
