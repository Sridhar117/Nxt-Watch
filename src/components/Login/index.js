import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {
  LoginContainer,
  FormContainer,
  WebsiteLogo,
  Label,
  InputElement,
  LoginButton,
  ErrorMessage,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
    isShowPassword: false,
  }

  enterUsername = event => {
    this.setState({username: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  onFailureLogin = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onLogin = async event => {
    event.preventDefault()
    const loginUrl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  showPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  render() {
    const {isShowPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const {showError, errorMsg} = this.state
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <LoginContainer>
        <FormContainer onSubmit={this.onLogin}>
          <WebsiteLogo
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <Label className="label" htmlFor="username">
            USERNAME
          </Label>
          <InputElement
            onChange={this.enterUsername}
            type="text"
            id="username"
            placeholder="Username"
          />
          <Label className="label" htmlFor="password">
            PASSWORD
          </Label>
          <InputElement
            onChange={this.enterPassword}
            type={isShowPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
          />
          <input
            type="checkbox"
            id="showpassword"
            onChange={this.showPassword}
          />
          <Label htmlFor="showpassword">Show Password</Label>
          <LoginButton type="submit" className="login-button">
            Login
          </LoginButton>
          {showError && <ErrorMessage>*{errorMsg}</ErrorMessage>}
        </FormContainer>
      </LoginContainer>
    )
  }
}

export default Login
