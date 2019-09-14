import React, {Component} from 'react';
import '../App.css';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
      familyname: '',
      password: ''
    }
  }

  // triggers login function
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.login(this.state.familyName, this.state.password)
  }

  // collects text from iput cells
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
