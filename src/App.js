import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter
} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Main from './components/Main'

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Access extends React.Component {
  state = {
    redirectToReferrer: false,
  }
  login = () => {
    auth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
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
        <Route path='/login' component={() => <Login login={this.login}/>}/>
        <Route path='/register' component={Register}/>
        <PrivateRoute path='/main' component={Main}/>
      </Router>
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const AuthButton = withRouter(({ history }) => (
  auth.isAuthenticated ? (
    <div>
      <Main
        auth={auth}
        history={history}
      />
    </div>
  ) : (
    <Access/>
  )
))

export default function AuthExample () {
  return (
    <Router>
      <div>
        <h1 className='App-header'>BeHaver</h1>
        <AuthButton/>
      </div>
    </Router>
  )
}
