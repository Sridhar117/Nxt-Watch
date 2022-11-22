import NxtWatchContext from '../../context/NxtWatchContext'
import {NotFoundContainer} from './styledComponents'
import Header from '../Header'
import SideNavbar from '../SideNavbar'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkThemeEnabled} = value
      const imageUrl = isDarkThemeEnabled
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      return (
        <NotFoundContainer
          bgColor={isDarkThemeEnabled ? '#181818' : ' #f9f9f9'}
        >
          <Header />
          <SideNavbar />
          <img src={imageUrl} alt="not found" />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </NotFoundContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
