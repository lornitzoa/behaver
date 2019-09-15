import React, {Component} from 'react'
import {BrowserRouter as Router, Route, NavLink, Redirect, Switch, withRouter} from 'react-router-dom'
import history from '../history'
import axios from 'axios'


import '../App.css'
import AuthService from '../services/user.services'
import Dashboard from './Dashboard'

// api connection
const api_url = 'https://behaver-api.herokuapp.com'

if(performance.navigation.type == 1) {
  console.log('this page is reloaded');

}

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // for preventing loading of page until all data has been pulled
      loaded: false,
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

  preserveState = () => {
    localStorage.setItem('state', this.state)
    console.log(localStorage.state);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.preserveState)
  }

  componentWillUnmount() {
    this.preserveState()
    window.removeEventListener('beforeunload', this.preserveState)
  }




  /// DATA FUNCTIONS ARRAY
  dataManagement = {
    //////////////////////////////////////////////
    //               GET DATA
    //////////////////////////////////////////////
    getData: (dataType) => {
      console.log(dataType);
      console.log(this.familyID);
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
    deleteData: (dataType, id) => {
      // console.log(dataType);
      // console.log(id);
      axios.delete(`${api_url}/${dataType}/${id}`)
        .then(data => {
          this.getData(dataType)
        }).then(scores => {
          console.log(dataType);
          if(dataType === 'tasks/assignments') {
            this.getData('scores')
            // console.log('getting scores');
          }
        })
    }
  }

  // triggers logout function and redirects to access page
  logout = (cb) => {
    this.Auth.logout()
    this.setState({
      redirectToReferrer: true
    })
  }

  componentDidMount() {
    this.dataManagement.getData('members')
    this.dataManagement.getData('behaviors')
    this.dataManagement.getData('tasks')
    this.dataManagement.getData('reinforcements')
    this.dataManagement.getData('behaviors/assignments')
    this.dataManagement.getData('tasks/assignments')
    this.dataManagement.getData('reinforcements/assignments')
    this.dataManagement.getData('scores')

    this.setState({
      familyName: localStorage.username.charAt(0).toUpperCase() + localStorage.username.slice(1)
      // makes first letter of username upper case and rejoins string for dashboard header
    })
  }


  render() {
    const { from } = this.props.location || { from: { pathname: '/' } }

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
                    <Dashboard
                      children={this.state.members.filter(member => member.role.includes('child'))}
                      dataManagement={this.dataManagement}
                      scores={this.state.scores}
                      tasksAssignments={this.state.tasksassignments}
                      behaveriorAssignments={this.state.behaviorsassignments}
                      reinforcementsAssignments={this.state.reinforcementsassignments}
                    />
                  }/>
                <Route path='/tasksbehaviors'/>
                <Route path='/cashins'/>
                <Route path='/household'/>
              </Switch>
            </div>
          :
          <div></div>
        }

      </Router>
    )
  }
}

export default Main
