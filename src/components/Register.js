import React, {Component} from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom'
// import history from '../history'
import PinInput from 'react-pin-input'

class Register extends Component {
  state = {
    redirectToReferrer: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      redirectToReferrer: true
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
