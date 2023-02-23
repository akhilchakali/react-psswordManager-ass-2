import './App.css'

import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    finalpsList: [],
    x: false,
    last: '',
  }

  cWeb = event => {
    this.setState({website: event.target.value})
  }

  cUser = event => {
    this.setState({username: event.target.value})
  }

  cPass = event => {
    this.setState({password: event.target.value})
  }

  add = event => {
    event.preventDefault()
    const {username, website, password} = this.state

    const a = {
      id: uuidv4(),
      us: {username},
      web: {website},
      pas: {password},
    }

    this.setState(prevState => ({
      finalpsList: [...prevState.finalpsList, a],
      username: '',
      password: '',
      website: '',
    }))
  }

  show = () => {
    this.setState(prevState => ({x: !prevState.x}))
  }

  fil = event => {
    this.setState({last: event.target.value})
  }

  filtering = event => {
    const {finalpsList} = this.state
    const a = finalpsList.filter(each =>
      each.website.includes(event.target.value),
    )
    this.setState({
      finalpsList: a,
      last: event.target.value,
    })
  }

  deleted = id => {
    const {finalpsList} = this.state
    this.setState({finalpsList: finalpsList.map(each => id !== each.id)})
  }

  render() {
    const {finalpsList, username, password, website, x, last} = this.state
    return (
      <form onSubmit={this.add}>
        <div className="main">
          <img
            className="first-img"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
          <div className="upper-two">
            <div className="type-box">
              <h1 className="h1">Add New password</h1>
              <div>
                <img
                  className="in-img"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.cWeb}
                />
              </div>
              <div>
                <img
                  className="in-img"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.cUser}
                />
              </div>
              <div>
                <img
                  className="in-img"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={this.cPass}
                />
                <button type="submit" onClick={this.add}>
                  Add
                </button>
              </div>
            </div>
            <div>
              <img
                className="img-ps"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
              />
            </div>
          </div>
          <div className="down">
            <div className="ps-sec">
              <div className="lw">
                <h1 className="h1">Your Passwords</h1>
                <p>{finalpsList.length}</p>
              </div>
              <div className="lw">
                <img
                  className="in-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  type="search"
                  className="in"
                  value={last}
                  onChange={this.filtering}
                />
              </div>
            </div>
            <hr />

            <input type="checkbox" id="check" onChange={this.show} />
            <label htmlFor="check">Show passwords</label>

            {finalpsList.length !== 0 && (
              <ul>
                {finalpsList.map(each => (
                  <li key={each.id}>
                    {console.log(each)}
                    <p>{each.web.website}</p>
                    <p>{each.us.username}</p>
                    {x ? (
                      <p>{each.pas.password}</p>
                    ) : (
                      <img
                        alt="stars"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      />
                    )}
                    <button
                      type="submit"
                      data-testid="delete"
                      onClick={this.deleted}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {finalpsList.length === 0 && (
              <>
                <img
                  className="no-ps"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <br />
                <p>No Passwords</p>
              </>
            )}
          </div>
        </div>
      </form>
    )
  }
}

export default App

