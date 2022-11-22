import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BiSearchAlt2} from 'react-icons/bi'
import {GrFormClose} from 'react-icons/gr'
import Header from '../Header'
import VideoCard from '../VideoCard'
import SideNavbar from '../SideNavbar'
import {
  BannerContainer,
  LogoImage,
  Paragraph,
  GetStartButton,
  InputElement,
  SearchButton,
  HomeContainer,
} from './styledComponents'

import NxtWatchContext from '../../context/NxtWatchContext'

const apiStatusConstants = {
  initial: 'Initial',
  inProgress: 'In Progress',
  failure: 'Failure',
  success: 'Success',
}

class Home extends Component {
  state = {
    searchInput: '',
    videos: [],
    apiStatus: apiStatusConstants.initial,
    isBannerShow: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const videoUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videoUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachVideo => ({
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
        id: eachVideo.id,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        title: eachVideo.title,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkThemeEnabled} = value
        const failureUrl = isDarkThemeEnabled
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <div>
            <img src={failureUrl} alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button type="button" onClick={this.getVideos}>
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {videos} = this.state
    if (videos.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
          />
          <h1>No Search results found</h1>
          <p>Try different Key words or remove search filter</p>
          <button type="button" onClick={this.noDataFoundRetry}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <ul>
        {videos.map(eachVideo => (
          <VideoCard videoDetails={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    )
  }

  noDataFoundRetry = () => {
    this.setState({searchInput: ''}, this.getVideos)
  }

  searchInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onBannerClose = () => {
    this.setState({isBannerShow: false})
  }

  renderVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {isBannerShow} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkThemeEnabled} = value
          const logoUrl = isDarkThemeEnabled
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          return (
            <HomeContainer
              data-testid="home"
              bgColor={isDarkThemeEnabled ? '#181818' : ' #f9f9f9'}
            >
              <Header />
              <SideNavbar />
              {isBannerShow && (
                <BannerContainer data-testid="banner">
                  <button
                    type="button"
                    onClick={this.onBannerClose}
                    data-testid="close"
                  >
                    <GrFormClose />
                  </button>
                  <LogoImage src={logoUrl} alt="nxt watch logo" />
                  <Paragraph>
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </Paragraph>
                  <GetStartButton>GET IT NOW</GetStartButton>
                </BannerContainer>
              )}
              <InputElement type="search" onChange={this.searchInputChange} />
              <SearchButton data-testid="searchButton" onClick={this.getVideos}>
                <BiSearchAlt2 />
              </SearchButton>
              {this.renderVideos()}
            </HomeContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
