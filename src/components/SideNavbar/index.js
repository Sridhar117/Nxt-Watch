import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import {NavbarContainer, TabContainer} from './styledComponents'
import NxtWatchContext from '../../context/NxtWatchContext'

const SideNavbar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkThemeEnabled, activeTabId, updateActiveTabId} = value
      const onUpdateActiveTabId = tabId => {
        updateActiveTabId(tabId)
      }
      const activeTabColor = isDarkThemeEnabled ? '#606060' : '#f1f5f9'
      return (
        <NavbarContainer bgColor={isDarkThemeEnabled ? '#181818' : ' #f9f9f9'}>
          <ul>
            <TabContainer
              bgTabColor={activeTabId === 'Home' ? activeTabColor : null}
            >
              <Link to="/">
                <button
                  type="button"
                  onClick={() => onUpdateActiveTabId('Home')}
                >
                  <AiFillHome />
                  <p>Home</p>
                </button>
              </Link>
            </TabContainer>

            <TabContainer
              bgTabColor={activeTabId === 'Trending' ? activeTabColor : null}
            >
              <Link to="/trending">
                <button
                  type="button"
                  onClick={() => onUpdateActiveTabId('Trending')}
                >
                  <HiFire />
                  <p>Trending</p>
                </button>
              </Link>
            </TabContainer>
            <TabContainer
              bgTabColor={activeTabId === 'Gaming' ? activeTabColor : null}
            >
              <Link to="/gaming">
                <button
                  type="button"
                  onClick={() => onUpdateActiveTabId('Gaming')}
                >
                  <SiYoutubegaming />
                  <p>Gaming</p>
                </button>
              </Link>
            </TabContainer>
            <TabContainer
              bgTabColor={activeTabId === 'SavedVideos' ? activeTabColor : null}
            >
              <Link to="/saved-videos">
                <button
                  type="button"
                  onClick={() => onUpdateActiveTabId('SavedVideos')}
                >
                  <CgPlayListAdd />
                  <p>Saved videos</p>
                </button>
              </Link>
            </TabContainer>
          </ul>
          <div>
            <p>CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </NavbarContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SideNavbar
