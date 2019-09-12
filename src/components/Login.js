import React, {Component} from 'react';
import '../App.css';
// import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'
// import history from '../history'



class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      familyname: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state.familyName, this.state.password)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  
  }

  render() {

    return(
      <div className='access-form'>
        <form onSubmit={this.handleSubmit}>
          <div className='input-div'>
            <label htmlFor='familyName' className='form-label'>Family Name</label>
            <input type='text' id='familyName' onChange={this.handleChange}/>
          </div>
          <div className='input-div'>
            <label htmlFor='password' className='form-label'>Password</label>
            <input type='password' id='password' onChange={this.handleChange}/>
          </div>
            <input type='submit' value="Login"/>
        </form>
    </div>
    )
  }
}

export default Login
