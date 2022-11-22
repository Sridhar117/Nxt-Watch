import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Gaming from './components/Gaming'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Trending from './components/Trending'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import NxtWatchContext from './context/NxtWatchContext'

class App extends Component {
  state = {isDarkThemeEnabled: false, activeTabId: 'Home', savedVideos: []}

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkThemeEnabled: !prevState.isDarkThemeEnabled,
    }))
  }

  updateActiveTabId = tabId => {
    this.setState({activeTabId: tabId})
  }

  addToSavedVideos = newVideoObj => {
    const {savedVideos} = this.state
    const videoIndex = savedVideos.findIndex(
      eachVideo => eachVideo.id === newVideoObj.id,
    )
    if (videoIndex === -1) {
      this.setState(prevState => ({
        savedVideos: [...prevState.savedVideos, newVideoObj],
      }))
    } else {
      this.setState(prevState => ({
        savedVideos: prevState.savedVideos.splice(videoIndex, 1),
      }))
    }
  }

  render() {
    const {isDarkThemeEnabled, activeTabId, savedVideos} = this.state
    return (
      <NxtWatchContext.Provider
        value={{
          isDarkThemeEnabled,
          toggleTheme: this.toggleTheme,
          activeTabId,
          updateActiveTabId: this.updateActiveTabId,
          savedVideos,
          addToSavedVideos: this.addToSavedVideos,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
