import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    name,
    profileImageUrl,
    id,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
  } = videoDetails
  return (
    <Link to={`/videos/${id}`}>
      <div>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <img src={profileImageUrl} alt="channel logo" />
          <p>{title}</p>
          <p>{name}</p>
          <p>
            {viewCount} . {formatDistanceToNow(new Date(publishedAt))}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
