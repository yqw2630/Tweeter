import { React, useState, useEffect,useContext } from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Post(props) {
    const [like, setLike] = useState(props.post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [postUser, setPostUser] = useState({})
    const {user} = useContext(AuthContext)

    const likeHandler = async() => {
        try {
            await axios.put('/posts/'+ props.post._id + '/like', {userId: user._id})
        } catch(err) {
            console.log(err)
        }
        setLike (isLiked? like-1 : like+1)
        setIsLiked (!isLiked)
    }

    useEffect (()=> {
        setIsLiked(props.post.likes.includes(user._id))
    },[user._id, props.post.likes])

    useEffect(()=> {
        const fetchUser = async () => {
            const res = await axios.get(`/user/?userId=${props.post.userId}`)
            setPostUser(res.data)
        }
        fetchUser()
      },[props.post.userId])

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${postUser.username}`}>
                            <img src={postUser.profilePicture || "/assets/person/noAvatar.png"} alt="post_profile" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{postUser.username}</span>
                        <span className="postDate">{format(props.post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon className="postIcon"/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">
                        {props.post?.desc}
                    </span>
                    {props.post.img && <img src={props.post.img} alt="post_img" className="postImg"/>}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <FavoriteIcon htmlColor={isLiked?'tomato':'grey'} className="likeIcon" onClick={likeHandler}/>
                        <ThumbUpIcon htmlColor={isLiked?'lightblue':'grey'} className="likeIcon" onClick={likeHandler}/>
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{props.post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
