import {Link} from 'react-router-dom'

const GamingVideoCard = props => {
  const {videoDetails} = props
  const {id, thumbnailUrl, title, viewCount} = videoDetails
  return (
    <Link to={`/videos/${id}`}>
      <div>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <p>{title}</p>

          <p>{viewCount} Watching Worldwide</p>
        </div>
      </div>
    </Link>
  )
}

export default GamingVideoCard
