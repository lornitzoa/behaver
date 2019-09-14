import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter
} from 'react-router-dom'

import axios from 'axios'

import Login from './components/Login'
import Register from './components/Register'
import Main from './components/Main'
import AuthService from './services/user.services'

// api connection
const api_url = 'https://behaver-api.herokuapp.com'


// authorization variable
let isAuthenticated = false


// login and register landing component, with login function
class Access extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToReferrer: false,
    }
    this.Auth = new AuthService()
  }

  login = (username, password) => {
    this.Auth.login(username, password)
      .then(res => {
        // console.log(res)
        isAuthenticated = true
        this.setState(() => ({
          redirectToReferrer: true
        }))
      },
      err => console.log(err)
    )
  }


  render() {
    const { from } = this.props.location || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    const active = (match, location) => {
      if(!match) {
        return false
      } else {
        return true
      }

    }

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <Router>
        <h1 className='access-header'>Welcome!</h1>
        <br/>
        <div className='access-nav'>
          <NavLink
            className='access-h1'
            to='/login'
            isActive={active}>
             <h1>Login</h1>
          </NavLink>
          <h1 id='access-header-or'>or</h1>
          <NavLink
            className='access-h1'
            to='/register'
            isActive={active}>
            <h1>Register</h1>
          </NavLink>
        </div>
        <Route path='/login' component={() =>
            <Login login={this.login} />
          }
        />
        <Route path='/register' component={Register}/>
        <PrivateRoute path='/main' component={Main}/>
      </Router>
    )
  }
}

// private route component prevents access to  main app without authorization
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)


// checks for authorization and renders appropriate components based on login credentials
const AuthButton = withRouter(({ history }) => (
  localStorage.getItem('id_token') ? (
    <div>
      <Main />
    </div>
  ) : (
    <Access />
  )
))


// main app component
export default function App () {
  return (
    <Router>
      <div>
        <h1 className='App-header'>BeHaver</h1>
        <AuthButton/>
      </div>
    </Router>
  )
}
