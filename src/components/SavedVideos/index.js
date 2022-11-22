import {HiFire} from 'react-icons/hi'
import {SavedVideoContainer} from './styledComponents'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import SavedVideoCard from '../SavedVideoCard'

const SavedVideos = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {savedVideos, isDarkThemeEnabled} = value
      return (
        <SavedVideoContainer
          bgColor={isDarkThemeEnabled ? '#0f0f0f' : ' #f9f9f9'}
          data-testid="savedVideos"
        >
          <Header />
          <SideNavbar />
          {savedVideos.length === 0 ? (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />
              <h1>No saved videos found</h1>
              <p>You can save your videos while watching them</p>
            </div>
          ) : (
            <div>
              <div data-testid="banner">
                <HiFire />
                <h1>Saved Videos</h1>
              </div>
              <ul>
                {savedVideos.map(eachVideo => (
                  <SavedVideoCard videoDetails={eachVideo} key={eachVideo.id} />
                ))}
              </ul>
            </div>
          )}
        </SavedVideoContainer>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SavedVideos
