import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

const SavedVideoCard = props => {
  const {videoDetails} = props
  const {name, id, publishedAt, thumbnailUrl, title, viewCount} = videoDetails
  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <p>{title}</p>
          <p>{name}</p>
          <p>
            {viewCount} . {formatDistanceToNow(new Date(publishedAt))}
          </p>
        </div>
      </li>
    </Link>
  )
}

export default SavedVideoCard
