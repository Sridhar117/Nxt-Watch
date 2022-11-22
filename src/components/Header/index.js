import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {HiMoon} from 'react-icons/hi'
import {BsBrightnessHigh} from 'react-icons/bs'

import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import NxtWatchContext from '../../context/NxtWatchContext'

import {
  NavbarContainer,
  HeaderLogo,
  NavOptionsContainer,
  NavItemsLgContainer,
  LinkItem,
  LogoutButtonLgContainer,
  LogoutButton,
} from './styledComponents'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkThemeEnabled, toggleTheme} = value
        const imageUrl = isDarkThemeEnabled
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        const onToggleTheme = () => {
          toggleTheme()
        }
        return (
          <NavbarContainer
            bgColor={isDarkThemeEnabled ? '#181818' : ' #f9f9f9'}
          >
            <Link to="/">
              <HeaderLogo src={imageUrl} alt="website logo" />
            </Link>
            <NavOptionsContainer>
              <li>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  data-testid="theme"
                >
                  {isDarkThemeEnabled ? (
                    <BsBrightnessHigh fill="white" size="20" />
                  ) : (
                    <HiMoon fill="white" size="20" />
                  )}
                </button>
              </li>
              <li>
                <GiHamburgerMenu fill="white" size="20" />
              </li>
              <li>
                <Popup
                  modal
                  trigger={
                    <LogoutButton type="button">
                      <FiLogOut fill="white" size="20" />
                    </LogoutButton>
                  }
                >
                  {close => (
                    <>
                      <div>
                        <p>Are you sure, you want to logout?</p>
                      </div>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="trigger-button"
                        onClick={onLogout}
                      >
                        Confirm
                      </button>
                    </>
                  )}
                </Popup>
              </li>
            </NavOptionsContainer>
            <NavItemsLgContainer>
              <LinkItem>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  data-testid="theme"
                >
                  {isDarkThemeEnabled ? (
                    <BsBrightnessHigh fill="white" size="20" />
                  ) : (
                    <HiMoon fill="white" size="20" />
                  )}
                </button>
              </LinkItem>

              <LinkItem>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </LinkItem>
            </NavItemsLgContainer>
            <LogoutButtonLgContainer>
              <Popup
                modal
                trigger={
                  <LogoutButton type="button" onClick={onLogout}>
                    Logout
                  </LogoutButton>
                }
              >
                {close => (
                  <>
                    <div>
                      <p>Are you sure, you want to logout?</p>
                    </div>
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="trigger-button"
                      onClick={onLogout}
                    >
                      Confirm
                    </button>
                  </>
                )}
              </Popup>
            </LogoutButtonLgContainer>
          </NavbarContainer>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
