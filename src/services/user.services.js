import decode from 'jwt-decode'

export default class AuthService {
  constructor(domain) {
    this.domain = 'http://localhost:3000' // API server domain
    this.fetch = this.fetch.bind(this) // React binding
    this.login = this.login.bind(this)
    this.getProfile = this.getProfile.bind(this)
  }

  login(username, password) {
    console.log(username);
    return this.fetch(
      `${this.domain}/users/login?user[username]=${username}&user[password]=${password}`,
       {
         method: 'POST',
         body: JSON.stringify({
           username,
           password
         })
       }).then(res => {
         console.log(res)
         this.setLocalStorage(res.token, res.user.username, res.user.id) // set token in localStorage
         return Promise.resolve(res)
       })
  }

  loggedIn() {
    // check if saved token exists and is valid
    const token = this.getToken() // retrieves token from localstorage
    return !!token && !this.isTokenExpired(token)
  }

  register(user) {
    return this.fetch('http://localhost:3000/users/register',
    {
      body: JSON.stringify(user),
      method: 'POST'
    })
  }

  isTokenExpired(token) {
    try {
      const decoded = decoded(token);
      if (decoded.exp < Date.now() / 1000) { // check if token is expired
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

  setLocalStorage(idToken, username, userID) {
    // Save user token to localStorage for auth
    localStorage.setItem('id_token', idToken)
    // Save username to localstorage for header display
    localStorage.setItem('username', username)
    // Save userID to localStorage as family ID
    localStorage.setItem('family_id', userID)
  }

  getToken() {
    // Retrieve user toekn from localstorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('username')
    localStorage.removeItem('family_id')
  }

  getProfile() {
    // Using jwt-decode npm package to decode token
    return decode(this.getTOken())
  }

  fetch(url, options) {
    console.log(url)
    console.log(options)

    // Perform API call sending required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    //Set authorization header
    if (this.loggedIn()) {
      headers['authorization'] = 'Bearer ' + this.getToken()
    }
    console.log(headers)
    return fetch(url, {
      headers,
      ...options
    }).then(console.log(url))
      .then(res => res.json())

    }

    _checkStatus(response) {
      // raises error in case res status is not successful
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

  }
