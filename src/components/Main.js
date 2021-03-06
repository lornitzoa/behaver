import React, {Component} from 'react'
import {BrowserRouter as Router, Route, NavLink, Redirect, Switch, withRouter} from 'react-router-dom'
import history from '../history'
import axios from 'axios'


import '../App.css'
import AuthService from '../services/user.services'
import Dashboard from './Dashboard'

// api connection
// const api_url = 'https://behaver-api.herokuapp.com'
const api_url = 'http://localhost:3000'


class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // for preventing loading of page until all data has been pulled
      loaded: false,
      active: null,
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

  // Saves state to local storage on page refresh or unload for restting on reloading
  preserveState = (key, state) => {
    localStorage.setItem(key, JSON.stringify(state))
    console.log(localStorage[key]);
    // console.log(e);
  }

  componentDidMount() {
      // if localstorage has a mainState key, use it to set state from that rather than calling the db
      if (localStorage.mainState) {
        let mainState = JSON.parse(localStorage.mainState)
        for(let key in mainState) {
          this.setState({
            [key]: mainState[key]
          })
        }
        window.addEventListener('beforeunload', (e) => {
          e.preventDefault()
          this.preserveState('mainState', this.state)
        })
        localStorage.removeItem('mainState')
        // console.log(this.state);
      } else {
        this.dataManagement.getData('members')
        this.dataManagement.getData('behaviors')
        this.dataManagement.getData('tasks')
        this.dataManagement.getData('reinforcements')
        this.dataManagement.getData('behaviors/assignments')
        this.dataManagement.getData('tasks/assignments')
        this.dataManagement.getData('reinforcements/assignments')
        this.dataManagement.getData('scores')
        window.addEventListener('beforeunload', (e) => {
          e.preventDefault()
          this.preserveState('mainState', this.state)
        })
        this.setState({
          familyName: localStorage.username.charAt(0).toUpperCase() + localStorage.username.slice(1)
          // makes first letter of username upper case and rejoins string for dashboard header
        })
      }
      this.setState({
        loaded: true
      })
  }


  componentWillUnmount() {
    // this.preserveState()
    window.removeEventListener('beforeunload', (e) => {
      e.preventDefault()
      this.preserveState()
    })
  }




  /// DATA FUNCTIONS ARRAY
  dataManagement = {
    //////////////////////////////////////////////
    //               GET DATA
    //////////////////////////////////////////////
    getData: (dataType) => {
      // console.log(dataType);
      // console.log(this.familyID);
      axios.get(`${api_url}/${dataType}/${this.familyID}`)
        .then(json => {
          // console.log(json.data);
          return json.data
        })
        .then(data => {
          let array = dataType.replace('/', '')
          this.setState({
            [array]: data
          })
          if(dataType === 'scores') {
            this.setState({
              loaded: true
            })
          }
        })
    },
    //////////////////////////////////////////////
    //               DELETE DATA
    //////////////////////////////////////////////

  }

  // triggers logout function and redirects to access page
  logout = (cb) => {
    this.Auth.logout()
    this.setState({
      redirectToReferrer: true
    })
  }



  render() {
    const { from } = this.props.location || { from: { pathname: '/' } }
    const active = (match, location) => {
      if(!match) {
        return false
      } else {
        return true
      }
    }
    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    return(
      <Router>
        {
          this.state.loaded ?
          <div>
              <div className='sub-header'>
                <h2>{this.state.familyName} Family Dashboard</h2>
                <button
                  onClick={() => {
                    this.logout(history.push('/login'))
                  }}
                >Sign out</button>
              </div>
              <div className='main-nav'>
                <NavLink
                  className='main-nav-h1'
                  isActive={active}
                  activeClassName='main-nav-active'
                  to='/dashboard'>
                  <h1>Dashboard</h1>
                </NavLink>
                <NavLink
                  className='main-nav-h1'
                  isActive={active}
                  activeClassName='main-nav-active'
                  to='/tasksbehaviors'>
                  <h1>Tasks & Behaviors</h1>
                </NavLink>
                <NavLink
                  className='main-nav-h1'
                  isActive={active}
                  activeClassName='main-nav-active'
                  to='/cashins'>
                  <h1>Cash Ins</h1>
                </NavLink>
                <NavLink
                  className='main-nav-h1'
                  isActive={active}
                  activeClassName='main-nav-active'
                  to='/household'>
                  <h1>Household</h1>
                </NavLink>
              </div>
              <Switch>
                <Route
                  path='/dashboard'
                  component={() =>
                    <Dashboard
                      children={this.state.members.filter(member => member.role.includes('child'))}
                      dataManagement={this.dataManagement}
                      scores={this.state.scores}
                      tasksAssignments={this.state.tasksassignments}
                      behaviorAssignments={this.state.behaviorsassignments}
                      reinforcementsAssignments={this.state.reinforcementsassignments}
                      preserveState={this.preserveState}
                    />
                  }/>
                <Route path='/tasksbehaviors'/>
                <Route path='/cashins'/>
                <Route path='/household'/>
              </Switch>
            </div>
          :
          <div>Not Loaded</div>
        }

      </Router>
    )
  }
}

export default Main
