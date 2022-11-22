import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import SideNavbar from '../SideNavbar'
import NxtWatchContext from '../../context/NxtWatchContext'
import {VideoContainer, IconButton} from './styledComponents'

const apiStatusConstants = {
  initial: 'Initial',
  inProgress: 'In Progress',
  failure: 'Failure',
  success: 'Success',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisLiked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const videoDetailsUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(videoDetailsUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedVideoData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }
      this.setState({
        videoDetails: updatedVideoData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
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
            <button type="button" onClick={this.getVideoDetails}>
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
    const {videoDetails} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      profileImageUrl,
      subscriberCount,
      name,
      description,
    } = videoDetails

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {addToSavedVideos, savedVideos, isDarkThemeEnabled} = value

          const {isLiked, isDisLiked} = this.state
          const textColor = isDarkThemeEnabled ? '#64748b' : '#231f20'
          const onAddToSavedVideos = () => {
            addToSavedVideos(videoDetails)
          }
          let isSaved = false
          const index = savedVideos.findIndex(
            eachVideo => eachVideo.id === videoDetails.id,
          )
          if (index === -1) {
            isSaved = false
          } else {
            isSaved = true
          }
          const saveIconColor = isSaved ? '#2563eb' : textColor
          const likeIconColor = isLiked ? '#2563eb' : '#64748b'
          const dislikeIconColor = isDisLiked ? '#2563eb' : '#64748b'

          const clickLiked = () => {
            this.setState(prevState => ({
              isLiked: !prevState.isLiked,
              isDisLiked: false,
            }))
          }

          const clickDisLiked = () => {
            this.setState(prevState => ({
              isDisLiked: !prevState.isDisLiked,
              isLiked: false,
            }))
          }

          return (
            <>
              <ReactPlayer url={videoUrl} />
              <p>{title}</p>
              <div>
                <p>
                  {viewCount} . {formatDistanceToNow(new Date(publishedAt))}
                </p>

                <div>
                  <IconButton
                    color={likeIconColor}
                    type="button"
                    onClick={clickLiked}
                  >
                    <AiOutlineLike />
                    Like
                  </IconButton>
                  <IconButton
                    color={dislikeIconColor}
                    type="button"
                    onClick={clickDisLiked}
                  >
                    <AiOutlineDislike />
                    Dislike
                  </IconButton>

                  <IconButton
                    color={saveIconColor}
                    type="button"
                    onClick={onAddToSavedVideos}
                  >
                    <BiListPlus /> {isSaved ? 'Saved' : 'Save'}
                  </IconButton>
                </div>
              </div>

              <hr />
              <div>
                <img src={profileImageUrl} alt=" channel logo" />
              </div>
              <div>
                <p>{name}</p>
                <p>{subscriberCount} subscribers</p>
                <p>{description}</p>
              </div>
            </>
          )
        }}
      </NxtWatchContext.Consumer>
    )
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
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkThemeEnabled} = value

          return (
            <VideoContainer
              data-testid="videoItemDetails"
              bgColor={isDarkThemeEnabled ? '#0f0f0f' : ' #f9f9f9'}
            >
              <Header />
              <SideNavbar />
              {this.renderVideos()}
            </VideoContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
