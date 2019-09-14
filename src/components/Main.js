import React, {Component} from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, NavLink, Redirect, withRouter} from 'react-router-dom'
import history from '../history'

import AuthService from '../services/user.services'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      familyName: localStorage.username,
      redirectToReferrer: false
    }
    this.Auth = new AuthService()
  }

  logout = (cb) => {
    this.Auth.logout()
    this.setState({
      redirectToReferrer: true
    })

  }



  render() {
    const { from } = this.props.location || { from: { pathname: '/' } }

    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    return(
      <div className='sub-header'>
        <h2> Family Dashboard</h2>
        <button
          onClick={() => {
            this.logout(history.push('/login'))

          }}
        >Sign out</button>
      </div>
    )
  }
}

export default Main
