import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import PinInput from 'react-pin-input'

import '../App.css'
import AuthService from '../services/user.services'


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      familyName: '',
      password: ''
    }
    this.Auth = new AuthService()
  }

  // triggers registration functions and redirects to login component
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.familyName && this.state.password) {
      let user = {
        username: this.state.familyName,
        password: this.state.password
      }
      this.Auth.register(user)
        .then(
          res => {
            this.setState({
              redirectToReferrer: true
            })
          }
        )
    }
  }

  // collects text from input cells
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    if (this.state.redirectToReferrer === true) {
      return <Redirect to='/login'/>
    }
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
          <input type='submit' value='Sign Up'/>
        </form>
    </div>
    )
  }
}

export default Register
