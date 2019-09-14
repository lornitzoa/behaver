import React, {Component} from 'react';
import '../App.css';
import {BrowserRouter as Router, Route, NavLink, Redirect, withRouter} from 'react-router-dom'
// import history from '../history'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      familyName: localStorage.username
    }
  }



  componentDidMount() {
    
  }

  render() {
    return(
      <div className='sub-header'>
        <h2> Family Dashboard</h2>
        <button
          onClick={() => {
          this.props.auth.signout(() => this.props.history.push('/'))
          }}
        >Sign out</button>
      </div>
    )
  }
}

export default Main
